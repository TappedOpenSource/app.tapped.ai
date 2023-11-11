
import { getLatestPerformerReviewByPerformerId } from '@/data/database';
import { PerformerReview } from '@/domain/models/review';
import { useEffect, useState } from 'react';

export default function ReviewsPreview({ userId }: {
    userId: string;
}) {
  const [latestReview, setLatestReview] = useState<PerformerReview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLatestReview = async () => {
      // get latest review
      const latestReview = await getLatestPerformerReviewByPerformerId(userId);
      latestReview.match({
        some: (review) => {
          setLatestReview(review);
        },
        none: () => {
          console.log('no reviews found');
        },
      });

      setLoading(false);
    };
    fetchLatestReview();
  }, [userId]);

  if (loading) {
    return (
      <p>loading...</p>
    );
  }

  if (latestReview === null) {
    return (
      <p>no reviews</p>
    );
  }

  return (
    <>
      <p>{latestReview.bookerId}</p>
    </>
  );
}
