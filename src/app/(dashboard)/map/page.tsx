import { LoadingSpinner } from "@/components/LoadingSpinner";
import VenueMap from "@/components/map/map";
import TappedSheet from "@/components/TappedSheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { useFeatureFlag } from "@/context/use-feature-flag";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { value } = useFeatureFlag("map-city-center");
  const latlng = {
    control: { lat: "40.730610", lng: "-73.935242" },
    los_angles: { lat: "34.052235", lng: "-118.243683" },
    chicago: { lat: "41.878113", lng: "-87.629799" },
    miami: { lat: "25.761681", lng: "-80.191788" },
    san_francisco: { lat: "37.774929", lng: "-122.419418" },
    atlanta: { lat: "33.749001", lng: "-84.387978" },
  };

  const lat = searchParams["lat"] ?? latlng[value].lat;
  const lng = searchParams["lng"] ?? latlng[value].lng;
  const zoom = searchParams["zoom"] ?? "11.5";
  const intLat = parseFloat(lat);
  const intLng = parseFloat(lng);
  const intZoom = parseInt(zoom);

  return (
    <>
      <TappedSheet />
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
      <div className="bottom-0 z-40 hidden w-full md:absolute no-scroll">
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
