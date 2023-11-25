import { getLatestBookingByRequester } from '@/data/database';
import { Booking } from '@/domain/models/booking';
import { UserModel } from '@/domain/models/user_model';
import BookingTile from './BookingTile';
import { useEffect, useState } from 'react';

export default function BookererBookingHistoryPreview({ user }: { user: UserModel }) {
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooking = async () => {
    // fetch latest booking
      const latestBooking = await getLatestBookingByRequester(user.id);
      latestBooking.match({
        some: (booking) => {
          setLatestBooking(booking);
        },
        none: () => {
          console.log('booking not found');
        },
      });
    };
    fetchBooking().then(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <p>fetching latest booking...</p>
    );
  }

  if (latestBooking === null) {
    return (
      <p>no booking history</p>
    );
  }

  return (
    <>
      <BookingTile booking={latestBooking} user={user} />
    </>
  );
}
