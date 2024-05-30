import TappedSheet from "@/components/TappedSheet";
import MapHeader from "@/components/map_header";

export default function UnauthLayout({ children }: {
    children: React.ReactNode;
}) {
  return (
    <>
      <TappedSheet />
      <div className="fixed z-10">
        <MapHeader />
      </div>
      {children}
    </>
  );
}
