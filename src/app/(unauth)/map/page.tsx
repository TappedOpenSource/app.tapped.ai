"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import VenueMap from "@/components/map";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense } from "react";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex min-h-screen w-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <div className="z-0">
          <QueryClientProvider client={queryClient}>
            <VenueMap />
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
