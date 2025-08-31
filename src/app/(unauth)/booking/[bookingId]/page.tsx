import BookingView from "@/components/booking/BookingView";

export default async function Page(
  props: {
    params: Promise<{ bookingId: string }>;
  }
) {
  const params = await props.params;
  const { bookingId } = params;
  return <BookingView bookingId={bookingId} />;
}
