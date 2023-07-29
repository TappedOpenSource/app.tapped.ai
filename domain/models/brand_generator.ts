import { DocumentSnapshot, Timestamp } from 'firebase/firestore';
import { AvatarStyle } from './avatar';
import { Option, Some, None } from '@sniptt/monads';

export type BrandGenerator = {
    id: string;
    userId: string;
    quota: number;
    updatedAt: Date;
    createdAt: Date;

    // Generator Input

    // generator name
    name: string;

    // form data
    artistDescription: string;
    artistName: string;
    artistProfession: string;
    gender: string;
    postFreq: string;
    refImages: string[];
    sellingPoint: string;
    socialFollowing: number;
    theme: string;
    avatarStyle: AvatarStyle;

    sdModelId: Option<string>;
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
      sdModelId: generator.sdModelId.unwrapOr(null),
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options) => {
    const data = snapshot.data(options);
    return {
      ...data,
      updatedAt: data.updatedAt.toDate(),
      createdAt: data.createdAt.toDate(),
      sdModelId: data.sdModelId ? Some(data.sdModelId) : None,
    };
  },
};
