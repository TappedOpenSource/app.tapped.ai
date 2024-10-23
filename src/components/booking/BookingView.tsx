"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getBookingById, getBookingsByEventId, getBookingsByEventUrl, getUserById } from "@/data/database";
import { Booking } from "@/domain/types/booking";
import UserTile from "../UserTile";
import { UserModel } from "@/domain/types/user_model";
import { LoadingSpinner } from "../LoadingSpinner";
import { Plus } from "lucide-react";
import UserAvatarList from "../UserAvatarList";
import UserCluster from "../UserCluster";

export default function BookingView({
  bookingId,
}: {
  bookingId: string;
}) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [booker, setBooker] = useState<UserModel | null>(null);
  const [performer, setPerformer] = useState<UserModel | null>(null);
  const [linkedPerformers, setLinkedPerformers] = useState<UserModel[]>([]);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      const booking = await getBookingById(bookingId);
      setBooking(booking ?? null);
      setLoading(false);
    };
    fetchBooking();
  }, [bookingId]);

  useEffect(() => {
    if (booking !== null) {
      const fetchBooker = async () => {
        const requesterId = booking.requesterId;
        if (requesterId === undefined || requesterId === null) {
          return;
        }

        const user = await getUserById(requesterId);
        setBooker(user ?? null);
      };
      fetchBooker();
    }
  }, [booking]);

  useEffect(() => {
    if (booking !== null) {
      const fetchPerformer = async () => {
        const performerId = booking.requesteeId;
        if (performerId === undefined || performerId === null) {
          return;
        }

        const user = await getUserById(performerId);
        setPerformer(user ?? null);
      };
      fetchPerformer();
    }
  }, [booking]);

  useEffect(() => {
    const fetchLinkedEvents = async () => {
      if (booking === null) {
        return;
      }

      const eventId = booking.referenceEventId;
      const eventUrl = booking.eventUrl;

      if (eventId !== undefined && eventId !== null) {
        // get other events with the same referenceEventId
        const bookings = await getBookingsByEventId(eventId);
        const filteredBookings = bookings.filter((b) => b.id !== booking.id);

        const performers = await Promise.all(filteredBookings.map((b) => getUserById(b.requesteeId)));
        setLinkedPerformers(performers.filter((p) => p !== null) as UserModel[]);
        return;
      }

      if (eventUrl !== undefined && eventUrl !== null) {
        const bookings = await getBookingsByEventUrl(eventUrl);
        const filteredBookings = bookings.filter((b) => b.id !== booking.id);

        const performers = await Promise.all(filteredBookings.map((b) => getUserById(b.requesteeId)));
        setLinkedPerformers(performers.filter((p) => p !== null) as UserModel[]);
        return;
      }

      setLinkedPerformers([]);
    };
    fetchLinkedEvents();
  }, [booking]);

  if (booking === null) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  // const duration = formatDuration(booking.startTime, booking.endTime);

  const bookerStuff =
    booker === null ? null : (
      <>
        <h3 className="font-extrabold text-xl">booker</h3>
        <UserTile user={booker} />
      </>
    );

  const performerStuff =
    performer === null ? null : (
      <>
        <h3 className="font-extrabold text-xl">performer</h3>
        <div className="flex flex-row items-center gap-4">
          <UserTile user={performer} />
          {linkedPerformers.length > 0 && (
            <>
              <Plus className="w-6 h-6 text-gray-500" />
              <UserCluster users={linkedPerformers} />
            </>
          )}
        </div>
      </>
    );

  const dateString = booking.startTime.toDateString();
  const timeString = booking.startTime.toLocaleTimeString();

  return (
    <>
      <div className="flex justify-center">
        <div className="px-6 pb-12 w-auto md:w-1/2">
          {booking.flierUrl !== null && booking.flierUrl !== undefined && (
            <div className="relative h-[60vh] w-[95vw] md:w-full rounded-xl">
              <Image src={booking.flierUrl} alt="flier" fill objectFit="cover" className="rounded-xl" />
            </div>
          )}
          <h1 className="font-extrabold text-4xl">{booking.name}</h1>
          <div className="h-8" />
          {bookerStuff}
          <div className="h-6" />
          {performerStuff}
          <div className="h-6" />
          <h3 className="font-extrabold text-xl">Date</h3>
          <p>
            {dateString} @ {timeString}
          </p>
        </div>
      </div>
      <div className="h-42" />
    </>
  );
}

// function formatDuration(startDate: Date, endDate: Date): string {
//   // Get the difference in milliseconds between the two dates.
//   const diff = endDate.getTime() - startDate.getTime();

//   // Convert the difference to seconds.
//   const seconds = diff / 1000;

//   // Convert the seconds to minutes.
//   const minutes = seconds / 60;

//   // Convert the minutes to hours and minutes.
//   const hours = Math.floor(minutes / 60);
//   const remainingMinutes = Math.floor(minutes % 60);

//   return `${hours} hours and ${remainingMinutes} minutes`;
// }
