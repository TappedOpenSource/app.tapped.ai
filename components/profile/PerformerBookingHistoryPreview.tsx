import { getBookingsByRequestee } from '@/data/database';
import { Booking } from '@/domain/models/booking';
import { UserModel } from '@/domain/models/user_model';
import { useEffect, useState } from 'react';
import BookingCard from './BookingCard';

export default function PerformerBookingHistoryPreview({ user }: { user: UserModel }) {
  const [latestBookings, setLatestBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooking = async () => {
    // fetch latest booking
      const latestBookings = await getBookingsByRequestee(user.id);
      setLatestBookings(latestBookings);
    };
    fetchBooking().then(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <p>fetching latest booking...</p>
    );
  }

  if (latestBookings.length === 0) {
    return (
      <p>no booking history</p>
    );
  }

  return (
    <>
      <div className='flex justify-start items-center'>
        <div className="flex flex-row items-center just-fy-center overflow-x-auto space-x-5 snap-x">
          {latestBookings.map((booking, index) => (
            <div key={index}>
              <div
                className='snap-center'
              >
                <BookingCard booking={booking} user={user} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
