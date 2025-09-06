import { LoadingSpinner } from "@/components/LoadingSpinner";
import VenueMap from "@/components/map/map";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense, use } from "react";
import { useFeatureFlag } from "@/context/use-feature-flag";

export default function Page(
  props: {
    searchParams: Promise<{ [key: string]: string }>;
  }
) {
  const searchParams = use(props.searchParams);
  const { value } = useFeatureFlag("map-city-center");
  const latlng = {
    control: { lat: "40.730610", lng: "-73.935242" }, // new york
    los_angles: { lat: "34.052235", lng: "-118.243683" },
    chicago: { lat: "41.878113", lng: "-87.629799" },
    miami: { lat: "25.761681", lng: "-80.191788" },
    san_francisco: { lat: "37.774929", lng: "-122.419418" },
    atlanta: { lat: "33.749001", lng: "-84.387978" },
  };

  const lat = searchParams["lat"] ?? latlng[value].lat ?? "40.730610";
  const lng = searchParams["lng"] ?? latlng[value].lng ?? "-73.935242";
  const zoom = searchParams["zoom"] ?? "11.5";
  const intLat = Number.parseFloat(lat);
  const intLng = Number.parseFloat(lng);
  const intZoom = Number.parseInt(zoom);

  return (
    <>
      <Suspense
        fallback={
          <div className="flex min-h-screen w-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <div className="h-screen">
          <VenueMap lat={intLat} lng={intLng} zoom={intZoom} />
        </div>
      </Suspense>
      <div className="no-scroll bottom-0 z-40 hidden w-full md:absolute">
        <div className="flex flex-row items-center justify-center">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} Tapped Industries Inc. All rights reserved.
          </p>
          <Button variant="link">
            <Link href="https://tapped.ai/privacy" target="_blank" rel="noreferrer noopener">
              privacy policy
            </Link>
          </Button>
          <Button variant="link">
            <Link href="https://tapped.ai/terms" target="_blank" rel="noreferrer noopener">
              terms of service
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
