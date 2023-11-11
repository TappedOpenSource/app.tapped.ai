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
    twitterHandle?: string;
    instagramHandle?: string;
    youtubeChannelId?: string;
    spotifyId?: string;
    occupations?: string[];
    label?: string;
    genres?: string[];
};

export const userModelConverter = {
  toFirestore(user: UserModel): DocumentData {
    return { ...user };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): UserModel {
    const data = snapshot.data(options);
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      artistName: data.artistName,
      bio: data.bio,
      profilePicture: data.profilePicture,
      overallRating: data.overallRating,
      placeId: data.placeId,
      tiktokHandle: data.tiktokHandle,
      twitterHandle: data.twitterHandle,
      instagramHandle: data.instagramHandle,
      youtubeChannelId: data.youtubeChannelId,
      occupations: data.occupations,
      label: data.label,
      genres: data.genres,
    };
  },
};
