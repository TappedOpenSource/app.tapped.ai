import { getOpportunityById } from '@/data/database';
import { Opportunity } from '@/domain/models/opportunity';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const opportunityId = router.query.opportunityId;
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    const getOpportunity = async () => {
      if (!opportunityId || typeof opportunityId !== 'string') {
        return;
      }

      const opportunity = await getOpportunityById(opportunityId);
      opportunity.match({
        some: (opportunity) => setOpportunity(opportunity),
        none: () => setOpportunity(null),
      });
    };
    getOpportunity();
  }, [opportunityId]);

  if (!opportunity) {
    return (
      <>
        <p>loading...</p>
      </>
    );
  }

  return (
    <>
      <p>{opportunity.title}</p>
    </>
  );
}
