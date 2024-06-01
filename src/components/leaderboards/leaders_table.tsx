"use client";

import { DataTable } from "@/components/data_table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { type UserModel } from "@/domain/types/user_model";
import { getBookingLeaders, getFeaturedPerformers } from "@/data/database";
import { columns } from "./columns";

export type LeaderboardType = "trending" | "performer" | "venue" | "genre" | "city";
export default function LeaderboardTable({ type }: { type: LeaderboardType }) {
  // trending = bookingLeaders
  // performer= featuredPerformers
  // venue = venuesSortByNumberOfBookings
  // genre = allBookings.map(b => b.genres).flat().reduce((acc, g) => acc.set(g, (acc.get(g) ?? 0) + 1), new Map())
  // city = allBookings.map(b => b.location).reduce((acc, c) => acc.set(c, (acc.get(c) ?? 0) + 1), new Map())
  const [data, setData] = useState<UserModel[]>([]);
  useEffect(() => {
    if (type === "trending" ) {
      const fetchLeaders = async () => {
        const leaders = await getBookingLeaders();
        setData(leaders);
      };
      fetchLeaders();
    }

    if (type === "performer" ) {
      const fetchPerformers = async () => {
        const performers = await getFeaturedPerformers();
        setData(performers);
      };
      fetchPerformers();
    }
  }, [type]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // onRowSelectionChange: setRowSelection,
  });

  return (
    <>
      <div className="container mx-auto py-10 overflow-y-scroll">
        <h1 className="text-3xl font-bold">
          {type}
        </h1>
        <DataTable table={table} />
      </div>
    </>
  );
}
