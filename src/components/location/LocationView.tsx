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
import VenueCard from "./VenueCard";
import UserCluster from "../UserCluster";
import { useAuth } from "@/context/auth";
import Footer from "../Footer";
import Link from "next/link";
import { RequestLoginPage } from "../login/RequireLogin";

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
  const { state: authState } = useAuth();
  const { useSearchData } = useSearch();
  const [place, setPlace] = useState<PlaceData | null>(null);
  const [performers, setPerformers] = useState<UserModel[]>([]);
  const [genreMap, setGenreMap] = useState<Record<string, number>>({});

  const { data: venueData } = useSearchData(" ", {
    lat: place?.lat,
    lng: place?.lng,
    radius: 50_000,
    occupations: ["venue", "Venue"],
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

      const perfs = nestedPerfs.flat().filter((item, index, self) =>
        index === self.findIndex((obj) => obj.id === item.id)
      );
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
        ).slice(0, 10).filter(([, count]) => count > 1).map(([genre]) => {
          return (
            <Button key={genre} variant="outline">
              {genre}
            </Button>
          );
        })}
      </div>
    ), [genreMap]);

  const smallVenues = useMemo(() => {
    if (!venueData || venueData.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-row items-start justify-start overflow-x-auto space-x-5 ">
        {venueData.filter(
          (venue) => (venue.venueInfo?.capacity) && (venue.venueInfo?.capacity ?? 0) < 250
        ).map((p) =>
          <VenueCard key={p.id} venue={p} />
        )}
      </div>
    );
  }, [venueData]);

  const mediumVenues = useMemo(() => {
    if (!venueData || venueData.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-row items-start justify-start overflow-x-auto space-x-5 ">
        {venueData.filter(
          (venue) => (venue.venueInfo?.capacity ?? 0) >= 250 && (venue.venueInfo?.capacity ?? 0) < 750
        ).map((p) =>
          <VenueCard key={p.id} venue={p} />
        )}
      </div>
    );
  }, [venueData]);

  const largeVenues = useMemo(() => {
    if (!venueData || venueData.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-row items-start justify-start overflow-x-auto space-x-5 ">
        {venueData.filter(
          (venue) => (venue.venueInfo?.capacity ?? 0) >= 750
        ).map((p) =>
          <VenueCard key={p.id} venue={p} />
        )}
      </div>
    );
  }, [venueData]);

  const performersGroupedByCategory = useMemo(() => {
    if (performers.length === 0) {
      return null;
    }

    const grouped = performers.reduce((acc, performer) => {
      const category = performer.performerInfo?.category ?? "undiscovered";

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(performer);
      return acc;
    }, {} as Record<string, UserModel[]>);

    return Object.entries(grouped).map(([category, performers]) => {
      return (
        <div key={category} className="py-6">
          <h3
            className="text-lg lg:text-2xl font-bold"
          >{category} performers</h3>
          <UserCluster users={performers} />
        </div>
      );
    });
  }, [performers]);

  if (authState.currentUser === null) {
    return <RequestLoginPage />;
  }

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
          live music in {place.shortFormattedAddress}
        </h1>
        <div className="py-6">
          <h3
            className="text-lg lg:text-2xl font-bold"
          >popular genres</h3>
          <div>
            {GenreChips}
          </div>
        </div>
        <div>
          {performersGroupedByCategory}
        </div>
        <div className="py-6">
          <h3
            className="text-lg lg:text-2xl font-bold"
          >small venues</h3>
          <div>
            {smallVenues}
          </div>
        </div>
        <div className="py-6">
          <h3
            className="text-lg lg:text-2xl font-bold"
          >medium venues</h3>
          <div>
            {mediumVenues}
          </div>
        </div>
        <div className="py-6">
          <h3
            className="text-lg lg:text-2xl font-bold"
          >large venues</h3>
          <div>
            {largeVenues}
          </div>
        </div>
      </div>
    </>
  );
}
