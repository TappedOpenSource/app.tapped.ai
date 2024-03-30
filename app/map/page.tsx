'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VenueMap from '@/components/map';
import MapSearch from '@/components/map_search';

const queryClient = new QueryClient();

export default function Page() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className='absolute z-10'>
          <MapSearch />
        </div>
        <div className='z-0'>
          <VenueMap />
        </div>
      </QueryClientProvider >
    </>
  );
}
