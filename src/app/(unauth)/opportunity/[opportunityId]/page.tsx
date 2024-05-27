
import type { Metadata, ResolvingMetadata } from "next/types";
import OpportunityView from "@/components/OpportunityView";
import { Opportunity, opImage } from "@/domain/types/opportunity";
import MapHeader from "@/components/map_header";
import Footer from "@/components/Footer";

type Props = {
  params: { opportunityId: string }
};

const getOpportunityByIdUrl = `${process.env.NEXT_PUBLIC_API_URL}/getOpportunityById`;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const metadataBase = "https://app.tapped.ai";
  try {
    const { opportunityId } = params;

    const res = await fetch(`${getOpportunityByIdUrl}?id=${opportunityId}`);
    const opportunity = await res.json() as Opportunity;

    const imageSrc = opImage(opportunity);

    return {
      metadataBase: new URL(metadataBase),
      title: opportunity.title,
      description: `${opportunity.title} on tapped`,
      openGraph: {
        type: "website",
        url: `${metadataBase}/opportunity/${opportunityId}`,
        title: opportunity.title,
        description: `${opportunity.title} on tapped`,
        siteName: "Tapped Ai",
        images: [{ url: imageSrc }],
      },
      twitter: {
        card: "summary_large_image",
        site: "@tappedai",
        title: opportunity.title,
        description: `${opportunity.title} on tapped`,
        images: imageSrc,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      title: "Tapped Ai",
      description: "apply to perform for FREE",
    };
  }
}


export default function Page({ params }: Props) {
  const { opportunityId } = params;
  return (
    <>
      <MapHeader />
      <OpportunityView opportunityId={opportunityId} />
      <Footer />
    </>
  );
}
