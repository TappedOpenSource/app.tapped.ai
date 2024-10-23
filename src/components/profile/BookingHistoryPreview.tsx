import { Booking } from "@/domain/types/booking";
import { UserModel } from "@/domain/types/user_model";
import BookingCard from "./BookingCard";
import { trackEvent } from "@/utils/tracking";

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
      <div className="flex justify-start items-center">
        <div className="flex flex-row items-start justify-start overflow-x-auto space-x-5">
          {bookings.map((booking, index) => (
            <div key={index}>
              <BookingCard booking={booking} user={user} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
