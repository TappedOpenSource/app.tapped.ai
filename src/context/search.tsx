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
  const useVenueData = (boundingBox: BoundingBox | null) =>
    useQuery({
      queryKey: ["venues", boundingBox],
      queryFn: async () => {
        return await queryVenuesInBoundedBox(boundingBox, {
          hitsPerPage: 150,
        });
      },
    });

  const useSearchData = (query: string, options: UserSearchOptions) => useQuery({
    queryKey: ["users", query],
    queryFn: async () => {
      if (query === "" && options.lat === undefined && options.lng === undefined && options.minCapacity === undefined && options.genres === undefined && options.maxCapacity === undefined) {
        return [];
      }

      return await queryUsers(query, options);
    },
  });

  return {
    useVenueData,
    useSearchData,
  };
};

export function SearchProvider({ children }: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
