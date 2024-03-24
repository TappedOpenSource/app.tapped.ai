import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';

type Option<T> = T | null | undefined;

export type Location = {
  placeId: string;
  geohash: string;
  lat: number;
  lng: number;
};

export type SocialFollowing = {
  youtubeChannelId?: Option<string>;
  tiktokHandle?: Option<string>;
  tiktokFollowers: number;
  instagramHandle?: Option<string>;
  instagramFollowers: number;
  twitterHandle?: Option<string>;
  twitterFollowers: number;
}

export type BookerInfo = {
  rating?: Option<number>;
  reviewCount: number;
}

export type PerformerInfo = {
  pressKitUrl?: Option<string>;
  genres: string[];
  rating?: Option<number>;
  reviewCount: number;
  label: string;
  spotifyId?: Option<string>;
}

export type VenueInfo = {
  capacity?: Option<number>;
  idealArtistProfile?: Option<string>;
  productionInfo?: Option<string>;
  frontOfHouse?: Option<string>;
  monitors?: Option<string>;
  microphones?: Option<string>;
  lights?: Option<string>;
}

export type EmailNotifications = {
  appReleases: boolean;
  tappedUpdates: boolean;
  bookingRequests: boolean;
}

export type PushNotifications = {
  appReleases: boolean;
  tappedUpdates: boolean;
  bookingRequests: boolean;
  directMessages: boolean;
}

export type UserModel = {
  id: string;
  email: string;
  timestamp: Timestamp;
  username: string;
  artistName: string;
  bio: string;
  occupations: string[];
  profilePicture?: Option<string>;
  location?: Option<Location>;
  badgesCount: number;
  performerInfo?: Option<PerformerInfo>;
  venueInfo?: Option<VenueInfo>;
  bookerInfo?: Option<BookerInfo>;
  emailNotifications: EmailNotifications;
  pushNotifications: PushNotifications;
  deleted: boolean;
  socialFollowing: SocialFollowing;
  stripeConnectedAccountId?: Option<string>;
  stripeCustomerId?: Option<string>;
}


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

export const reviewCount = (user: UserModel) => (user.bookerInfo?.reviewCount ?? 0) +
    (user.performerInfo?.reviewCount ?? 0);

export const audienceSize = (user: UserModel) => (user.socialFollowing?.twitterFollowers ?? 0) +
    (user.socialFollowing?.instagramFollowers ?? 0) +
    (user.socialFollowing?.tiktokFollowers ?? 0);


export const profileImage = (user: UserModel) => {
  if (
    user.profilePicture === undefined ||
      user.profilePicture === null ||
      user.profilePicture === '') {
    return '/images/default_avatar.png';
  }

  return user.profilePicture;
};
