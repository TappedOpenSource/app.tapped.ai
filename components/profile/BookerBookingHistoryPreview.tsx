import { Booking } from '@/domain/types/booking';
import { UserModel } from '@/domain/types/user_model';
import BookingCard from './BookingCard';

export default function BookererBookingHistoryPreview({ user, bookings }: {
  user: UserModel;
  bookings: Booking[];
}) {
  if (bookings.length === 0) {
    return (
      <p>no booking history</p>
    );
  }

  return (
    <>
      <div className='flex justify-start items-center'>
        <div className="flex flex-row items-center just-fy-center overflow-x-auto space-x-5 snap-x">
          {bookings.map((booking, index) => (
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
