import { BoundingBox, queryVenuesInBoundedBox } from '@/data/search';
import { useQuery } from '@tanstack/react-query';

export const useSearch = () => {
  const useVenueData = (boundingBox: BoundingBox | null) =>
    useQuery({
      queryKey: ['venues', boundingBox],
      queryFn: async () => {
        return await queryVenuesInBoundedBox(boundingBox);
      },
    });

  return {
    useVenueData,
  };
};
