'use client';

import Image from 'next/image';
import { useState, useMemo, useCallback } from 'react';
import {
  Map,
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  MapboxEvent,
} from 'react-map-gl';
import { BoundingBox } from '@/data/search';
import { useDebounce } from '@/context/debounce';
import { useSearch } from '@/context/search';
import { profileImage } from '@/domain/types/user_model';
import { useRouter } from 'next/navigation';

const defaultMapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const mapboxDarkStyle = 'mapbox/dark-v11';
// const mapboxLightStyle = 'mapbox/light-v10';

export default function VenueMap() {
  const [popupInfo, setPopupInfo] = useState<{
        longitude: number;
        latitude: number;
        city: string;
        state: string;
        image: string;
    } | null>(null);
  const { useVenueData } = useSearch();
  const [bounds, setBounds] = useState<null | BoundingBox>(null);
  const debouncedBounds = useDebounce<null | BoundingBox>(bounds, 250);
  const router = useRouter();

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
      (data ?? []).slice(0, 5).map((venue) => {
        const lat = venue.location?.lat ?? null;
        const lng = venue.location?.lat ?? null;

        if (lat === null || lng === null) {
          return null;
        }

        const venueCapacity = venue.venueInfo?.capacity ?? 0;
        const imageSrc = profileImage(venue);
        return (
          <Marker
            key={venue.id}
            longitude={lng}
            latitude={lat}
            anchor="center"
            onClick={() => router.push(`/map?username=${venue.username}`)}
          >
            <div className='flex flex-row justify-center items-center rounded-xl px-1 py-1 bg-gray-900 shadow-xl hover:cursor-pointer hover:scale-105 transform transition-all duration-200 ease-in-out'>
              <div className="relative h-[22px] w-[22px]">
                <Image
                  src={imageSrc}
                  alt="venue profile picture"
                  className="rounded-full"
                  style={{ objectFit: 'cover', overflow: 'hidden' }}
                  fill
                />
              </div>
              {venueCapacity !== 0 && (
                <>
                  <p className="pl-1 pr-1">{venueCapacity}</p>
                </>
              )}
            </div>
          </Marker>
        );
      }),
    [data, router]
  );

  return (
    <div className='w-screen h-screen m-0'>
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
        <GeolocateControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
        <NavigationControl position="bottom-right" />
        <ScaleControl />

        {markers}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{' '}
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
    </div >
  );
}
