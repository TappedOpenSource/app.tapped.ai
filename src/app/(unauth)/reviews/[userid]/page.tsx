"use client";

import React, { useEffect, useState, use } from "react";
import { getReviewsByPerformerId } from "@/data/database";
import ReviewTile from "@/components/profile/ReviewTile";
import { Review } from "@/domain/types/review";

export default function Reviews(
  props: {
    params: Promise<{ userid: string }>;
  }
) {
  const params = use(props.params);
  const userId = params.userid;

  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (typeof userId !== "string") {
        return;
      }

      // get reviews
      const reviews = await getReviewsByPerformerId(userId);
      // set reviews
      setReviews(reviews);
      setLoading(false);
    };
    fetchReviews();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>fetching reviews... </p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>no reviews</p>
      </div>
    );
  }

  return (
    <>
      <div className="md:flex md:justify-center">
        <div className="py-4 px-6 md:w-1/2">
          <h1 className="text-4xl font-extrabold">reviews</h1>
          <div className="h-4" />
          {reviews.map((review, index) => (
            <div key={index} className="py-4">
              <ReviewTile review={review} />
            </div>
          ))}
          <div className="h-4" />
          <div className="flex justify-center items-center">
            <p className="text-xs font-thin text-gray-500">end of list</p>
          </div>
        </div>
      </div>
    </>
  );
}
