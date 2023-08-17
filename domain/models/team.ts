import { DocumentSnapshot, Timestamp } from 'firebase/firestore';
import { AvatarStyle } from './avatar';
import { Option, Some, None } from '@sniptt/monads';

export type Team = {
    id: string;
    userId: string;
    quota: number;
    updatedAt: Date;
    createdAt: Date;

    // Team Input

    // Team Name
    name: string;

    // form data
    artistDescription: string;
    artistName: string;
    artistProfession: string;
    gender: string;
    postFreq: string;
    refImages: string[];
    genres: string[];
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

export const teamConverter = {
  toFirestore: (team: Team) => {
    return {
      ...team,
      updatedAt: Timestamp.fromDate(team.updatedAt),
      createdAt: Timestamp.fromDate(team.createdAt),
      sdModelId: team.sdModelId.unwrapOr(null),
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
