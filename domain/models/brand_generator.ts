import { DocumentSnapshot, Timestamp } from 'firebase/firestore';
import { AvatarStyle } from './avatar';

export type BrandGenerator = {
    id: string;
    userId: string;
    name: string;
    quota: number;
    updatedAt: Date;
    createdAt: Date;

    // Generator Input
    artistName: string;
    referenceImages: string[];
    genres: string[];
    socialFollowing: number;
    sellingPoint: string;
    theme: string;
    planLength: string;
    postFreq: string;
    avatarStyle: AvatarStyle;

    sdModelId: string;
    sdModelStatus: 'initial'
      | 'training'
      | 'ready'
      | 'inferring'
      | 'errored';
};

export const generatorConverter = {
  toFirestore: (generator: BrandGenerator) => {
    return {
      ...generator,
      updatedAt: Timestamp.fromDate(generator.updatedAt),
      createdAt: Timestamp.fromDate(generator.createdAt),
      // Convert AI Models to something for firestore
      // Convert Images to something for firestore
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options) => {
    const data = snapshot.data(options);
    return {
      ...data,
      updatedAt: data.updatedAt.toDate(),
      createdAt: data.createdAt.toDate(),
    };
  },
};
