import RequestToPerformForm from "@/components/request_to_perform/RequestToPerformForm";
import UnauthHeader from "@/components/unauth_header";
export default async function Page(
  props: {
    searchParams: Promise<{ [key: string]: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const rawVenueIds = searchParams["venue_ids"];
  const venueIds = rawVenueIds ? rawVenueIds.split(",") : [];

  return (
    <>
      <UnauthHeader />
      <RequestToPerformForm venueIds={venueIds} />
    </>
  );
}
