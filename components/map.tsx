"use client";

import { useAuth } from "@/context/auth";
import { useDebounce } from "@/context/debounce";
import { usePurchases } from "@/context/purchases";
import { useSearch } from "@/context/search";
import { BoundingBox } from "@/data/search";
import { profileImage } from "@/domain/types/user_model";
import { isVenueGoodFit } from "@/utils/good_fit";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  // NavigationControl,
  // ScaleControl,
  MapboxEvent,
  Marker,
  Popup,
} from "react-map-gl";

const defaultMapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const mapboxDarkStyle = "mapbox/dark-v11";
// const mapboxLightStyle = 'mapbox/light-v10';

export default function VenueMap() {
  const [popupInfo, setPopupInfo] = useState<{
    longitude: number;
    latitude: number;
    city: string;
    state: string;
    image: string;
  } | null>(null);
  const [bounds, setBounds] = useState<null | BoundingBox>(null);
  const { useVenueData } = useSearch();
  const debouncedBounds = useDebounce<null | BoundingBox>(bounds, 250);
  const router = useRouter();
  const { state: authState } = useAuth();
  const { state: subscribed } = usePurchases();

  const currentUser = authState?.currentUser ?? null;

  const { data } = useVenueData(debouncedBounds);

  const onRender = useCallback((e: MapboxEvent) => {
    const currentMapBounds = e.target.getBounds();
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
          return (
            <Marker
              key={venue.id}
              longitude={lng}
              latitude={lat}
              anchor="center"
              onClick={() => router.push(`/map?username=${venue.username}`)}
            >
              <div className="bg-background flex transform flex-row items-center justify-center rounded-xl px-1 py-1 shadow-xl transition-all duration-200 ease-in-out hover:scale-105 hover:cursor-pointer">
                <div className="relative h-[22px] w-[22px]">
                  <Image
                    src={imageSrc}
                    alt="venue profile picture"
                    className="rounded-full"
                    style={{ objectFit: "cover", overflow: "hidden" }}
                    fill
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
    [data, router, currentUser, subscribed]
  );

  return (
    <div className="m-0 h-screen w-screen">
      <Map
        initialViewState={{
          latitude: 38.895,
          longitude: -77.0366,
          zoom: 5.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle={`mapbox://styles/${mapboxDarkStyle}`}
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
        )}
      </Map>

      {/* <ControlPanel /> */}
    </div>
  );
}
