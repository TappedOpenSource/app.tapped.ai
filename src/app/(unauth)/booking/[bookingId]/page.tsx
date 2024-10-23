import BookingView from "@/components/booking/BookingView";

export default function Page({
  params,
}: {
  params: { bookingId: string };
}) {
  const { bookingId } = params;
  return <BookingView bookingId={bookingId} />;
}
