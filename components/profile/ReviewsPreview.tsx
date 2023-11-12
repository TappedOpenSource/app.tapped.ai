
import { getLatestPerformerReviewByPerformerId, getUserById } from '@/data/database';
import { PerformerReview } from '@/domain/models/review';
import { UserModel } from '@/domain/models/user_model';
import { useEffect, useState } from 'react';
import UserTile from '../UserTile';

export default function ReviewsPreview({ user }: {
    user: UserModel;
}) {
  const [latestReview, setLatestReview] = useState<PerformerReview | null>(null);
  const [reviewer, setReviewer] = useState<UserModel | null>(null);
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

  useEffect(() => {
    const fetchReviewer = async () => {
      if (latestReview === null) {
        return;
      }

      const reviewer = await getUserById(latestReview.bookerId);
      reviewer.match({
        some: (reviewer) => {
          setReviewer(reviewer);
        },
        none: () => {
          console.log('reviewer not found');
        },
      });
    };
    fetchReviewer();
  }, [latestReview]);

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
      <div className='rounded-xl p-4 bg-gray-900'>
        <UserTile user={reviewer} />
        <div className='h-2' />
        <p>{latestReview.overallReview}</p>
      </div>
    </>
  );
}
