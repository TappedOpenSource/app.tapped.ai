'use client';

import VenueMap from '@/components/map';
import MapSearch from '@/components/map_search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Sheet from 'react-modal-sheet';
import PerformerProfileView from '@/components/PerformerProfileView';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { UserModel } from '@/domain/models/user_model';
import { getUserById } from '@/data/database';
import { optionToNullable } from '@/utils/option';

const queryClient = new QueryClient();

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('user_id');
  const isOpen = userId !== null;

  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  useEffect(() => {
    if (userId === null) {
      return;
    }
    const fetchUser = async () => {
      const user = await getUserById(userId);
      setSelectedUser(optionToNullable(user));
    };
    fetchUser();
  }, [userId]);


  const UserSheet = styled(Sheet)`
  .react-modal-sheet-container {
    background-color: #222 !important;
  }

  .react-modal-sheet-backdrop {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }

  .react-modal-sheet-drag-indicator {
    background-color: #666 !important;
  }
`;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserSheet isOpen={isOpen} onClose={() => router.push('/map')}>
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              <Sheet.Scroller>

                {selectedUser === null ? null :
                  <PerformerProfileView username={selectedUser.username} />}
                {/* <div className='flex flex-col items-center'>
              <h1 className="font-bold text-2xl">{selectedUser?.artistName}</h1>
              <p className="text-sm text-gray-400">@{selectedUser?.username}</p>
            </div> */}
              </Sheet.Scroller>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </UserSheet>
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
