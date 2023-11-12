import { useState, useEffect } from 'react';
import UserTile from '../UserTile';
import { UserModel } from '@/domain/models/user_model';
import { PerformerReview } from '@/domain/models/review';
import { getUserById } from '@/data/database';

export default function ReviewTile({ review }: {
    review: PerformerReview;
}) {
  const [reviewer, setReviewer] = useState<UserModel | null>(null);
  useEffect(() => {
    const fetchReviewer = async () => {
      if (review === null) {
        return;
      }

      const reviewer = await getUserById(review.bookerId);
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
  }, [review]);

  return (
    <>
      <div className='rounded-xl p-4 bg-gray-900'>
        <UserTile user={reviewer} />
        <div className='h-2' />
        <p>{review.overallReview}</p>
      </div>
    </>
  );
}
