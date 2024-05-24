"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { columns } from "@/components/venue_search/columns";
import { DataTable } from "@/components/venue_search/data_table";
import { useSearch } from "@/context/search";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

export default function Page({ searchParams }: {
    searchParams: { [key: string]: string };
}) {
  const capacity = searchParams["capacity"] ?? "500";
  const genres = searchParams["genres"] ?? "";
  const lat = searchParams["lat"] ?? "0";
  const lng = searchParams["lng"] ?? "0";
  const radius = searchParams["radius"] ?? "250";
  const { useSearchData } = useSearch();

  console.log({ capacity, genres, lat, lng, radius });

  const performerGenres = genres.length > 0 ? genres.split(",") : [];

  const { data } = useSearchData("", {
    hitsPerPage: 30,
    maxCapacity: parseInt(capacity),
    venueGenres: performerGenres,
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    radius: parseInt(radius),
  });
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const venueIds = table.getFilteredRowModel().rows.map((row) => row.original.id);

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
        <div className="container mx-auto py-10 overflow-y-scroll">
          <div className="flex justify-end py-3">
            <Button
              disabled={table.getFilteredSelectedRowModel().rows.length === 0}
            >
              <Link
                href={`/build_a_show/request_to_perform?venue_ids=${venueIds.join(",")}`}
              >
            request to perform
              </Link>
            </Button>
          </div>
          <DataTable table={table} />
        </div>
      </ContentLayout>
    </>
  );
}
