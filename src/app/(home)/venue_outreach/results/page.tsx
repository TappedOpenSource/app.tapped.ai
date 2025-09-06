import UnauthHeader from "@/components/unauth_header";
import ResultsTable from "@/components/venue_search/results_table";

export default async function Page(
  props: {
    searchParams: Promise<{ [key: string]: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const capacity = searchParams["capacity"] ?? "500";
  const genres = searchParams["genres"] ?? "";
  const lat = searchParams["lat"] ?? "0";
  const lng = searchParams["lng"] ?? "0";
  const radius = searchParams["radius"] ?? "250";

  const performerGenres = genres.length > 0 ? genres.split(",") : [];
  const intCapacity = parseInt(capacity);
  const intLat = parseInt(lat);
  const intLng = parseInt(lng);
  const intRadius = parseInt(radius);

  return (
    <>
      <UnauthHeader />
      <ResultsTable genres={performerGenres} lat={intLat} lng={intLng} radius={intRadius} capacity={intCapacity} />
    </>
  );
}
