import { DocumentSnapshot, Timestamp } from 'firebase/firestore';
import { AvatarStyle } from './avatar';

export type BrandGenerator = {
    id: string;
    userId: string;
    quota: number;
    updatedAt: Date;
    createdAt: Date;

    // Generator Input
    artistDescription: string[];
    artistName: string;
    artistProfession: string;
    gender: string;
    modelName: string;
    postFreq: string;
    refImages: string[];
    sellingPoint: string;
    socialFollowing: number;
    theme: string;
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
