
import { Button } from "@/components/ui/button";

export default function Page({ searchParams }: {
  searchParams: { [key: string]: string };
}) {
  const rawVenueIds = searchParams["venue_ids"];
  const venueIds = rawVenueIds ? rawVenueIds.split(",") : [];

  console.log({ venueIds });

  return (
    <>
      <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
        <p>
            coming to desktop soon
        </p>
        <Button>
            get the app
        </Button>
      </div>
    </>
  );
}
