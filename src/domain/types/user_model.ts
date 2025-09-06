import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";
import type { Option } from "./option";

export type Location = {
  lat: number;
  lng: number;
  placeId: string;
};

export type SocialFollowing = {
  youtubeChannelId?: Option<string>;
  tiktokHandle?: Option<string>;
  tiktokFollowers: number;
  instagramHandle?: Option<string>;
  instagramFollowers: number;
  twitterHandle?: Option<string>;
  twitterFollowers: number;
  facebookHandle?: Option<string>;
  facebookFollowers: number;
  spotifyUrl?: Option<string>;
  soundcloudHandle?: Option<string>;
  soundcloudFollowers: number;
  audiusHandle?: Option<string>;
  audiusFollowers: number;
  twitchHandle?: Option<string>;
  twitchFollowers: number;
};

export type BookerInfo = {
  rating?: Option<number>;
  reviewCount: number;
};

type PerformerCategory =
  | "undiscovered"
  | "emerging"
  | "hometownHero"
  | "mainstream"
  | "legendary";
export type PerformerInfo = {
  pressKitUrl?: Option<string>;
  genres: string[];
  rating?: Option<number>;
  reviewCount: number;
  label: string;
  spotifyId?: Option<string>;
  category: PerformerCategory;
};

export function suggestMaxCapacity(category: PerformerCategory): number {
  const mapping: Record<PerformerCategory, number> = {
    undiscovered: 300,
    emerging: 700,
    hometownHero: 1500,
    mainstream: 100000,
    legendary: 1000000,
  };

  return mapping[category];
}

export function suggestTicketPriceRange(
  category: PerformerCategory
): [number, number] {
  const mapping: Record<PerformerCategory, [number, number]> = {
    undiscovered: [0, 10],
    emerging: [10, 20],
    hometownHero: [20, 40],
    mainstream: [40, 75],
    legendary: [75, 100],
  };

  return mapping[category];
}

export function formattedName(category: PerformerCategory): string {
  const mapping: Record<PerformerCategory, string> = {
    undiscovered: "Undiscovered",
    emerging: "Emerging",
    hometownHero: "Hometown Hero",
    mainstream: "Mainstream",
    legendary: "Legendary",
  };

  return mapping[category];
}

export type VenueInfo = {
  genres?: string[];
  websiteUrl?: Option<string>;
  bookingEmail?: Option<string>;
  phoneNumber?: Option<string>;
  autoReply?: Option<string>;
  capacity?: Option<number>;
  idealPerformerProfile?: Option<string>;
  type?: Option<string>;
  productionInfo?: Option<string>;
  frontOfHouse?: Option<string>;
  monitors?: Option<string>;
  microphones?: Option<string>;
  lights?: Option<string>;
  topPerformerIds?: string[];
  bookingsByDayOfWeek?: number[];
};

export type EmailNotifications = {
  appReleases: boolean;
  tappedUpdates: boolean;
  bookingRequests: boolean;
};

export type PushNotifications = {
  appReleases: boolean;
  tappedUpdates: boolean;
  bookingRequests: boolean;
  directMessages: boolean;
};

export type UserModel = {
  id: string;
  email: string;
  unclaimed: boolean;
  timestamp: Timestamp;
  username: string;
  artistName: string;
  bio: string;
  occupations: string[];
  profilePicture: Option<string>;
  location: Option<Location>;
  performerInfo: Option<PerformerInfo>;
  venueInfo: Option<VenueInfo>;
  bookerInfo: Option<BookerInfo>;
  emailNotifications: EmailNotifications;
  pushNotifications: PushNotifications;
  deleted: boolean;
  socialFollowing: SocialFollowing;
  stripeConnectedAccountId: Option<string>;
  stripeCustomerId: Option<string>;
};

export const emptyUserModel: UserModel = {
  id: "",
  email: "",
  unclaimed: false,
  timestamp: Timestamp.now(),
  username: "",
  artistName: "",
  bio: "",
  occupations: [],
  profilePicture: null,
  location: null,
  performerInfo: null,
  venueInfo: null,
  bookerInfo: null,
  emailNotifications: {
    appReleases: true,
    tappedUpdates: true,
    bookingRequests: true,
  },
  pushNotifications: {
    appReleases: true,
    tappedUpdates: true,
    bookingRequests: true,
    directMessages: true,
  },
  deleted: false,
  socialFollowing: {
    tiktokFollowers: 0,
    instagramFollowers: 0,
    twitterFollowers: 0,
    facebookFollowers: 0,
    soundcloudFollowers: 0,
    audiusFollowers: 0,
    twitchFollowers: 0,
  },
  stripeConnectedAccountId: null,
  stripeCustomerId: null,
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

export const performerScore = (category: PerformerCategory): number => {
  const range = performerScoreRange(category);
  return Math.round((range[0] + range[0]) / 2);
};

export const performerScoreRange = (
  category: PerformerCategory
): [number, number] => {
  const mapping: {
    [key in PerformerCategory]: [number, number];
  } = {
    undiscovered: [0, 33],
    emerging: [33, 66],
    hometownHero: [66, 80],
    mainstream: [80, 95],
    legendary: [95, 100],
  };

  return mapping[category];
};

export const reviewCount = (user: UserModel): number =>
  (user.bookerInfo?.reviewCount ?? 0) + (user.performerInfo?.reviewCount ?? 0);

export const userAudienceSize = (user: UserModel): number =>
  totalSocialFollowing(user.socialFollowing);

export const totalSocialFollowing = (
  socialFollowing: SocialFollowing | null
): number =>
  (socialFollowing?.twitterFollowers ?? 0) +
  (socialFollowing?.instagramFollowers ?? 0) +
  (socialFollowing?.tiktokFollowers ?? 0);

export const isVenue = (user: UserModel): boolean =>
  user.venueInfo !== null && user.venueInfo !== undefined;

export const profileImage = (user: UserModel): string =>
  isVenue(user)
    ? imageOrDefault({
        url: user.profilePicture,
        defaultImage: "/images/default_venue.png",
      })
    : imageOrDefault({
        url: user.profilePicture,
        defaultImage: "/images/default_avatar.png",
      });

export const imageOrDefault = ({
  url,
  defaultImage = "/images/default_avatar.png",
}: {
  url: string | null | undefined;
  defaultImage?: string;
}): string => {
  if (url === undefined || url === null) {
    return defaultImage;
  }

  return url;
};
