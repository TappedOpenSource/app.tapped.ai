import { autocompleteCities, searchPlaces } from "@/data/places";
import { BoundingBox, UserSearchOptions } from "@/data/typesense";
import { UserModel } from "@/domain/types/user_model";
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
      queryFn: async (): Promise<UserModel[]> => {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "venues",
            boundingBox,
            options,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }

        const data = await response.json();
        return data.results;
      },
    });

  const useSearchData = (query: string, options: UserSearchOptions) =>
    useQuery({
      queryKey: ["users", `${query}-${JSON.stringify(options)}`],
      queryFn: async (): Promise<UserModel[]> => {
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

        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "users",
            query,
            options,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        return data.results;
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
