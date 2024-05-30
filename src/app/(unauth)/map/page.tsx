import { LoadingSpinner } from "@/components/LoadingSpinner";
import VenueMap from "@/components/map";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <div className="z-0">
        <Suspense
          fallback={
            <div className="flex min-h-screen w-screen items-center justify-center">
              <LoadingSpinner />
            </div>
          }
        >
          <VenueMap />
        </Suspense>
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
    </>
  );
}
