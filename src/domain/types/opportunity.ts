import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "firebase/firestore";

export type Opportunity = {
  id: string;
  userId: string;
  title: string;
  description: string;
  flierUrl?: string;
  location: {
    placeId: string;
    lat: number;
    lng: number;
  };
  timestamp: Date;
  startTime: Date;
  endTime: Date;
  deadline?: Date;
  isPaid: boolean;
  genres?: string[];
  venueId?: string | null;
  referenceEventId?: string | null;
};

export const opportunityConverter = {
  toFirestore(opportunity: Opportunity): DocumentData {
    return {
      ...opportunity,
      timestamp: Timestamp.fromDate(opportunity.timestamp),
      startTime: Timestamp.fromDate(opportunity.startTime),
      endTime: Timestamp.fromDate(opportunity.endTime),
      deadline: opportunity.deadline ? Timestamp.fromDate(opportunity.deadline) : null,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Opportunity {
    const data = snapshot.data(options) as Opportunity & {
      timestamp: Timestamp;
      startTime: Timestamp;
      endTime: Timestamp;
      deadline?: Timestamp;
    };
    return {
      ...data,
      timestamp: data.timestamp.toDate(),
      startTime: data.startTime.toDate(),
      endTime: data.endTime.toDate(),
      deadline: data.deadline?.toDate(),
    };
  },
};

export const opImage = (opportunity: Opportunity) => {
  if (opportunity.flierUrl !== undefined && opportunity.flierUrl !== null && opportunity.flierUrl !== "") {
    return opportunity.flierUrl;
  }

  return "/images/performance_placeholder.png";
};
