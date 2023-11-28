import { Opportunity } from '@/domain/models/opportunity';
import { UserModel } from '@/domain/models/user_model';
import { useEffect, useState } from 'react';
import OpportunityTile from './OpportunityTile';
import { getUserOpportunities } from '@/data/database';

export default function OpportunitiesSlider({ user }: {
    user: UserModel;
}) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  useEffect(() => {
    const fetchOpportunities = async () => {
      const opportunities = await getUserOpportunities(user.id);
      setOpportunities(opportunities);
    };
    fetchOpportunities();
  }, [user.id]);

  if (opportunities.length === 0) {
    return (
      <>
        <p>no upcoming performance opportunities</p>
      </>
    );
  }

  return (
    <>
      {
        opportunities.map((opportunity, index) => {
          return (
            <div key={index}>
              <div
                className="flex overflow-x-auto space-x-5 snap-x"
              >
                <div
                  className='snap-center'
                >
                  <OpportunityTile
                    opportunity={opportunity}
                  />
                </div>
              </div>
            </div>
          );
        })
      }
    </>);
}
