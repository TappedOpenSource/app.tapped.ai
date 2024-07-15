import { LoadingSpinner } from "@/components/LoadingSpinner";
import VenueMap from "@/components/map";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const lat = searchParams["lat"] ?? "40.730610";
  const lng = searchParams["lng"] ?? "-73.935242";
  const minCapacity = searchParams["min_capacity"] ?? null;
  const maxCapacity = searchParams["max_capacity"] ?? null;
  const genres = searchParams["genres"] ?? "";

  const intMinCapacity = minCapacity ? parseInt(minCapacity) : null;
  const intMaxCapacity = maxCapacity ? parseInt(maxCapacity) : null;
  const intLat = parseFloat(lat);
  const intLng = parseFloat(lng);
  const venueGenres = genres.length > 0 ? genres.split(",") : [];

  return (
    <>
      <div className="z-40">
        <Suspense
          fallback={
            <div className="flex min-h-screen w-screen items-center justify-center">
              <LoadingSpinner />
            </div>
          }
        >
          <VenueMap
            lat={intLat}
            lng={intLng}
            minCapacity={intMinCapacity}
            maxCapacity={intMaxCapacity}
            genres={venueGenres}
          />
        </Suspense>
      </div>
      <div className="bottom-0 z-10 hidden w-screen md:absolute">
        <div className="flex flex-row items-center justify-center">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} Tapped Industries Inc. All rights
            reserved.
          </p>
          <Button variant="link">
            <Link
              href="https://tapped.ai/privacy"
              target="_blank"
              rel="noreferrer noopener"
            >
              privacy policy
            </Link>
          </Button>
          <Button variant="link">
            <Link
              href="https://tapped.ai/terms"
              target="_blank"
              rel="noreferrer noopener"
            >
              terms of service
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
