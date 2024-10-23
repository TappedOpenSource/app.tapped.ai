export type PlaceData = {
  placeId: string;
  shortFormattedAddress: string;
  addressComponents: {
    longName: string;
    shortName: string;
    types: string[];
  }[];
  photoMetadata: {
    height: number;
    width: number;
    htmlAttributions: string[];
    photoReference: string;
  } | null;
  lat: number;
  lng: number;
};

export type PlacePrediction = {
  id: string;
  name: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
};
