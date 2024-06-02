"use client";

import { DataTable } from "@/components/data_table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { type UserModel } from "@/domain/types/user_model";
import { getBookingLeaders, getFeaturedPerformers } from "@/data/database";
import { columns } from "./columns";

export type LeaderboardType = "trending" | "performer";
export default function LeaderboardTable({ type }: { type: LeaderboardType }) {
  // trending = bookingLeaders
  // performer= featuredPerformers
  // venue = venuesSortByNumberOfBookings
  // genre = allBookings.map(b => b.genres).flat().reduce((acc, g) => acc.set(g, (acc.get(g) ?? 0) + 1), new Map())
  // city = allBookings.map(b => b.location).reduce((acc, c) => acc.set(c, (acc.get(c) ?? 0) + 1), new Map())

  const [trending, setTrending] = useState<UserModel[]>([]);
  const [topPerformers, setTopPerformers] = useState<UserModel[]>([]);
  // const [topVenues, setTopVenues] = useState<UserModel[]>([]);
  // const [topGenres, setTopGenres] = useState<Map<string, number>>(new Map());
  // const [topCities, setTopCities] = useState<{
  //   city: string;
  //   numVenues: number;
  //   topGenres: string[];
  // }[]>([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const leaders = await getBookingLeaders();
      setTrending(leaders);
    };
    fetchLeaders();

    const fetchPerformers = async () => {
      const performers = await getFeaturedPerformers();
      setTopPerformers(performers);
    };
    fetchPerformers();

    // const fetchVenues = async () => {
    //   const venues: UserModel[] = await getVenuesByBookings();
    //   const venueGenres = venues.map((v) => v.venueInfo?.genres).flat().reduce((acc, g) => acc.set(g, (acc.get(g) ?? 0) + 1), new Map());
    //   setTopVenues(venues);
    //   setTopGenres(venueGenres);
    // };
    // fetchVenues();

    // const fetchCities = async () => {
    //   const cities = await getTopCities();
    //   setTopCities(cities);
    // };
    // fetchCities();
  }, []);

  const data = type === "trending" ? trending : topPerformers;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // onRowSelectionChange: setRowSelection,
  });

  return (
    <>
      <div className="container mx-auto py-10 overflow-y-scroll">
        <h1 className="text-3xl font-bold py-6">
          {type}
        </h1>
        <DataTable table={table} />
      </div>
    </>
  );
}
