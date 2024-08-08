"use client";

import { useAuth } from "@/context/auth";
import { useDebounce } from "@/context/debounce";
import { usePurchases } from "@/context/purchases";
import { useSearch } from "@/context/search";
import { BoundingBox } from "@/data/search";
import { profileImage } from "@/domain/types/user_model";
import { isVenueGoodFit } from "@/utils/good_fit";
import classNames from "classnames";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  // NavigationControl,
  // ScaleControl,
  MapEvent,
  Marker,
  // Popup,
} from "react-map-gl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { cn } from "@/lib/utils";

const defaultMapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const mapboxDarkStyle = "mapbox/dark-v11";
const mapboxLightStyle = "mapbox/light-v11";

const queryClient = new QueryClient();
export default function VenueMap(props: {
  lat: number;
  lng: number;
  minCapacity: number | null;
  maxCapacity: number | null;
  genres: string[];
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className="flex min-h-screen w-screen items-center justify-center">
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
  minCapacity,
  maxCapacity,
  genres,
}: {
  lat: number;
  lng: number;
  minCapacity: number | null;
  maxCapacity: number | null;
  genres: string[];
}) {
  // const [popupInfo, setPopupInfo] = useState<{
  //   longitude: number;
  //   latitude: number;
  //   city: string;
  //   state: string;
  //   image: string;
  // } | null>(null);
  const [bounds, setBounds] = useState<null | BoundingBox>(null);
  const { useVenueData } = useSearch();
  const debouncedBounds = useDebounce<null | BoundingBox>(bounds, 250);
  const router = useRouter();
  const pathname = usePathname();
  const { state: authState } = useAuth();
  const { state: subscribed } = usePurchases();
  const { resolvedTheme } = useTheme();
  const currentUser = authState?.currentUser ?? null;

  // redirect to signup if user is not logged in
  useEffect(() => {
    if (authState.authUser !== null || authState.currentUser !== null) {
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

  const { data } = useVenueData(debouncedBounds, {
    hitsPerPage: 250,
    minCapacity: minCapacity ?? undefined,
    maxCapacity: maxCapacity ?? undefined,
    venueGenres: genres.length > 0 ? genres : undefined,
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
  }, []);

  const markers = useMemo(
    () =>
      (data ?? [])
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
                const newSearchParams = `username=${venue.username}`;
                const newPathname = pathname.includes("?") ?
                  `${pathname}&${newSearchParams}` :
                  `${pathname}?${newSearchParams}`;
                if (authState?.authUser === null) {
                  const encoded = encodeURIComponent(newPathname);
                  router.push(`/signup?return_url=${encoded}`);
                  return;
                }

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
                  <>
                    <p
                      className={classNames(
                        "pl-1 pr-1",
                        goodFit ? "text-green-500" : ""
                      )}
                    >
                      {venueCapacity.toLocaleString()}
                    </p>
                  </>
                )}
              </div>
            </Marker>
          );
        })
        .filter((x) => x !== null) as JSX.Element[],
    [data, currentUser, subscribed, pathname, router, authState?.authUser]
  );

  const mapTheme =
    resolvedTheme === "light" ? mapboxLightStyle : mapboxDarkStyle;
  return (
    <div className="m-0 h-screen w-screen">
      <Map
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 11.5,
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
        {/* <NavigationControl position="bottom-right" /> */}
        {/* <ScaleControl /> */}

        {markers}
        {/*
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{" "}
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )} */}
      </Map>

      {/* <ControlPanel /> */}
    </div>
  );
}
