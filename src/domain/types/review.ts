import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "firebase/firestore";

export type Review = {
  id: string;
  bookerId: string;
  performerId: string;
  bookingId: string;
  timestamp: Date;
  overallRating: number;
  overallReview: string;
  type: "performer" | "booker";
};

export const reviewConverter = {
  toFirestore(review: Review): DocumentData {
    return {
      ...review,
      timestamp: Timestamp.fromDate(review.timestamp),
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Review {
    const data = snapshot.data(options);
    return {
      id: data.id,
      bookerId: data.bookerId,
      performerId: data.performerId,
      bookingId: data.bookingId,
      timestamp: data.timestamp.toDate(),
      overallRating: data.overallRating,
      overallReview: data.overallReview,
      type: data.type,
    };
  },
};
