
import type { Metadata, ResolvingMetadata } from "next/types";
import OpportunityView from "@/components/opportunity/OpportunityView";
import { Opportunity, opImage } from "@/domain/types/opportunity";

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

    const description = `${opportunity.title} on tapped | create a world tour from your iPhone`;
    return {
      metadataBase: new URL(metadataBase),
      title: opportunity.title,
      description,
      openGraph: {
        type: "website",
        url: `${metadataBase}/opportunity/${opportunityId}`,
        title: opportunity.title,
        description,
        siteName: "Tapped Ai",
        images: [{ url: imageSrc }],
      },
      twitter: {
        card: "summary_large_image",
        site: "@tappedai",
        title: opportunity.title,
        description,
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
      <OpportunityView opportunityId={opportunityId} />
    </>
  );
}
