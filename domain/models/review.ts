import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

export type PerformerReview = {
    id: string;
    bookerId: string;
    performerId: string;
    bookingId: string;
    timestamp: Date;
    overallRating: number;
    overallReview: string;
    type: 'performer';
};

export const reviewConverter = {
  toFirestore(review: PerformerReview): DocumentData {
    return {
      ...review,
      timestamp: Timestamp.fromDate(review.timestamp),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): PerformerReview {
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
