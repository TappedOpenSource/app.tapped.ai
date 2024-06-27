import { googlePlacesApiKey } from "@/data/places";
import { Card } from "../ui/card";

export default function EmbededMap({ lat, lng }: {
    lat: number;
    lng: number;
}) {
  const query = `https://www.google.com/maps/embed/v1/place?key=${googlePlacesApiKey}&q=${lat},${lng}`;

  console.log({ query });
  return (
    <>
      <Card className="flex justify-center">
        <iframe
          title="map"
          width="300"
          height="160"
          style={{ border: 0 }}
          frameBorder={0}
          referrerPolicy="no-referrer-when-downgrade"
          src={query}>
        </iframe>
      </Card>
    </>
  );
}
