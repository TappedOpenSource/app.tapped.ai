
import { getLatestPerformerReviewByPerformerId } from '@/data/database';
import { PerformerReview } from '@/domain/models/review';
import { UserModel } from '@/domain/models/user_model';
import { useEffect, useState } from 'react';
import ReviewTile from './ReviewTile';

export default function ReviewsPreview({ user }: {
    user: UserModel;
}) {
  const [latestReview, setLatestReview] = useState<PerformerReview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLatestReview = async () => {
      // get latest review
      const latestReview = await getLatestPerformerReviewByPerformerId(user.id);
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
  }, [user]);

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
      <ReviewTile review={latestReview} />
    </>
  );
}
