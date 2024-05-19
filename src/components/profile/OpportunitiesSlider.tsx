import { Opportunity } from "@/domain/types/opportunity";
import OpportunityTile from "./OpportunityTile";

export default function OpportunitiesSlider({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  if (opportunities.length === 0) {
    return (
      <>
        <p>no upcoming performance opportunities</p>
      </>
    );
  }

  return (
    <>
      <div className="flex snap-x flex-row items-center justify-start space-x-5 overflow-x-auto">
        {opportunities.map((opportunity, index) => {
          return (
            <div key={index}>
              <div className="snap-center">
                <OpportunityTile opportunity={opportunity} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
