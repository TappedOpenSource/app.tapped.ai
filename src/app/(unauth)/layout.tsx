"use client";

import UserBottomSheet from "@/components/BottomSheet";
import UserSideSheet from "@/components/UserSideSheet";
import MapHeader from "@/components/map_header";
import useWindowDimensions from "@/utils/window_dimensions";

export default function UnauthLayout({ children }: {
    children: React.ReactNode;
}) {
  const { width } = useWindowDimensions();
  const screenIsSmall = width < 640;

  return (
    <>
      {screenIsSmall ? <UserBottomSheet /> : <UserSideSheet />}
      <div className="fixed z-10">
        <MapHeader />
      </div>
      {children}
    </>
  );
}
