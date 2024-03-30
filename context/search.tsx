import { BoundingBox, queryVenuesInBoundedBox, queryUsers } from '@/data/search';
import { useQuery } from '@tanstack/react-query';

export const useSearch = () => {
  const useVenueData = (boundingBox: BoundingBox | null) =>
    useQuery({
      queryKey: ['venues', boundingBox],
      queryFn: async () => {
        return await queryVenuesInBoundedBox(boundingBox);
      },
    });

  const useSearchData = (query: string, { hitsPerPage }: {
    hitsPerPage: number;
  }) => useQuery({
    queryKey: ['users', query],
    queryFn: async () => {
      if (query === '') {
        return [];
      }

      return await queryUsers(query, { hitsPerPage });
    },
  });

  return {
    useVenueData,
    useSearchData,
  };
};
