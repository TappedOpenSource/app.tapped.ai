'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VenueMap from '@/components/map';

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <VenueMap />
    </QueryClientProvider >
  );
}
