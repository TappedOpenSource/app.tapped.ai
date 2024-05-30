"use client";

import UserBottomSheet from "@/components/BottomSheet";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import UserSideSheet from "@/components/UserSideSheet";
import VenueMap from "@/components/map";
import MapHeader from "@/components/map_header";
import { Button } from "@/components/ui/button";
import useWindowDimensions from "@/utils/window_dimensions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
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
        {screenIsSmall ? <UserBottomSheet /> : <UserSideSheet />}
        <div className="absolute z-10">
          <MapHeader />
        </div>
        <div className="z-0">
          <QueryClientProvider client={queryClient}>
            <VenueMap showFeaturedPerformers={true} />
          </QueryClientProvider>
        </div>
        <div className="hidden md:absolute z-10 bottom-0 w-screen">
          <div className="flex flex-row items-center justify-center">
            <p className="text-center text-sm">
              © {new Date().getFullYear()} Tapped Industries Inc. All rights reserved.
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
      </Suspense>
    </>
  );
}
