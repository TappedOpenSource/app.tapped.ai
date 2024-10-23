"use client";

import useWindowDimensions from "@/utils/window_dimensions";
import UserSideSheet from "./UserSideSheet";
import UserBottomSheet from "./BottomSheet";
import { Suspense } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export default function TappedSheet() {
  const { width } = useWindowDimensions();
  const screenIsSmall = width < 640;

  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        {screenIsSmall ? <UserBottomSheet /> : <UserSideSheet />}
      </Suspense>
    </>
  );
}
