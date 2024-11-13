import type { Booking } from "@/domain/types/booking";
import type { UserModel } from "@/domain/types/user_model";
import BookingCard from "./BookingCard";

export default function BookingHistoryPreview({
  user,
  bookings,
}: {
  user: UserModel;
  bookings: Booking[];
}) {
  if (bookings.length === 0) {
    return <p>no booking history</p>;
  }

  return (
    <>
      <div className="relative w-full h-48">
        <div className="absolute inset-x-0 flex overflow-x-auto">
          <div className="flex gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="shrink-0">
                <BookingCard booking={booking} user={user} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
