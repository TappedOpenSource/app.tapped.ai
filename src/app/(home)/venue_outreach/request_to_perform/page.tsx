import RequestToPerformForm from "@/components/request_to_perform/RequestToPerformForm";
import UnauthHeader from "@/components/unauth_header";
export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const rawVenueIds = searchParams["venue_ids"];
  const venueIds = rawVenueIds ? rawVenueIds.split(",") : [];

  return (
    <>
      <UnauthHeader />
      <RequestToPerformForm venueIds={venueIds} />
    </>
  );
}
