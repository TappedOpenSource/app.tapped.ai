/* eslint-disable sonarjs/no-nested-template-literals */
import { UserModel } from "@/domain/types/user_model";
import algoliasearch from "algoliasearch";

export const searchClient = algoliasearch(
  "GCNFAI2WB6",
  "c89ebf37b46a3683405be3ed0901f217",
);

export const usersIndex = searchClient.initIndex("prod_users");

// export type BoundingBox = [number, number, number, number]; //N, W, S, E
export type BoundingBox = {
    readonly sw: { lat: number, lng: number },
    readonly ne: { lat: number, lng: number },
};

export async function queryVenuesInBoundedBox(bounds: BoundingBox | null, { hitsPerPage = 50 }: { hitsPerPage: number }): Promise<UserModel[]> {
  const response = await usersIndex.search<UserModel>("", {
    filters: "occupations:Venue OR occupations:venue AND deleted:false",
    insideBoundingBox: bounds === null ?
      undefined :
      [[bounds.sw.lat, bounds.sw.lng, bounds.ne.lat, bounds.ne.lng]],
    hitsPerPage: hitsPerPage,
  });

  return response.hits;
}

export type UserSearchOptions = {
  hitsPerPage: number;
  labels?: string[];
  genres?: string[];
  occupations?: string[];
  venueGenres?: string[];
  unclaimed?: boolean;
  lat?: number;
  lng?: number;
  radius?: number;
  minCapacity?: number;
  maxCapacity?: number;
};

export async function queryUsers(query: string, {
  hitsPerPage,
  labels,
  genres,
  occupations,
  venueGenres,
  unclaimed,
  lat,
  lng,
  radius = 50_000,
  minCapacity,
  maxCapacity,
}: UserSearchOptions): Promise<UserModel[]> {
  const formattedIsDeletedFilter = "deleted:false";
  const formattedLabelFilter = labels != null ?
    `(${labels.map((e) => `performerInfo.label:'${e}'`).join(" OR ")})` :
    null;
  const formattedGenreFilter = genres != null ?
    `(${genres.map((e) => `performerInfo.genres:'${e}'`).join(" OR ")})` :
    null;
  const formattedOccupationFilter = occupations != null ?
    `(${occupations.map((e) => `occupations:'${e}'`).join(" OR ")})` :
    null;
  const formattedVenueGenreFilter = venueGenres != null ?
    `(${venueGenres.map((e) => `venueInfo.genres:'${e}'`).join(" OR ")})` :
    null;
  const formattedUnclaimedFilter = unclaimed != null ?
    `unclaimed:${unclaimed}` :
    null;

  const filters = [
    formattedIsDeletedFilter,
    formattedLabelFilter,
    formattedGenreFilter,
    formattedOccupationFilter,
    formattedVenueGenreFilter,
    formattedUnclaimedFilter,
  ].filter((element) => element !== null);
  const filtersStr = filters.join(" AND ");

  const formattedLocationFilter =
    (lat != null && lng != null) ? `${lat}, ${lng}` : undefined;

  try {
    const numbericFilters: string[] = [];

    if (minCapacity != null) {
      numbericFilters.push(`venueInfo.capacity>=${minCapacity}`);
    }

    if (maxCapacity != null) {
      numbericFilters.push(`venueInfo.capacity<=${maxCapacity}`);
    }

    const response = await usersIndex.search<UserModel>(query, {
      filters: filtersStr,
      hitsPerPage: hitsPerPage ?? 10,
      aroundRadius: radius,
      aroundLatLng: formattedLocationFilter,
      numericFilters: numbericFilters,
    });

    return response.hits;
  } catch (e) {
    console.error(e);
    return [];
  }
}
