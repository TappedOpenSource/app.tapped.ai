"use client";

import BottomSheet from "@/components/BottomSheet";
import UserSideSheet from "@/components/UserSideSheet";
import UnauthHeader from "@/components/unauth_header";
import useWindowDimensions from "@/utils/window_dimensions";

export default function UnauthLayout({ children }: {
    children: React.ReactNode;
}) {
  const { width } = useWindowDimensions();
  const screenIsSmall = width < 640;

  return (
    <>
      {screenIsSmall ? <BottomSheet /> : <UserSideSheet />}
      <div className="absolute z-10">
        <UnauthHeader />
      </div>
      {children}
    </>
  );
}
