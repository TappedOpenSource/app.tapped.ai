"use client";

import BookingHistoryPreview from "@/components/profile/BookingHistoryPreview";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ReviewTile from "@/components/profile/ReviewTile";
import {
  getBookingsByRequestee,
  getBookingsByRequester,
  getLatestPerformerReviewByPerformerId,
  getUserByUsername,
} from "@/data/database";
import type { Booking } from "@/domain/types/booking";
import type { Review } from "@/domain/types/review";
import {
  type UserModel,
} from "@/domain/types/user_model";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileView({ username }: { username: string }) {
  const router = useRouter();
  const [user, setUser] = useState<UserModel | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [latestReview, setLatestReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof username !== "string") {
        return;
      }

      // get user by username
      const user = await getUserByUsername(username);
      if (user === undefined || user === null) {
        router.push("/404");
        return;
      }

      setUser(user);
    };
    fetchUser();
  }, [router, username]);

  useEffect(() => {
    const fetchBooking = async () => {
      if (user === null) {
        return;
      }

      // fetch latest booking
      const latestRequesteeBookings = await getBookingsByRequestee(user.id);
      const latestRequesterBookings = await getBookingsByRequester(user.id);
      const latestBookings = latestRequesteeBookings.concat(latestRequesterBookings).sort((a, b) => {
        return b.startTime.getTime() - a.startTime.getTime();
      });

      setBookings(latestBookings);
    };
    fetchBooking();

    const fetchLatestReview = async () => {
      if (user === null) {
        return;
      }

      // get latest review
      const latestPerformerReview = await getLatestPerformerReviewByPerformerId(user.id);
      const latestBookerReview = await getLatestPerformerReviewByPerformerId(user.id);

      const latestReview = latestPerformerReview ?? latestBookerReview ?? null;
      setLatestReview(latestReview);
    };
    fetchLatestReview();
  }, [user]);

  if (user === null) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center">
          <p>fetching {username}... </p>
        </div>
      </>
    );
  }

  if (user === null) {
    return (
      <>
        <div className='min-h-screen flex justify-center items-center'>
          <p>fetching {username}... </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='lg:flex lg:justify-center'>
        <div className="lg:w-[30vw] lg:px-6">
          <ProfileHeader user={user} />
        </div>
        <BuildRows user={user} bookings={bookings} latestReview={latestReview} />
      </div>
    </>
  );
}

function BuildRows({ user, bookings, latestReview }: {
  user: UserModel;
  bookings: Booking[];
  latestReview: Review | null;
}) {
  return (
    <div className='lg:w-[70vw] py-6 lg:py-12 px-3'>
      <div className='h-4' />
      {bookings.length !== 0 && (
        <div>
          <div className='flex flex-row items-center'>
            <h2 className='text-2xl font-bold'>Booking History</h2>
            <div className='w-2' />
            <Link
              href={`/history/${user.id}`}
              className='text-sm text-blue-500'
            >
        see all
            </Link>
          </div>
          <div className="h-2" />
          <BookingHistoryPreview user={user} bookings={bookings} />
        </div>
      )}
      <div className='h-8' />
      {latestReview && (
        <div>
          <div className='flex flex-row items-center'>
            <h2 className='text-2xl font-bold'>Reviews</h2>
            <div className='w-2' />
            <Link
              href={`/reviews/${user.id}`}
              className='text-sm text-blue-500'
            >
        see all
            </Link>
          </div>
          <div className="h-2" />
          <ReviewTile review={latestReview} />
        </div>
      )}
      {user.bio !== "" && (
        <>
          <div className='h-8' />
          <div>
            <h2 className='text-2xl font-bold'>about</h2>
            <div className="h-2" />
            <p>{user.bio}</p>
          </div>
        </>
      )}
    </div>
  );
}
