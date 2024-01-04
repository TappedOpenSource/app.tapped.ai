import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export type UserModel = {
    id: string;
    email: string;
    username: string;
    artistName: string;
    bio: string;
    profilePicture?: string;
    overallRating?: number;
    placeId?: string;
    tiktokHandle?: string;
    tiktokFollowers?: number;
    twitterHandle?: string;
    twitterFollowers?: number;
    instagramHandle?: string;
    instagramFollowers?: number;
    youtubeChannelId?: string;
    spotifyId?: string;
    occupations?: string[];
    label?: string;
    genres?: string[];
    reviewCount: number,
    followerCount: number,
    followingCount: number,
};

export const userModelConverter = {
  toFirestore(user: UserModel): DocumentData {
    return { ...user };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): UserModel {
    const data = snapshot.data(options) as UserModel;
    return {
      ...data,
    };
  },
};
