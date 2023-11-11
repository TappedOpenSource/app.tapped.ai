import { getLatestBookingByRequestee } from '@/data/database';
import { Booking } from '@/domain/models/booking';
import { useEffect, useState } from 'react';

export default function BookingHistoryPreview({ userId }: { userId: string }) {
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooking = async () => {
    // fetch latest booking
      const latestBooking = await getLatestBookingByRequestee(userId);
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
  }, [userId]);

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
      <div className='flex flex-row'>
        <div className='flex justify-center items-center'>
            icon
        </div>
        <div className='w-3' />
        <div>
          <div className='flex flex-row'>
            <p className='font-bold'>Performer</p>
            <div className='w-3' />
            <p className='font-thin text-gray-300'>{latestBooking.timestamp.toDateString()}</p>
          </div>
          <p className='break-all'>
            {latestBooking.requesterId}
          booked
            {latestBooking.requesteeId}
          for service {latestBooking.serviceId.toString()}
          </p>
        </div>
      </div>
    </>
  );
}
