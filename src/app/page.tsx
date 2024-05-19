"use client";

import BottomSheet from "@/components/BottomSheet";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import UserSideSheet from "@/components/UserSideSheet";
import VenueMap from "@/components/map";
import MapHeader from "@/components/map_header";
import useWindowDimensions from "@/utils/window_dimensions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

const queryClient = new QueryClient();

export default function Page() {
  const { width } = useWindowDimensions();
  const screenIsSmall = width < 640;

  return (
    <>
      <Suspense
        fallback={
          <div className="flex min-h-screen w-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        {screenIsSmall ? <BottomSheet /> : <UserSideSheet />}
      </Suspense>
      <div className="absolute z-10">
        <MapHeader />
      </div>
      <div className="z-0">
        <QueryClientProvider client={queryClient}>
          <VenueMap />
        </QueryClientProvider>
      </div>
    </>
  );
}
