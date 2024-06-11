import TappedSheet from "@/components/TappedSheet";
import MapHeader from "@/components/map_header";
import { headers } from "next/headers";

export default function UnauthLayout({ children }: {
    children: React.ReactNode;
}) {
  const header = headers();
  const pathname = header.get("x-pathname");
  const isMapPage = pathname?.includes("/map");

  return (
    <>
      <TappedSheet />
      <div className="fixed z-50 top-0">
        <MapHeader />
      </div>
      {!isMapPage && (
        <div className="h-[8rem]" />
      )}
      {children}
    </>
  );
}
