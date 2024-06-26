import LocationView from "@/components/location/LocationView";

export default async function Page({ searchParams }: {
    searchParams: { [key: string]: string };
}) {
  const id = searchParams.id;

  if (!id) {
    return (
      <div>
        <h1>Location not found</h1>
      </div>
    );
  }

  return (
    <>
      <LocationView placeId={id} />
    </>
  );
}
