"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import AddBooking from "@/components/opportunity/form/AddBooking";
import BookingTile from "@/components/profile/BookingTile";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/context/auth";
import { getBookingsByRequestee } from "@/data/database";
import { Booking } from "@/domain/types/booking";
import { Plus, Rocket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const {
    state: { authUser },
  } = useAuth();
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);

  useEffect(() => {
    if (!authUser) {
      return;
    }

    const fetchBookingHistory = async () => {
      const bookings = await getBookingsByRequestee(authUser.uid);
      setBookingHistory(bookings);
    };
    fetchBookingHistory();
  }, [authUser]);

  if (!authUser) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <div className="mx-auto flex max-w-3xl gap-2 space-y-6 py-12 lg:flex-row lg:gap-8">
        <div>
          <Alert className="hidden lg:block">
            <Rocket className="h-4 w-4" />
            <AlertTitle>ADD YOUR BOOKING HISTORY!!</AlertTitle>
            <AlertDescription>
              for this gig (and any gig for that matter){" "}
              <b>
                it is 86% more likely for you to get booked if you have a
                booking history
              </b>
              , small or large. This can be a house show, rooftop event, opening
              for another performer, literally anything.{" "}
              <b>DO NOT LEAVE IT EMPTY</b> or you’re basically guaranteeing that
              you won’t get a response.
            </AlertDescription>
          </Alert>
        </div>
        <div className="space-y-2">
          <div className="space-y-2 text-start">
            <h1 className="text-3xl font-bold">your booking history</h1>
          </div>
          {bookingHistory.length > 0 ? (
            <>
              {bookingHistory.slice(0, 5).map((b) => (
                <BookingTile booking={b} key={b.id} />
              ))}
            </>
          ) : (
            <p className="text-foreground/50">no booking history</p>
          )}
          <div className="flex flex-row gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-1 h-4 w-4" />
                  add booking
                </Button>
              </DialogTrigger>
              <DialogContent>
                <AddBooking
                  onSubmit={(booking) => {
                    setBookingHistory([booking, ...bookingHistory]);
                  }}
                />
              </DialogContent>
            </Dialog>
            {bookingHistory.length >= 5 && (
              <Link
                referrerPolicy="no-referrer"
                target="_blank"
                href={`/history/${authUser.uid}`}
              >
                <Button variant="secondary">view all</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
