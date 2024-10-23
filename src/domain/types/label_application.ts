import { DocumentSnapshot, Timestamp } from "firebase/firestore";

export type LabelApplication = {
  id: string;
  phone: string;
  name: string;
  location: string;
  artistLabel: boolean;
  description: string[];
  followingCount: string;
  instagramHandle: string;
  profession: string;
  timestamp: Date;
};

export const labelApplicationConverter = {
  toFirestore: (labelApplication: LabelApplication) => {
    return {
      ...labelApplication,
      timestamp: Timestamp.fromDate(labelApplication.timestamp),
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options) => {
    const data = snapshot.data(options);
    return {
      ...data,
      timestamp: data?.timestamp.toDate(),
    };
  },
};
