"use client";

import { useAuth } from "@/context/auth";
import { getBookingsByRequestee } from "@/data/database";
import { userAudienceSize } from "@/domain/types/user_model";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import AddBooking from "../opportunity/form/AddBooking";
import { useToast } from "../ui/use-toast";

const Task = ({ text, cta }: { text: string; cta?: string }) => {
  if (!cta) {
    return (
      <div className="group flex items-center gap-2 rounded-xl border border-blue-800 bg-blue-800/30 p-3">
        <div className="h-4 w-4 bg-gray-300 rounded-full group-hover:bg-blue-800" />
        <p>{text}</p>
        <ArrowUpRight className="hidden group-hover:block ease-in duration-300" />
      </div>
    );
  }

  return (
    <Link href={cta}>
      <div className="group flex items-center gap-2 rounded-xl border border-blue-800 bg-blue-800/30 hover:bg-blue-800/40 p-3 my-3">
        <div className="h-4 w-4 bg-gray-300 rounded-full group-hover:bg-blue-800" />
        <p>{text}</p>
        <ArrowUpRight className="hidden group-hover:block ease-in duration-300" />
      </div>
    </Link>
  );
};

export default function TasksSection() {
  const [hasBookings, setHasBookings] = useState(true);
  const {
    state: { currentUser },
  } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const fetchBookings = async () => {
      const bookings = await getBookingsByRequestee(currentUser.id, { limit: 1 });
      if (bookings.length === 0) {
        return setHasBookings(false);
      }

      setHasBookings(true);
    };
    fetchBookings();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <>
        <Task text="sign up" cta="/signup" />
      </>
    );
  }

  const needsPfp = !currentUser.profilePicture;
  const needsSocials = userAudienceSize(currentUser) === 0;

  if (!needsPfp && !needsSocials && hasBookings) {
    return null;
  }

  return (
    <div>
      <h1 className="font-bold text-gray-500">tasks</h1>
      {needsPfp && <Task text="add a profile picture" cta="/settings" />}
      {needsSocials && <Task text="add social media links" cta="/settings" />}
      {!hasBookings && (
        <Dialog>
          <DialogTrigger className="w-full">
            <Task text="add your booking history" />
          </DialogTrigger>
          <DialogContent>
            <AddBooking
              onSubmit={(booking) => {
                toast({
                  title: `booking added [${booking.name}]`,
                  description:
                    "your booking has been added, don't be afraid to refresh the page if it isn't showing up",
                });
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
