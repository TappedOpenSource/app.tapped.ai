import { DocumentSnapshot, Timestamp } from 'firebase/firestore';
import { LlmModel, SdModel } from './ai_model';

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
    socialFollowing: string;
    sellingPoint: string;
    theme: string;
    planLength: string;
    postFreq: string;

    llmModel: LlmModel;
    sdModel: SdModel;
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
      // Convert AI Models to something from firestore
      // Convert Images to something from firestore
    };
  },
};
