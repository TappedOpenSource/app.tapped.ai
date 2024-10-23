import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Plus, Rocket } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useStepper } from "@/components/ui/stepper";
import { useState, useEffect } from "react";
import type { Booking } from "@/domain/types/booking";
import { getBookingsByRequestee } from "@/data/database";
import BookingTile from "@/components/profile/BookingTile";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import AddBooking from "@/components/opportunity/form/AddBooking";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export default function BookingHistoryStep() {
  const {
    state: { authUser },
  } = useAuth();
  const { nextStep, prevStep, isDisabledStep, isLastStep } = useStepper();
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
              <b>it is 86% more likely for you to get booked if you have a booking history</b>, small or large. This can
              be a house show, rooftop event, opening for another performer, literally anything.{" "}
              <b>DO NOT LEAVE IT EMPTY</b> or you’re basically guaranteeing that you won’t get a response.
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
              <Link referrerPolicy="no-referrer" target="_blank" href={`/history/${authUser.uid}`}>
                <Button variant="secondary">view all</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-2">
        <Button disabled={isDisabledStep} onClick={prevStep} size="sm" variant="secondary">
          prev
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm">{isLastStep ? "finish" : "next"}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                your booking history is the most important part of your profile. it is what bookers primarily use to
                decide talent and you&apos;re 86% more likely to get booked with at least one booking
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>cancel</AlertDialogCancel>
              <AlertDialogAction onClick={nextStep}>continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
