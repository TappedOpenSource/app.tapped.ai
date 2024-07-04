import { autocompleteCities, searchPlaces } from "@/data/places";
import {
  BoundingBox,
  queryVenuesInBoundedBox,
  queryUsers,
  UserSearchOptions,
} from "@/data/search";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactNode } from "react";

export const useSearch = () => {
  const useVenueData = (
    boundingBox: BoundingBox | null,
    options: UserSearchOptions
  ) =>
    useQuery({
      queryKey: ["venues", boundingBox],
      queryFn: async () => {
        return await queryVenuesInBoundedBox(boundingBox, options);
      },
    });

  const useSearchData = (query: string, options: UserSearchOptions) =>
    useQuery({
      queryKey: ["users", `${query}-${JSON.stringify(options)}`],
      queryFn: async () => {
        if (
          query === "" &&
          options.lat === undefined &&
          options.lng === undefined &&
          options.minCapacity === undefined &&
          options.genres === undefined &&
          options.maxCapacity === undefined
        ) {
          return [];
        }

        return await queryUsers(query, options);
      },
    });

  const useCityData = (query: string) =>
    useQuery({
      queryKey: ["cities", query],
      queryFn: async () => {
        if (query === "") {
          return [];
        }

        return await autocompleteCities(query);
      },
    });

  const usePlaceData = (query: string) =>
    useQuery({
      queryKey: ["places", query],
      queryFn: async () => {
        if (query === "") {
          return [];
        }

        return await searchPlaces(query);
      },
    });

  return {
    useVenueData,
    useSearchData,
    usePlaceData,
    useCityData,
  };
};

export function SearchProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
