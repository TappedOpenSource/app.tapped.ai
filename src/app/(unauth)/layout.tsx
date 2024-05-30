import { LoadingSpinner } from "@/components/LoadingSpinner";
import TappedSheet from "@/components/TappedSheet";
import MapHeader from "@/components/map_header";
import { Suspense } from "react";

export default function UnauthLayout({ children }: {
    children: React.ReactNode;
}) {
  return (
    <>
      <TappedSheet />
      <div className="fixed z-10">
        <Suspense
          fallback={
            <div className="w-screen flex items-center justify-center">
              <LoadingSpinner />
            </div>
          }>
          <MapHeader />
        </Suspense>
      </div>
      {children}
    </>
  );
}
