/* eslint-disable sonarjs/no-nested-template-literals */
import { UserModel } from "@/domain/types/user_model";
import { Timestamp } from "firebase/firestore";
import Typesense from "typesense";

export type UserSearchOptions = {
  hitsPerPage: number;
  labels?: string[];
  genres?: string[];
  occupations?: string[];
  occupationsBlacklist?: string[];
  venueGenres?: string[];
  unclaimed?: boolean;
  lat?: number;
  lng?: number;
  radius?: number;
  minCapacity?: number;
  maxCapacity?: number;
};

// Initialize Typesense client
export const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST || "localhost",
      port: parseInt(process.env.TYPESENSE_PORT || "8108"),
      protocol: process.env.TYPESENSE_PROTOCOL || "http",
    },
  ],
  apiKey: process.env.TYPESENSE_SEARCH_API_KEY || "",
  connectionTimeoutSeconds: 10,
});

export type BoundingBox = {
  readonly sw: { lat: number; lng: number };
  readonly ne: { lat: number; lng: number };
};

export async function queryVenuesInBoundedBox(
  bounds: BoundingBox | null,
  {
    hitsPerPage,
    venueGenres,
    unclaimed,
    minCapacity,
    maxCapacity,
  }: UserSearchOptions
): Promise<UserModel[]> {
  const filterBy: string[] = [];

  // Venue filter
  filterBy.push("occupations:=[Venue, venue]");

  // Deleted filter
  filterBy.push("deleted:=false");

  // Venue genres filter
  if (venueGenres != null && venueGenres.length > 0) {
    filterBy.push(
      `venueInfo.genres:=[${venueGenres.map((g) => `'${g}'`).join(", ")}]`
    );
  }

  // Unclaimed filter
  if (unclaimed != null) {
    filterBy.push(`unclaimed:=${unclaimed}`);
  }

  // Capacity filters
  if (minCapacity != null) {
    filterBy.push(`venueInfo.capacity:>=${minCapacity}`);
  }

  if (maxCapacity != null) {
    filterBy.push(`venueInfo.capacity:<=${maxCapacity}`);
  }

  try {
    const searchParameters = {
      q: "*",
      query_by: "artistName,username,bio",
      filter_by: filterBy.join(" && "),
      per_page: hitsPerPage,
    };

    // Add geo polygon filter for bounding box if bounds are provided
    if (bounds !== null) {
      const { sw, ne } = bounds;
      // Create polygon from bounding box coordinates (counter-clockwise order)
      // sw = southwest corner, ne = northeast corner
      // Rectangle: sw -> se -> ne -> nw -> sw
      const polygonFilter = `location:(${sw.lat}, ${sw.lng}, ${sw.lat}, ${ne.lng}, ${ne.lat}, ${ne.lng}, ${ne.lat}, ${sw.lng})`;
      filterBy.push(polygonFilter);
      searchParameters.filter_by = filterBy.join(" && ");
    }

    const response = await typesenseClient
      .collections("users")
      .documents()
      .search(searchParameters);

    return (
      response.hits?.map((hit) =>
        convertTypesenseDocumentToUserModel(hit.document)
      ) || []
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function queryUsers(
  query: string,
  {
    hitsPerPage,
    labels,
    genres,
    occupations,
    occupationsBlacklist,
    venueGenres,
    unclaimed,
    lat,
    lng,
    radius = 50_000,
    minCapacity,
    maxCapacity,
  }: UserSearchOptions
): Promise<UserModel[]> {
  const filterBy: string[] = [];

  // Deleted filter
  filterBy.push("deleted:=false");

  // Labels filter
  if (labels != null && labels.length > 0) {
    filterBy.push(
      `performerInfo.label:=[${labels.map((l) => `'${l}'`).join(", ")}]`
    );
  }

  // Genres filter
  if (genres != null && genres.length > 0) {
    filterBy.push(
      `performerInfo.genres:=[${genres.map((g) => `'${g}'`).join(", ")}]`
    );
  }

  // Occupations filter
  if (occupations != null && occupations.length > 0) {
    filterBy.push(
      `occupations:=[${occupations.map((o) => `'${o}'`).join(", ")}]`
    );
  }

  // Occupations blacklist filter
  if (occupationsBlacklist != null && occupationsBlacklist.length > 0) {
    filterBy.push(
      `occupations:!=[${occupationsBlacklist.map((o) => `'${o}'`).join(", ")}]`
    );
  }

  // Venue genres filter
  if (venueGenres != null && venueGenres.length > 0) {
    filterBy.push(
      `venueInfo.genres:=[${venueGenres.map((g) => `'${g}'`).join(", ")}]`
    );
  }

  // Unclaimed filter
  if (unclaimed != null) {
    filterBy.push(`unclaimed:=${unclaimed}`);
  }

  // Capacity filters
  if (minCapacity != null) {
    filterBy.push(`venueInfo.capacity:>=${minCapacity}`);
  }

  if (maxCapacity != null) {
    filterBy.push(`venueInfo.capacity:<=${maxCapacity}`);
  }

  try {
    const searchParameters: {
      q: string;
      query_by: string;
      filter_by: string;
      per_page: number;
      sort_by?: string;
    } = {
      q: query || "*",
      query_by: "artistName,username,bio,performerInfo.label,venueInfo.type",
      filter_by: filterBy.join(" && "),
      per_page: hitsPerPage ?? 10,
    };

    // Add geo location filter and sorting if coordinates are provided
    if (lat != null && lng != null) {
      // Convert radius from meters to kilometers for Typesense
      const radiusKm = radius / 1000;
      // Add radius filter using correct Typesense syntax: location:(lat, lng, radius km)
      filterBy.push(`location:(${lat}, ${lng}, ${radiusKm} km)`);
      searchParameters.filter_by = filterBy.join(" && ");
      // Sort by distance from the specified location
      searchParameters.sort_by = `location(${lat}, ${lng}):asc`;
    } else {
      // Default sorting when no location is specified
      searchParameters.sort_by = "_text_match:desc";
    }

    const response = await typesenseClient
      .collections("users")
      .documents()
      .search(searchParameters);

    return (
      response.hits?.map((hit) =>
        convertTypesenseDocumentToUserModel(hit.document)
      ) || []
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

// Helper function to convert Typesense document to UserModel
export function convertTypesenseDocumentToUserModel(doc: any): UserModel {
  return {
    id: doc.id || "",
    email: doc.email || "",
    unclaimed: doc.unclaimed || false,
    timestamp: doc.timestamp
      ? Timestamp.fromDate(new Date(doc.timestamp))
      : Timestamp.now(),
    username: doc.username || "",
    artistName: doc.artistName || "",
    bio: doc.bio || "",
    occupations: doc.occupations || [],
    profilePicture: doc.profilePicture || null,
    location:
      doc.location && Array.isArray(doc.location) && doc.location.length >= 2
        ? {
            lat: doc.location[0],
            lng: doc.location[1],
            placeId: doc["location.placeId"] || "",
          }
        : null,
    performerInfo:
      doc["performerInfo.label"] ||
      doc["performerInfo.genres"] ||
      doc["performerInfo.rating"] ||
      doc["performerInfo.reviewCount"] !== undefined ||
      doc["performerInfo.spotifyId"] ||
      doc["performerInfo.category"] ||
      doc["performerInfo.pressKitUrl"]
        ? {
            pressKitUrl: doc["performerInfo.pressKitUrl"] || null,
            genres: doc["performerInfo.genres"] || [],
            rating: doc["performerInfo.rating"] || null,
            reviewCount: doc["performerInfo.reviewCount"] || 0,
            label: doc["performerInfo.label"] || "",
            spotifyId: doc["performerInfo.spotifyId"] || null,
            category: doc["performerInfo.category"] || "undiscovered",
          }
        : null,
    venueInfo:
      doc["venueInfo.genres"] ||
      doc["venueInfo.websiteUrl"] ||
      doc["venueInfo.bookingEmail"] ||
      doc["venueInfo.phoneNumber"] ||
      doc["venueInfo.autoReply"] ||
      doc["venueInfo.capacity"] !== undefined ||
      doc["venueInfo.idealPerformerProfile"] ||
      doc["venueInfo.type"] ||
      doc["venueInfo.productionInfo"] ||
      doc["venueInfo.frontOfHouse"] ||
      doc["venueInfo.monitors"] ||
      doc["venueInfo.microphones"] ||
      doc["venueInfo.lights"] ||
      doc["venueInfo.topPerformerIds"]
        ? {
            genres: doc["venueInfo.genres"] || [],
            websiteUrl: doc["venueInfo.websiteUrl"] || null,
            bookingEmail: doc["venueInfo.bookingEmail"] || null,
            phoneNumber: doc["venueInfo.phoneNumber"] || null,
            autoReply: doc["venueInfo.autoReply"] || null,
            capacity: doc["venueInfo.capacity"] || null,
            idealPerformerProfile:
              doc["venueInfo.idealPerformerProfile"] || null,
            type: doc["venueInfo.type"] || null,
            productionInfo: doc["venueInfo.productionInfo"] || null,
            frontOfHouse: doc["venueInfo.frontOfHouse"] || null,
            monitors: doc["venueInfo.monitors"] || null,
            microphones: doc["venueInfo.microphones"] || null,
            lights: doc["venueInfo.lights"] || null,
            topPerformerIds: doc["venueInfo.topPerformerIds"] || [],
            bookingsByDayOfWeek:
              doc["venueInfo.bookingsByDayOfWeek"] || undefined,
          }
        : null,
    bookerInfo:
      doc["bookerInfo.rating"] !== undefined ||
      doc["bookerInfo.reviewCount"] !== undefined
        ? {
            rating: doc["bookerInfo.rating"] || null,
            reviewCount: doc["bookerInfo.reviewCount"] || 0,
          }
        : null,
    emailNotifications: {
      appReleases:
        doc["emailNotifications.appReleases"] !== undefined
          ? doc["emailNotifications.appReleases"]
          : true,
      tappedUpdates:
        doc["emailNotifications.tappedUpdates"] !== undefined
          ? doc["emailNotifications.tappedUpdates"]
          : true,
      bookingRequests:
        doc["emailNotifications.bookingRequests"] !== undefined
          ? doc["emailNotifications.bookingRequests"]
          : true,
    },
    pushNotifications: {
      appReleases:
        doc["pushNotifications.appReleases"] !== undefined
          ? doc["pushNotifications.appReleases"]
          : true,
      tappedUpdates:
        doc["pushNotifications.tappedUpdates"] !== undefined
          ? doc["pushNotifications.tappedUpdates"]
          : true,
      bookingRequests:
        doc["pushNotifications.bookingRequests"] !== undefined
          ? doc["pushNotifications.bookingRequests"]
          : true,
      directMessages:
        doc["pushNotifications.directMessages"] !== undefined
          ? doc["pushNotifications.directMessages"]
          : true,
    },
    deleted: doc.deleted || false,
    socialFollowing: {
      youtubeChannelId: doc["socialFollowing.youtubeChannelId"] || null,
      tiktokHandle: doc["socialFollowing.tiktokHandle"] || null,
      tiktokFollowers: doc["socialFollowing.tiktokFollowers"] || 0,
      instagramHandle: doc["socialFollowing.instagramHandle"] || null,
      instagramFollowers: doc["socialFollowing.instagramFollowers"] || 0,
      twitterHandle: doc["socialFollowing.twitterHandle"] || null,
      twitterFollowers: doc["socialFollowing.twitterFollowers"] || 0,
      facebookHandle: doc["socialFollowing.facebookHandle"] || null,
      facebookFollowers: doc["socialFollowing.facebookFollowers"] || 0,
      spotifyUrl: doc["socialFollowing.spotifyUrl"] || null,
      soundcloudHandle: doc["socialFollowing.soundcloudHandle"] || null,
      soundcloudFollowers: doc["socialFollowing.soundcloudFollowers"] || 0,
      audiusHandle: doc["socialFollowing.audiusHandle"] || null,
      audiusFollowers: doc["socialFollowing.audiusFollowers"] || 0,
      twitchHandle: doc["socialFollowing.twitchHandle"] || null,
      twitchFollowers: doc["socialFollowing.twitchFollowers"] || 0,
    },
    stripeConnectedAccountId: doc.stripeConnectedAccountId || null,
    stripeCustomerId: doc.stripeCustomerId || null,
  };
}

// Helper function to create the users collection schema
// You'll need to run this once to set up your Typesense collection
export async function createUsersCollection() {
  const schema = {
    name: "users",
    fields: [
      { name: "id", type: "string" as const },
      { name: "email", type: "string" as const },
      { name: "username", type: "string" as const },
      { name: "artistName", type: "string" as const },
      { name: "bio", type: "string" as const, optional: true },
      { name: "deleted", type: "bool" as const },
      { name: "unclaimed", type: "bool" as const },
      { name: "occupations", type: "string[]" as const },
      { name: "timestamp", type: "string" as const, optional: true },
      { name: "location", type: "geopoint" as const, optional: true },
      { name: "location.lat", type: "float" as const, optional: true },
      { name: "location.lng", type: "float" as const, optional: true },
      { name: "location.placeId", type: "string" as const, optional: true },
      {
        name: "performerInfo.pressKitUrl",
        type: "string" as const,
        optional: true,
      },
      {
        name: "performerInfo.genres",
        type: "string[]" as const,
        optional: true,
      },
      { name: "performerInfo.rating", type: "float" as const, optional: true },
      {
        name: "performerInfo.reviewCount",
        type: "int32" as const,
        optional: true,
      },
      { name: "performerInfo.label", type: "string" as const, optional: true },
      {
        name: "performerInfo.spotifyId",
        type: "string" as const,
        optional: true,
      },
      {
        name: "performerInfo.category",
        type: "string" as const,
        optional: true,
      },
      { name: "venueInfo.genres", type: "string[]" as const, optional: true },
      { name: "venueInfo.websiteUrl", type: "string" as const, optional: true },
      {
        name: "venueInfo.bookingEmail",
        type: "string" as const,
        optional: true,
      },
      {
        name: "venueInfo.phoneNumber",
        type: "string" as const,
        optional: true,
      },
      { name: "venueInfo.autoReply", type: "string" as const, optional: true },
      { name: "venueInfo.capacity", type: "int32" as const, optional: true },
      {
        name: "venueInfo.idealPerformerProfile",
        type: "string" as const,
        optional: true,
      },
      { name: "venueInfo.type", type: "string" as const, optional: true },
      {
        name: "venueInfo.productionInfo",
        type: "string" as const,
        optional: true,
      },
      {
        name: "venueInfo.frontOfHouse",
        type: "string" as const,
        optional: true,
      },
      { name: "venueInfo.monitors", type: "string" as const, optional: true },
      {
        name: "venueInfo.microphones",
        type: "string" as const,
        optional: true,
      },
      { name: "venueInfo.lights", type: "string" as const, optional: true },
      {
        name: "venueInfo.topPerformerIds",
        type: "string[]" as const,
        optional: true,
      },
      { name: "bookerInfo.rating", type: "float" as const, optional: true },
      {
        name: "bookerInfo.reviewCount",
        type: "int32" as const,
        optional: true,
      },
      {
        name: "socialFollowing.youtubeChannelId",
        type: "string" as const,
        optional: true,
      },
      {
        name: "socialFollowing.tiktokHandle",
        type: "string" as const,
        optional: true,
      },
      {
        name: "socialFollowing.tiktokFollowers",
        type: "int32" as const,
        optional: true,
      },
      {
        name: "socialFollowing.instagramHandle",
        type: "string" as const,
        optional: true,
      },
      {
        name: "socialFollowing.instagramFollowers",
        type: "int32" as const,
        optional: true,
      },
      {
        name: "socialFollowing.twitterHandle",
        type: "string" as const,
        optional: true,
      },
      {
        name: "socialFollowing.twitterFollowers",
        type: "int32" as const,
        optional: true,
      },
      {
        name: "socialFollowing.facebookHandle",
        type: "string" as const,
        optional: true,
      },
      {
        name: "socialFollowing.facebookFollowers",
        type: "int32" as const,
        optional: true,
      },
      {
        name: "socialFollowing.spotifyUrl",
        type: "string" as const,
        optional: true,
      },
      {
        name: "socialFollowing.soundcloudHandle",
        type: "string" as const,
        optional: true,
      },
      {
        name: "socialFollowing.soundcloudFollowers",
        type: "int32" as const,
        optional: true,
      },
      {
        name: "socialFollowing.audiusHandle",
        type: "string" as const,
        optional: true,
      },
      {
        name: "socialFollowing.audiusFollowers",
        type: "int32" as const,
        optional: true,
      },
      {
        name: "socialFollowing.twitchHandle",
        type: "string" as const,
        optional: true,
      },
      {
        name: "socialFollowing.twitchFollowers",
        type: "int32" as const,
        optional: true,
      },
      { name: "profilePicture", type: "string" as const, optional: true },
      {
        name: "stripeConnectedAccountId",
        type: "string" as const,
        optional: true,
      },
      { name: "stripeCustomerId", type: "string" as const, optional: true },
    ],
    default_sorting_field: "artistName",
  };

  try {
    await typesenseClient.collections().create(schema);
    console.log("Users collection created successfully");
  } catch (error) {
    console.error("Error creating users collection:", error);
  }
}
