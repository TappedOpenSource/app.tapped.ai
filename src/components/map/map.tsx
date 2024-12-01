"use client";

import { useAuth } from "@/context/auth";
import { useDebounce } from "@/context/debounce";
import { usePurchases } from "@/context/purchases";
import { useSearch } from "@/context/search";
import type { BoundingBox } from "@/data/search";
import { profileImage } from "@/domain/types/user_model";
import { isVenueGoodFit } from "@/utils/good_fit";
import classNames from "classnames";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Map as MapBoxGL,
  type MapEvent,
  Marker,
} from "react-map-gl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { cn } from "@/lib/utils";
import LocationSideSheet from "./LocationSideSheet";
import { trackEvent } from "@/utils/tracking";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import NumberFlow from "@number-flow/react";
import Link from "next/link";
import { Search, Theater } from "lucide-react";
import { useSearchToggle } from "@/context/use-search-toggle";
import { useStore } from "@/context/use-store";

const env = process.env.NODE_ENV || "development";
const defaultMapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const mapboxDarkStyle = "mapbox/dark-v11";
const mapboxLightStyle = "mapbox/light-v11";
const LIMIT = 250;

const queryClient = new QueryClient();
export default function VenueMap(props: {
  lat: number;
  lng: number;
  zoom: number;
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className="flex min-h-screen w-full items-center justify-center pt-[60px]">
              <LoadingSpinner />
            </div>
          }
        >
          <_VenueMap {...props} />
        </Suspense>
      </QueryClientProvider>
    </>
  );
}

function _VenueMap({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom: number;
}) {
  const [bounds, setBounds] = useState<null | BoundingBox>(null);
  const searchBar = useStore(useSearchToggle, (state) => state);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { useVenueData } = useSearch();
  const debouncedBounds = useDebounce<null | BoundingBox>(bounds, LIMIT);
  const router = useRouter();
  const { state: authState } = useAuth();
  const { state: subscribed } = usePurchases();
  const { resolvedTheme } = useTheme();
  const currentUser = authState?.currentUser ?? null;

  // redirect to signup if user is not logged in
  useEffect(() => {
    if (
      env !== "production" ||
      authState.authUser !== null ||
      authState.currentUser !== null
    ) {
      return;
    }

    const timeout = setTimeout(() => {
      if (authState.authUser !== null || authState.currentUser !== null) {
        return;
      }

      router.push("/signup?return_url=/map");
    }, 10_000);

    return () => {
      clearTimeout(timeout);
    };
  }, [authState.authUser, authState.currentUser, router]);

  const { data, isFetching } = useVenueData(debouncedBounds, {
    hitsPerPage: LIMIT,
  });

  const onRender = useCallback((e: MapEvent) => {
    const currentMapBounds = e.target.getBounds();
    if (currentMapBounds === null) {
      return;
    }

    setBounds({
      ne: {
        lat: currentMapBounds.getNorth(),
        lng: currentMapBounds.getWest(),
      },
      sw: {
        lat: currentMapBounds.getSouth(),
        lng: currentMapBounds.getEast(),
      },
    });

    // const { lat: newLat, lng: newLng } = e.target.getCenter();
    // const newZoom = e.target.getZoom();
    // setCenter({ lat: newLat, lng: newLng });
    // setZoom(newZoom);
    // router.push(`/map?lat=${newLat}&lng=${newLng}&zoom=${newZoom}`);
  }, []);

  const cachedMarkers = useRef<JSX.Element[]>([]);

  const markers = useMemo(() => {
    if (isFetching) {
      return cachedMarkers.current;
    }

    const newMarkers = (data ?? [])
      .map((venue) => {
        const lat = venue.location?.lat ?? null;
        const lng = venue.location?.lng ?? null;

        if (lat === null || lng === null) {
          return null;
        }

        const venueCapacity = venue.venueInfo?.capacity ?? 0;
        const imageSrc = profileImage(venue);

        const goodFit =
          currentUser !== null && subscribed === true ?
            isVenueGoodFit({
              user: currentUser,
              venue,
            }) :
            false;
        const hasBookingData = venue.venueInfo?.bookingsByDayOfWeek?.some(
          (val) => val !== 0
        );
        return (
          <Marker
            key={venue.id}
            longitude={lng}
            latitude={lat}
            anchor="center"
            onClick={() => {
              trackEvent("marker_clicked", {
                venueId: venue.id,
              });
              const newPathname = `/map?username=${venue.username}`;
              router.push(newPathname);
            }}
          >
            <div
              className={cn(
                "bg-background flex transform flex-row items-center justify-center rounded-xl px-1 py-1 shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:cursor-pointer",
                hasBookingData ?
                  "border-2 border-dotted border-yellow-500" :
                  "border-background border-none"
              )}
            >
              <div className="relative h-[22px] w-[22px]">
                <Image
                  src={imageSrc}
                  alt="venue profile picture"
                  className="rounded-md"
                  style={{ objectFit: "cover", overflow: "hidden" }}
                  fill
                  sizes="22px"
                />
              </div>
              {venueCapacity !== 0 && (
                <p
                  className={classNames(
                    "pl-1 pr-1",
                    goodFit ? "text-green-500" : ""
                  )}
                >
                  {venueCapacity.toLocaleString()}
                </p>
              )}
            </div>
          </Marker>
        );
      })
      .filter((x) => x !== null) as JSX.Element[];

    cachedMarkers.current = newMarkers;

    return newMarkers;
  }, [data, currentUser, subscribed, router, isFetching]);

  const markersCount = useMemo(() => {
    if (isFetching) {
      return cachedMarkers.current.length;
    }

    return markers.length;
  }, [isFetching, markers]);

  const mapTheme =
    resolvedTheme === "light" ? mapboxLightStyle : mapboxDarkStyle;
  return (
    <>
      <LocationSideSheet
        venues={data ?? []}
        lat={lat}
        lng={lng}
        zoom={zoom}
        isOpen={sidebarIsOpen}
        onOpenChange={() => setSidebarIsOpen(!sidebarIsOpen)}
      />
      <div className="fixed inset-0 z-0 flex h-full w-full flex-col overflow-hidden">
        <div className="absolute bottom-0 z-40 flex w-full justify-center">
          <Card className="m-3 flex gap-3 p-1">
            <Button
              variant="outline"
              className={cn("flex gap-1")}
              onClick={() => {
                trackEvent("menu_click");
                setSidebarIsOpen(!sidebarIsOpen);
              }}
            >
              <span>
                {markersCount === LIMIT && "+"}
                <NumberFlow value={markersCount} />
              </span>
              venues
            </Button>
            <Link href="/venue_outreach">
              <Button variant="secondary">apply to perform</Button>
            </Link>
            <Button
              size="icon"
              variant="secondary"
              onClick={() => searchBar?.setIsOpen()}
            >
              <Search className="size-3" />
            </Button>
          </Card>
        </div>
        <div className="relative flex-1">
          <MapBoxGL
            style={{ height: "100vh !important", width: "100% !important" }}
            initialViewState={{
              latitude: lat,
              longitude: lng,
              zoom: zoom,
              bearing: 0,
              pitch: 0,
            }}
            mapStyle={`mapbox://styles/${mapTheme}`}
            mapboxAccessToken={defaultMapboxToken}
            onRender={onRender}
          >
            <GeolocateControl
              position="bottom-right"
              showUserHeading
              trackUserLocation
            />
            <FullscreenControl position="bottom-right" />
            {markers}
          </MapBoxGL>
        </div>
      </div>
      {/* <ControlPanel /> */}
    </>
  );
}
