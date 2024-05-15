import RequestToPerformForm from "@/components/request_to_perform/RequestToPerformForm";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const venueId = searchParams["venueId"];

  if (!venueId) {
    return <div>Invalid venue ID</div>;
  }

  return (
    <>
      <RequestToPerformForm venueId={venueId} />
    </>
  );
}
