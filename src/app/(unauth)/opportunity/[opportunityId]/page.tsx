import type { Metadata, ResolvingMetadata } from "next/types";
import OpportunityView from "@/components/opportunity/OpportunityView";
import { Opportunity, opImage } from "@/domain/types/opportunity";
import Footer from "@/components/Footer";

type Props = {
  params: { opportunityId: string };
  searchParams: { [key: string]: string };
};

const getOpportunityByIdUrl = `${process.env.NEXT_PUBLIC_API_URL}/getOpportunityById`;

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const metadataBase = "https://app.tapped.ai";
  try {
    const { opportunityId } = params;

    const res = await fetch(`${getOpportunityByIdUrl}?id=${opportunityId}`);
    const opportunity = (await res.json()) as Opportunity;

    const imageSrc = opImage(opportunity);

    const title = `"${opportunity.title}" on tapped`;
    const description = `${opportunity.title} on tapped | create a world tour from your iPhone`;
    return {
      metadataBase: new URL(metadataBase),
      title,
      description,
      openGraph: {
        type: "website",
        url: `${metadataBase}/opportunity/${opportunityId}`,
        title,
        description,
        siteName: "Tapped Ai",
        images: [{ url: imageSrc }],
      },
      twitter: {
        card: "summary_large_image",
        site: "@tappedai",
        title,
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

export default function Page({ params, searchParams }: Props) {
  const { opportunityId } = params;
  const rawShowConfirmation = searchParams["show_confirmation"] ?? "false";
  const showConfirmation = rawShowConfirmation === "true";

  return (
    <>
      <OpportunityView opportunityId={opportunityId} showConfirmation={showConfirmation} />
      <Footer />
    </>
  );
}
