import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { columns } from "@/components/venue_search/columns";
import { DataTable } from "@/components/venue_search/data_table";
import { useSearch } from "@/context/search";
import Link from "next/link";

export default function Page({ searchParams }: {
    searchParams: { [key: string]: string };
}) {
  const capacity = searchParams["capacity"];
  const genres = searchParams["genres"];
  const lat = searchParams["lat"];
  const lng = searchParams["lng"];
  const radius = searchParams["radius"];
  const { useSearchData } = useSearch();

  const { data } = useSearchData("", {
    hitsPerPage: 50,
    minCapacity: parseInt(capacity),
    genres: genres.split(","),
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    radius: parseInt(radius),
  });

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
              <BreadcrumbLink asChild>
                <Link href="/dashboard">map</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>build a show</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data ?? []} />
        </div>
      </ContentLayout>
    </>
  );
}
