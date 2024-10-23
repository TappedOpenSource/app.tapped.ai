import Link from "next/link";
import Image from "next/image";
import { Opportunity } from "@/domain/types/opportunity";

export default function OpportunityTile({
  opportunity,
}: {
  opportunity: Opportunity;
}) {
  const opImage = (() => {
    if (opportunity.flierUrl !== undefined && opportunity.flierUrl !== null && opportunity.flierUrl !== "") {
      return opportunity.flierUrl;
    }

    return "/images/performance_placeholder.png";
  })();

  return (
    <>
      <Link href={`/opportunity/${opportunity.id}`}>
        <div className="flex flex-col w-[320px] h-[350px] justify-between rounded-xl p-4 overflow-hidden hover:scale-105 transform transition-all duration-200 ease-in-out">
          <div className="relative w-[300px] h-[300px]">
            <Image src={opImage} alt="opportunity flier" fill className="rounded-xl" objectFit="cover" style={{}} />
          </div>
          <h1 className="text-xl font-bold">{opportunity.title}</h1>
          <div className="h-2" />
        </div>
      </Link>
    </>
  );
}
