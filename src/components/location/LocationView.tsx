"use client";

import { getPlaceById } from "@/data/places";
import { PlaceData } from "@/domain/types/place_data";
import { useEffect, useMemo, useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { UserModel } from "@/domain/types/user_model";
import { useSearch } from "@/context/search";
import { getUserById } from "@/data/database";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "../ui/button";
import PerformerCard from "./PerformerCard";
import VenueCard from "./VenueCard";

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
  const [genreMap, setGenreMap] = useState<Record<string, number>>({});

  const { data: venueData } = useSearchData("venue", {
    lat: place?.lat,
    lng: place?.lng,
    hitsPerPage: 250,
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

    // get genre: count map
    const blah = venuesGenres.flat().reduce((acc, genre) => {
      acc[genre] = (acc[genre] ?? 0) + 1;
      return acc;
    }
    , {} as Record<string, number>);


    setGenreMap(blah);
  }, [venueData]);

  useEffect(() => {
    const fetchPlace = async () => {
      const place = await getPlaceById(placeId);
      setPlace(place ?? null);
    };
    fetchPlace();
  }, [placeId]);

  const GenreChips = useMemo(
    () => (
      <div className="flex flex-wrap gap-1">
        {Object.entries(genreMap).sort(
          ([, a], [, b]) => b - a
        ).slice(0, 10).filter(([genre, count]) => count > 1).map(([genre, count]) => {
          return (
            <Button key={genre} variant="outline">
              {genre}
            </Button>
          );
        })}
      </div>
    ), [genreMap]);

  const performersList = useMemo(() => {
    if (!performers || performers.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-row flex-wrap gap-3">
        {performers.map((p) =>
          <PerformerCard key={p.id} performer={p} />
        )}
      </div>
    );
  }, [performers]);

  const venuesList = useMemo(() => {
    if (!venueData || venueData.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-row flex-wrap gap-3">
        {venueData.map((p) =>
          <VenueCard key={p.id} venue={p} />
        )}
      </div>
    );
  }, [venueData]);

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
          >top genres</h3>
          <div>
            {GenreChips}
          </div>
        </div>
        <div>
          <h3
            className="text-lg lg:text-2xl font-bold"
          >top performers</h3>
          <div>
            {performersList}
          </div>
        </div>
        <div>
          <h3
            className="text-lg lg:text-2xl font-bold"
          >top venues</h3>
          <div>
            {venuesList}
          </div>
        </div>

      </div>
    </>
  );
}
