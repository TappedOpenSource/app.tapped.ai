'use client';

import BookingTile from '@/components/profile/BookingTile';
import { getBookingsByRequestee, getUserById } from '@/data/database';
import { Booking } from '@/domain/models/booking';
import { UserModel } from '@/domain/models/user_model';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function History({
  params,
}: {
  params: { userid: string };
}) {
  const router = useRouter();
  const userId = params.userid;

  const [performer, setPerformer] = useState<UserModel | null>(null); // TODO: [performer, setPerformer
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (typeof userId !== 'string') {
        return;
      }

      const bookings = await getBookingsByRequestee(userId);
      setBookings(bookings);
      setLoading(false);
    };
    fetchBookings();
  }, [userId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof userId !== 'string') {
        return;
      }

      const user = await getUserById(userId);
      user.match({
        some: (user) => {
          setPerformer(user);
        },
        none: () => {
          console.log('user not found');
          router.push('/404');
        },
      });
      setLoading(false);
    };
    fetchUser();
  }, [userId, router]);

  if (loading || !performer) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p>fetching bookings... </p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p>no bookings</p>
      </div>
    );
  }

  return (
    <>
      <div className='md:flex md:justify-center'>
        <div className='py-4 px-6 md:w-1/2'>
          <h1 className="text-4xl font-extrabold">history</h1>
          <div className="h-4" />
          {bookings.map((booking, index) => (
            <div key={index} className='py-4'>
              <BookingTile booking={booking} user={performer} />
              <div className="h-4" />
            </div>
          ))}
          <div className="h-4" />
          <div className='flex justify-center items-center'>
            <p className='text-xs font-thin text-gray-500'>end of list</p>
          </div>
        </div>
      </div>
    </>
  );
}
