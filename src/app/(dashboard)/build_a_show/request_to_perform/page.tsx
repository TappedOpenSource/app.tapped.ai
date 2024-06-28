
import { ContentLayout } from "@/components/admin-panel/content-layout";
import RequestToPerformForm from "@/components/request_to_perform/RequestToPerformForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
export default function Page({ searchParams }: {
  searchParams: { [key: string]: string };
}) {
  const rawVenueIds = searchParams["venue_ids"];
  const venueIds = rawVenueIds ? rawVenueIds.split(",") : [];

  return (
    <>
      <ContentLayout title="build a show">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>build a show</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RequestToPerformForm venueIds={venueIds} />
      </ContentLayout>
    </>
  );
}
