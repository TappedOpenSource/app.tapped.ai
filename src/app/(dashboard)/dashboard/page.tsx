import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DownloadTheAppSection from "@/components/profile/DownloadTheAppSection";
import Link from "next/link";
import TasksSection from "@/components/dashboard/TasksSection";
import ContactedVenuesSlider from "@/components/dashboard/ContactedVenuesSlider";
import BookingHistory from "@/components/dashboard/BookingHistory";

export default function Page() {
  // how many venues you've contacted in the last week
  // how many have responded in the last week
  // how many total conversations you've had
  // how many total venues you've contacted
  // what was the last one you contacted
  // what was the last one that's messaged you
  return (
    <>
      <ContentLayout title="dashboard">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                dashboard
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="hidden md:block py-16 px-8">
          <TasksSection />
          <div className="py-4" />
          <ContactedVenuesSlider />
          <div className="py-4" />
          <BookingHistory />
        </div>
        <div className="md:hidden">
          <DownloadTheAppSection />
        </div>
      </ContentLayout>
    </>
  );
}
