
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';


export type Opportunity = {
    id: string;
    userId: string;
    title: string;
    description: string;
    placeId: string;
    geohash: string;
    lat: number;
    lng: number;
    timestamp: Date;
    startTime: Date;
    endTime: Date;
    isPaid: boolean;
};

export const opportunityConverter = {
  toFirestore(opportunity: Opportunity): DocumentData {
    return {
      ...opportunity,
      timestamp: Timestamp.fromDate(opportunity.timestamp),
      startTime: Timestamp.fromDate(opportunity.startTime),
      endTime: Timestamp.fromDate(opportunity.endTime),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Opportunity {
    const data = snapshot.data(options);
    return {
      id: data.id,
      userId: data.userId,
      title: data.title,
      description: data.description,
      placeId: data.placeId,
      geohash: data.geohash,
      lat: data.lat,
      lng: data.lng,
      timestamp: data.timestamp.toDate(),
      startTime: data.startTime.toDate(),
      endTime: data.endTime.toDate(),
      isPaid: data.isPaid,
    };
  },
};
