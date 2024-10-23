import { getUserById } from "@/data/database";
import { Review } from "@/domain/types/review";
import { UserModel } from "@/domain/types/user_model";
import { useEffect, useState } from "react";
import UserTile from "../UserTile";

export default function ReviewTile({ review }: { review: Review }) {
  const [reviewer, setReviewer] = useState<UserModel | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (review === null) {
        return;
      }

      const reviewerId = review.type === "booker" ? review.performerId : review.bookerId;

      const reviewer = await getUserById(reviewerId);
      setReviewer(reviewer ?? null);
    };
    fetchUsers();
  }, [review]);

  return (
    <>
      <div className="bg-card rounded-xl p-4">
        <UserTile user={reviewer} />
        <div className="h-2" />
        <p>{review.overallReview}</p>
      </div>
    </>
  );
}
