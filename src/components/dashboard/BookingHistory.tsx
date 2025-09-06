"use client";

import { getBookingsByRequestee, getBookingsByRequester } from "@/data/database";
import BookingHistoryPreview from "../profile/BookingHistoryPreview";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import type { Booking } from "@/domain/types/booking";
import AddBooking from "../opportunity/form/AddBooking";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function BookingHistory() {
  const {
    state: { currentUser },
  } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    const fetchBooking = async () => {
      if (currentUser === null) {
        return;
      }

      // fetch latest booking
      const latestRequesteeBookings = await getBookingsByRequestee(currentUser.id, { limit: 40 });
      const latestRequesterBookings = await getBookingsByRequester(currentUser.id, { limit: 40 });
      const latestBookings = latestRequesteeBookings.concat(latestRequesterBookings).sort((a, b) => {
        return b.startTime.getTime() - a.startTime.getTime();
      });

      setBookings(latestBookings);
    };
    fetchBooking();
  }, [currentUser]);

  if (currentUser === null) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-start gap-2">
        <h3 className="font-bold text-gray-500">booking history</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddBooking
              onSubmit={(booking) => {
                setBookings([booking, ...bookings]);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="py-1" />
      <BookingHistoryPreview bookings={bookings} user={currentUser} />
    </>
  );
}
