import DownloadTheAppSection from "@/components/profile/DownloadTheAppSection";
import TasksSection from "@/components/dashboard/TasksSection";
import ContactedVenuesSlider from "@/components/dashboard/ContactedVenuesSlider";
import BookingHistory from "@/components/dashboard/BookingHistory";
import StatsSection from "@/components/dashboard/StatsSection";
import UnauthHeader from "@/components/unauth_header";

export default function Page() {
  // how many venues you've contacted in the last week (number)
  // AND how many have responded in the last week (ratio)
  // how many shows you've had this month (number)
  // how many total venues you've contacted (number)
  // how much money you've made this month (number)
  // what was the last one you contacted with status (list)
  // booking history (list)
  // shows over time (graph)
  return (
    <>
      <UnauthHeader />
      <div className="hidden flex-col px-8 py-16 md:flex">
        <TasksSection />
        <div className="py-4" />
        <StatsSection />
        <div className="py-4" />
        <ContactedVenuesSlider />
        <div className="py-4" />
        <BookingHistory />
      </div>
      <div className="md:hidden">
        <DownloadTheAppSection />
      </div>
    </>
  );
}
