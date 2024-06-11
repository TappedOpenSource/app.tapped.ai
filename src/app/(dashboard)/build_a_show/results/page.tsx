import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ResultsTable from "@/components/venue_search/results_table";

import Link from "next/link";

export default function Page({ searchParams }: {
    searchParams: { [key: string]: string };
}) {
  const capacity = searchParams["capacity"] ?? "500";
  const genres = searchParams["genres"] ?? "";
  const lat = searchParams["lat"] ?? "0";
  const lng = searchParams["lng"] ?? "0";
  const radius = searchParams["radius"] ?? "250";

  console.log({ capacity, genres, lat, lng, radius });

  const performerGenres = genres.length > 0 ? genres.split(",") : [];
  const intCapacity = parseInt(capacity);
  const intLat = parseInt(lat);
  const intLng = parseInt(lng);
  const intRadius = parseInt(radius);

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
        <ResultsTable
          genres={performerGenres}
          lat={intLat}
          lng={intLng}
          radius={intRadius}
          capacity={intCapacity}
        />
      </ContentLayout>
    </>
  );
}
