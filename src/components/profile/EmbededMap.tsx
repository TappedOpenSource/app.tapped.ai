import { googlePlacesApiKey } from "@/data/places";
import { Card } from "../ui/card";

export default function EmbededMap({ lat, lng }: { lat: number; lng: number }) {
  const query = `https://www.google.com/maps/embed/v1/place?key=${googlePlacesApiKey}&q=${lat},${lng}`;
  return (
    <>
      <Card className="flex w-[300px] justify-center">
        <iframe
          title="map"
          width="300"
          height="160"
          style={{ border: 0, borderRadius: "0.5rem" }}
          frameBorder={0}
          referrerPolicy="no-referrer-when-downgrade"
          src={query}
        ></iframe>
      </Card>
    </>
  );
}
