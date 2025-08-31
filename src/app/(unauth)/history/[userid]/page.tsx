"use client";

import BookingTile from "@/components/profile/BookingTile";
import { getBookingsByRequestee, getBookingsByRequester, getUserById } from "@/data/database";
import { Booking } from "@/domain/types/booking";
import { UserModel } from "@/domain/types/user_model";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, use } from "react";

export default function History(props: { params: Promise<{ userid: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const userId = params.userid;

  const [performer, setPerformer] = useState<UserModel | null>(null); // TODO: [performer, setPerformer
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (userId === null) {
        return;
      }

      // fetch latest booking
      const latestRequesteeBookings = await getBookingsByRequestee(userId);
      const latestRequesterBookings = await getBookingsByRequester(userId);
      const latestBookings = latestRequesteeBookings.concat(latestRequesterBookings).sort((a, b) => {
        return b.startTime.getTime() - a.startTime.getTime();
      });

      setBookings(latestBookings);
    };
    fetchBookings();
  }, [userId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof userId !== "string") {
        return;
      }

      const user = await getUserById(userId);
      if (user === undefined || user === null) {
        router.push("/404");
        return;
      }
      setPerformer(user);
      setLoading(false);
    };
    fetchUser();
  }, [userId, router]);

  if (loading || !performer) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>fetching bookings... </p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>no bookings</p>
      </div>
    );
  }

  return (
    <>
      <div className="md:flex md:justify-center">
        <div className="px-6 py-4 md:w-1/2">
          <h1 className="text-4xl font-extrabold">history</h1>
          <div className="h-4" />
          {bookings.map((booking, index) => (
            <div key={index} className="py-4">
              <BookingTile booking={booking} />
              <div className="h-4" />
            </div>
          ))}
          <div className="h-4" />
          <div className="flex items-center justify-center">
            <p className="text-xs font-thin text-gray-500">end of list</p>
          </div>
        </div>
      </div>
    </>
  );
}
