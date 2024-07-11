import DashboardMap from "@/components/dashboard-map/map";
import DownloadTheAppSection from "@/components/profile/DownloadTheAppSection";

export default function Page() {
  return (
    <>
      <div className="hidden lg:block">
        <DashboardMap />
      </div>
      <div className="lg:hidden">
        <DownloadTheAppSection />
      </div>
    </>
  );
}
