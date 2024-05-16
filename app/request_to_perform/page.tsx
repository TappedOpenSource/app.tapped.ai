
import MapHeader from "@/components/map_header";
import RequestToPerformForm from "@/components/request_to_perform/RequestToPerformForm";
import { Button } from "@/components/ui/button";

export default function Page({ searchParams }: {
  searchParams: { [key: string]: string };
}) {
  const rawVenueIds = searchParams["venue_ids"];
  const venueIds = rawVenueIds ? rawVenueIds.split(",") : [];

  return (
    <>
      <MapHeader />
      <RequestToPerformForm venueIds={venueIds} />
    </>
  );
}
