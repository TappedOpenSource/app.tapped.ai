import type { PlaceData, PlacePrediction } from "@/domain/types/place_data";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, functions } from "@/utils/firebase";
import { LRUCache } from "lru-cache";
import { httpsCallable } from "@firebase/functions";

export const googlePlacesApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? "";

const placeDetailsCache = new LRUCache({
  max: 500,
});
// const placePhotosCache = new LRUCache({
//   max: 500,
// });
export const googlePlacesCacheRef = collection(db, "googlePlacesCache");

export const getPlaceById = async (placeId: string) => {
  const placeSnapshot = await getDoc(doc(googlePlacesCacheRef, placeId));
  if (placeSnapshot.exists()) {
    return placeSnapshot.data() as PlaceData;
  }

  const place = await _getPlaceDetails(placeId);
  await setDoc(doc(googlePlacesCacheRef, placeId), place);

  return place;
};

const _getPlaceDetails = async (placeId: string): Promise<PlaceData> => {
  const fields = [
    "id",
    "location",
    "shortFormattedAddress",
    "addressComponents",
    "photos",
  ];

  try {
    console.log(`[+] getting place details for placeId: ${placeId}`);

    if (placeDetailsCache.has(placeId)) {
      return placeDetailsCache.get(placeId) as PlaceData;
    }

    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=en`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": googlePlacesApiKey,
          "X-Goog-FieldMask": fields.join(","),
        },
      },
    );
    const json = (await res.json()) as any;

    if (json.error) {
      console.error(json.error);
      throw new Error(json.error.message);
    }

    const { location, shortFormattedAddress, addressComponents, photos } = json;
    const { latitude: lat, longitude: lng } = location;

    const photoMetadata = (photos?.length ?? 0) > 0 ? photos[0] : null;

    const value = {
      placeId,
      shortFormattedAddress,
      addressComponents,
      photoMetadata,
      lat,
      lng,
    };
    placeDetailsCache.set(placeId, value);
    return value;
  } catch (e) {
    console.error(`error getting place details for placeId: ${placeId}`, e);
    throw e;
  }
};

export const autocompletePlaces = async (
  q: string,
  types: string[] = ["locality"],
): Promise<{
  place_id: string;
  description: string;
}[]> => {
  const callable = httpsCallable(functions, "autocompletePlaces");
  const res = await callable({ query: q, types });
  const data = res.data as {
    predictions: {
    place_id: string;
    description: string;
    }[];
  };

  if ("error_message" in data) {
    console.error({ data });
    return [];
  }

  return data.predictions ?? [];
};

export const searchPlaces = async (
  q: string,
  type = "cities",
): Promise<PlacePrediction[]> => {
  const res = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": googlePlacesApiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.location",
      },
      body: JSON.stringify({
        textQuery: q,
        type,
      }),
    }
  );

  const json = (await res.json()) as {
    places?: {
      id: string;
      displayName: { text: string };
      formattedAddress: string;
      location: { latitude: number; longitude: number };
    }[];
    error?: {
      code: number;
      message: string;
      status: string;
    };
  };

  if (json.error !== undefined) {
    console.log({ error: json.error });
    return [];
  }

  const places = json.places?.map((place) => {
    const { id, displayName, formattedAddress, location } = place;

    const { text: name } = displayName;
    const { latitude, longitude } = location;
    return {
      id,
      name,
      formattedAddress,
      latitude,
      longitude,
    };
  });

  return places ?? [];
};
