import { getFeaturedOpportunities } from '@/data/database';
import { Opportunity } from '@/domain/models/opportunity';
import { useEffect, useState } from 'react';
import OpportunityTile from '../profile/OpportunityTile';

export default function DefaultOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  useEffect(() => {
    const getOpportunities = async () => {
      const ops = await getFeaturedOpportunities();
      setOpportunities(ops);
    };
    getOpportunities();
  }, []);

  return (
    <div className='flex justify-center items-center'>
      <div className="flex flex-row overflow-x-auto space-x-5 snap-x">
        {opportunities.map((opportunity, index) => (
          <div key={index}>
            <div
              className='snap-center'
            >
              <OpportunityTile
                opportunity={opportunity}
              />
            </div>
          </div>
        ),)}
      </div>
    </div>
  );
}
