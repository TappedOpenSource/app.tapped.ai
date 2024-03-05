'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getBookingById, getUserById } from '@/data/database';
import { Booking } from '@/domain/models/booking';
import UserTile from '../UserTile';
import { UserModel } from '@/domain/models/user_model';
import Nav from '../landing/Nav';

export default function BookingView({ bookingId }: {
    bookingId: string;
}) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [booker, setBooker] = useState<UserModel | null>(null);
  const [performer, setPerformer] = useState<UserModel | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      const booking = await getBookingById(bookingId);
      booking.match({
        some: (b) => setBooking(b),
        none: () => setBooking(null),
      });
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
        user.match({
          some: (u) => setBooker(u),
          none: () => setBooker(null),
        });
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
        user.match({
          some: (u) => setPerformer(u),
          none: () => setPerformer(null),
        });
      };
      fetchPerformer();
    }
  }, [booking]);

  if (booking === null) {
    return (
      <>
        <div className='min-h-screen flex justify-center items-center'>
          <p>fetching booking... </p>
        </div>
      </>
    );
  }

  const duration = formatDuration(booking.startTime, booking.endTime);

  const flier = booking.flierUrl.match({
    some: (url) => (
      <div className='relative h-[60vh] w-[95vw] rounded-xl'>
        <Image
          src={url}
          alt='flier'
          fill
          objectFit='cover'
          className='rounded-xl'
        />
      </div>
    ),
    none: () => null,
  });

  const bookerStuff = booker === null ?
    null :
    (
      <>
        <h3 className='font-extrabold text-xl'>Booker</h3>
        <UserTile user={booker} />
      </>
    );

  const performerStuff = performer === null ?
    null :
    (
      <>
        <h3 className='font-extrabold text-xl'>Performer</h3>
        <UserTile user={performer} />
      </>
    );

  return (
    <>
      <Nav />
      <div className='flex justify-center'>
        <div className='px-6 pb-12 w-auto md:w-1/2'>
          {flier}
          <h1 className='font-extrabold text-4xl'>{booking.name}</h1>
          <div className='h-8' />
          {bookerStuff}
          <div className='h-6' />
          {performerStuff}
          <div className='h-6' />
          <h3 className='font-extrabold text-xl'>Date</h3>
          <p>Date: {booking.startTime.toDateString()}</p>
          <div className='h-6' />
          <h3 className='font-extrabold text-xl'>Duration</h3>
          <p>{duration}</p>
        </div>
      </div>
      <div className='h-42' />
    </>
  );
}

function formatDuration(startDate: Date, endDate: Date): string {
  // Get the difference in milliseconds between the two dates.
  const diff = endDate.getTime() - startDate.getTime();

  // Convert the difference to seconds.
  const seconds = diff / 1000;

  // Convert the seconds to minutes.
  const minutes = seconds / 60;

  // Convert the minutes to hours and minutes.
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);

  return `${hours} hours and ${remainingMinutes} minutes`;
}
