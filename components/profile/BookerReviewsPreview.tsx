
import { getLatestBookerReviewByBookerId } from "@/data/database";
import { Review } from "@/domain/types/review";
import { UserModel } from "@/domain/types/user_model";
import { useEffect, useState } from "react";
import ReviewTile from "./ReviewTile";
import { LoadingSpinner } from "../LoadingSpinner";

export default function BookererReviewsPreview({ user }: {
    user: UserModel;
}) {
  const [latestReview, setLatestReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLatestReview = async () => {
      // get latest review
      const latestReview = await getLatestBookerReviewByBookerId(user.id);
      setLatestReview(latestReview ?? null);
      setLoading(false);
    };
    fetchLatestReview();
  }, [user]);

  if (loading) {
    return (
      <>
        <LoadingSpinner />
        <p>loading... </p>
      </>
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
