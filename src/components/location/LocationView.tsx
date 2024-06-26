"use client";

import { getPlaceById } from "@/data/places";
import { PlaceData } from "@/domain/types/place_data";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { UserModel } from "@/domain/types/user_model";
import { useSearch } from "@/context/search";
import { getUserById } from "@/data/database";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function LocationView(props: {
    placeId: string;
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <_LocationView {...props} />
      </QueryClientProvider>
    </>
  );
}

function _LocationView({ placeId }: {
    placeId: string;
}) {
  const { useSearchData } = useSearch();
  const [place, setPlace] = useState<PlaceData | null>(null);
  const [performers, setPerformers] = useState<UserModel[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const { data: venueData } = useSearchData("venue", {
    lat: place?.lat,
    lng: place?.lng,
    hitsPerPage: 50,
  });

  useEffect(() => {
    if (venueData === undefined) {
      return;
    }

    const getPerformers = async () => {
      const nestedPerfs = await Promise.all(
        venueData.map(async (venue) => {
          const topPerformersIds = venue.venueInfo?.topPerformerIds ?? [];
          return (await Promise.all(
            topPerformersIds.map(async (performerId) => {
              return await getUserById(performerId);
            })
          )).filter((performer) => performer !== null) as UserModel[];
        })
      );

      const perfs = nestedPerfs.flat();
      setPerformers(perfs);
    };

    getPerformers();
  }, [venueData]);

  useEffect(() => {
    if (!venueData || venueData?.length === 0) {
      return;
    }

    const venuesGenres = venueData.map((venue) => venue.venueInfo?.genres ?? []);
    const blah = venuesGenres.flat();

    setGenres(blah);
  }, [venueData]);

  useEffect(() => {
    const fetchPlace = async () => {
      const place = await getPlaceById(placeId);
      setPlace(place ?? null);
    };
    fetchPlace();
  }, [placeId]);


  if (place === null) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="px-4 lg:px-24">
        <h1 className="text-2xl lg:text-4xl font-extrabold">
          {place.shortFormattedAddress}
        </h1>
        <div>
          <h3
            className="text-lg lg:text-2xl font-bold"
          >genres</h3>
          <div>{genres.join(", ")}</div>
        </div>
        <div>
          <h3
            className="text-lg lg:text-2xl font-bold"
          >performer list</h3>
          <div>{performers.map((p) => p.artistName ?? p.username).join(", ")}</div>
        </div>
        <div>
          <h3
            className="text-lg lg:text-2xl font-bold"
          >top venues</h3>
          <div>{venueData?.map((p) => p.artistName ?? p.username).join(", ")}</div>
        </div>

      </div>
    </>
  );
}
