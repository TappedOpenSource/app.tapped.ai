import LocationView from "@/components/location/LocationView";
import { PlaceData } from "@/domain/types/place_data";
import { Metadata } from "next";

type Props = {
  params: { place_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getPlaceByIdUrl = `${process.env.NEXT_PUBLIC_API_URL}/fetchPlaceById`;

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const metadataBase = "https://app.tapped.ai";
  try {
    const id = params.place_id;

    const res = await fetch(`${getPlaceByIdUrl}?placeId=${id}`);
    const place = (await res.json()) as PlaceData;

    const name = place.shortFormattedAddress;
    const title = `live music stats for ${name} | tapped ai`;
    return {
      metadataBase: new URL(metadataBase),
      title,
      description: `${name} on tapped ai | create a world tour from your iPhone`,
      openGraph: {
        type: "website",
        url: `${metadataBase}/location/${id}`,
        title,
        description: `${name} on tapped ai`,
        siteName: "tapped ai",
        images: [{ url: `${metadataBase}/map-og.png` }],
      },
      twitter: {
        card: "summary_large_image",
        site: "@tappedai",
        title,
        description: `${name} on tapped ai | create a world tour from your iPhone`,
        images: `${metadataBase}/map-og.png`,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      metadataBase: new URL(metadataBase),
      title: "tapped ai",
      description: "tapped ai",
      openGraph: {
        type: "website",
        url: metadataBase,
        title: "tapped ai",
        description: "tapped ai | create a world your from your iPhone",
        siteName: "tapped ai",
        images: [{ url: `${metadataBase}/og.png` }],
      },
      twitter: {
        card: "summary_large_image",
        site: "@tappedai",
        title: "tapped ai",
        description: "tapped ai | create a world your from your iPhone",
        images: `${metadataBase}/og.png`,
      },
    };
  }
}


export default async function Page({ params }: Props) {
  const placeId = params.place_id;

  if (!placeId) {
    return (
      <div>
        <h1>Location not found</h1>
      </div>
    );
  }

  return (
    <>
      <LocationView placeId={placeId} />
    </>
  );
}
