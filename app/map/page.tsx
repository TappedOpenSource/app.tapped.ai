'use client';

import VenueMap from '@/components/map';
import MapSearch from '@/components/map_search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Sheet from 'react-modal-sheet';
import ProfileView from '@/components/ProfileView';
import { styled } from 'styled-components';
import { Suspense, useEffect, useState } from 'react';
import { UserModel } from '@/domain/types/user_model';
import { getUserByUsername } from '@/data/database';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const queryClient = new QueryClient();

const UserSheet = styled(Sheet)`
  .react-modal-sheet-container {
    background-color: #010F16FF !important;
  }

  .react-modal-sheet-backdrop {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }

  .react-modal-sheet-drag-indicator {
    background-color: #666 !important;
  }
`;

function BottomSheet() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const isOpen = username !== null;

  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  useEffect(() => {
    if (username === null) {
      return;
    }
    const fetchUser = async () => {
      const user = await getUserByUsername(username);
      setSelectedUser(user ?? null);
    };
    fetchUser();
  }, [username]);


  return (
    <UserSheet isOpen={isOpen} onClose={() => router.push('/map')}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <Sheet.Scroller>

            {selectedUser === null ? null :
              <ProfileView username={selectedUser.username} />}
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </UserSheet>
  );
}

export default function Page() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div className='min-h-screen w-screen flex justify-center items-center'>
          <LoadingSpinner />
        </div>}>
          <BottomSheet />
        </Suspense>
        <div className='absolute z-10'>
          <MapSearch />
        </div>
        <div className='z-0'>
          <VenueMap />
        </div>
      </QueryClientProvider>
    </>
  );
}
