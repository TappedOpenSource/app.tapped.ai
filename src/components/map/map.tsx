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
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import NumberFlow from "@number-flow/react";
import Link from "next/link";
import {
  Bug,
  Download,
  Gem,
  Home,
  LogOut,
  MapIcon,
  MessageCircle,
  Search,
  Settings,
  Theater,
  User,
  User2,
} from "lucide-react";
import { useSearchToggle } from "@/context/use-search-toggle";
import { useStore } from "@/context/use-store";
import { logout } from "@/data/auth";

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
  const {
    state: { currentUser, authUser },
  } = useAuth();
  const { state: subscribed } = usePurchases();
  const { resolvedTheme } = useTheme();
  const isLoggedIn = authUser !== null;
  const displayName = currentUser?.artistName ?? currentUser?.username ?? "use";
  const email = currentUser?.email ?? authUser?.email ?? "user@tapped.ai";

  // redirect to signup if user is not logged in
  useEffect(() => {
    if (env !== "production" || authUser !== null || currentUser !== null) {
      return;
    }

    const timeout = setTimeout(() => {
      if (authUser !== null || currentUser !== null) {
        return;
      }

      router.push("/signup?return_url=/map");
    }, 10_000);

    return () => {
      clearTimeout(timeout);
    };
  }, [authUser, currentUser, router]);

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
            <Link href="/venue_outreach" className="hidden lg:block">
              <Button variant="secondary">apply to perform</Button>
            </Link>

            <div className="flex gap-1">
              <Link href="/venue_outreach" className="lg:hidden">
                <Button size="icon" variant="secondary">
                  <Theater className="size-3" />
                </Button>
              </Link>
              <Link href="/messages">
                <Button size="icon" variant="secondary">
                  <MessageCircle className="size-3" />
                </Button>
              </Link>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => searchBar?.setIsOpen()}
              >
                <Search className="size-3" />
              </Button>
              <Link href="/download" className="lg:hidden">
                <Button size="icon" variant="secondary">
                  <Download className="size-3" />
                </Button>
              </Link>
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={currentUser?.profilePicture ?? undefined}
                          alt="Avatar"
                        />
                        <AvatarFallback className="bg-transparent">
                          {currentUser?.username.slice(0, 2) ?? "JD"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {displayName}
                        </p>
                        <p className="text-muted-foreground text-xs leading-none">
                          {email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        asChild
                      >
                        <Link href="/" className="flex items-center">
                          <Home className="text-muted-foreground mr-3 h-4 w-4" />
                          dashboard
                        </Link>
                      </DropdownMenuItem>
                      {currentUser?.username !== undefined && (
                        <>
                          <DropdownMenuItem
                            className="hover:cursor-pointer"
                            asChild
                          >
                            <Link
                              href={`/u/${currentUser?.username ?? ""}`}
                              className="flex items-center"
                            >
                              <User className="text-muted-foreground mr-3 h-4 w-4" />
                              public profile
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        asChild
                      >
                        <Link href="/billing" className="flex items-center">
                          <Gem className="text-muted-foreground mr-3 h-4 w-4" />
                          billing
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        asChild
                      >
                        <Link
                          href="https://tapped.canny.io/ideas-bugs"
                          className="flex items-center"
                        >
                          <Bug className="text-muted-foreground mr-3 h-4 w-4" />
                          report bugs
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        asChild
                      >
                        <Link href="/settings" className="flex items-center">
                          <Settings className="text-muted-foreground mr-3 h-4 w-4" />
                          settings
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                      <Link href="/download" className="flex items-center">
                        <Download className="text-muted-foreground mr-3 h-4 w-4" />
                        get the app
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:cursor-pointer"
                      onClick={() => {
                        logout();
                        router.push("/");
                      }}
                    >
                      <LogOut className="text-muted-foreground mr-3 h-4 w-4" />
                      sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href={`/signup?return_url=${encodeURIComponent("/map")}`}>
                  <Button size="icon">
                    <User2 className="size-3" />
                  </Button>
                </Link>
              )}
            </div>
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
