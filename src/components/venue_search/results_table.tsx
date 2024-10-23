"use client";

import { Button } from "@/components/ui/button";
import { columns } from "@/components/venue_search/columns";
import { DataTable } from "@/components/data_table";
import { useSearch } from "@/context/search";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

export default function ResultsTable({
  capacity,
  genres,
  lat,
  lng,
  radius,
}: {
  capacity: number;
  genres: string[];
  lat: number;
  lng: number;
  radius: number;
}) {
  const { useSearchData } = useSearch();
  const { data } = useSearchData("", {
    hitsPerPage: 30,
    maxCapacity: capacity,
    venueGenres: genres,
    lat: lat,
    lng: lng,
    radius: radius,
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
      <div className="container mx-auto py-10 overflow-y-scroll">
        <div className="flex justify-end py-3">
          <Button disabled={table.getFilteredSelectedRowModel().rows.length === 0}>
            <Link href={`/venue_outreach/request_to_perform?venue_ids=${venueIds.join(",")}`}>request to perform</Link>
          </Button>
        </div>
        <DataTable table={table} />
      </div>
    </>
  );
}
