"use client";

import { columns } from "@/components/venue_search/columns";
import { DataTable } from "@/components/data_table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

export type LeaderboardType = "trending" | "performer" | "venue" | "genre" | "city";
export default function LeaderboardTable({ type }: { type: LeaderboardType }) {
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // onRowSelectionChange: setRowSelection,
  });

  return (
    <>
      <div className="container mx-auto py-10 overflow-y-scroll">
        <p>
          {type}
        </p>
        <DataTable table={table} />
      </div>
    </>
  );
}
