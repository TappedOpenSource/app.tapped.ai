"use client";

import { getPlaceById } from "@/data/places";
import { PlaceData } from "@/domain/types/place_data";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";

export default function LocationView({ placeId }: {
    placeId: string;
}) {
  const [place, setPlace] = useState<PlaceData | null>(null);

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
      </div>
    </>
  );
}
