import { LoadingSpinner } from "@/components/LoadingSpinner";
import VenueMap from "@/components/map/map";
import TappedSheet from "@/components/TappedSheet";
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
  const zoom = searchParams["zoom"] ?? "11.5";
  const intLat = parseFloat(lat);
  const intLng = parseFloat(lng);
  const intZoom = parseInt(zoom);

  return (
    <>
      <TappedSheet />
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
            zoom={intZoom}
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
              href="https://app.tapped.ai/privacy"
              target="_blank"
              rel="noreferrer noopener"
            >
              privacy policy
            </Link>
          </Button>
          <Button variant="link">
            <Link
              href="https://app.tapped.ai/terms"
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
