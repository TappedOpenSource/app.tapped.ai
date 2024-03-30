
import Image from 'next/image';
import { UserModel, profileImage } from '@/domain/models/user_model';
import { useEffect, useMemo, useState } from 'react';
import { useSearch } from '@/context/search';
import { useDebounce } from '@/context/debounce';
import Sheet from 'react-modal-sheet';
import PerformerProfileView from './PerformerProfileView';
import styled from 'styled-components';

function Hit({ hit, onClick }: { hit: UserModel, onClick: () => void}) {
  const imageSrc = profileImage(hit);
  return (
    <button
      onClick={onClick}
    >
      <div
        className='w-full flex flex-row items-center justify-start bg-gray-700 rounded-xl px-4 py-3 my-4 hover:scale-105 transition-all duration-150 ease-in-out'
      >
        <Image
          src={imageSrc}
          alt="user profile picture"
          width={50}
          height={50}
          className="rounded-full"
          objectFit='cover'
          style={{ objectFit: 'cover', overflow: 'hidden' }}
        />
        <div className="w-4" />
        <div>
          <h1 className="font-bold text-xl">{hit.artistName}</h1>
          <p className="text-sm text-gray-400">@{hit.username}</p>
        </div>
      </div>
    </button>
  );
}


export default function MapSearch() {
  const [isOpen, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const { useSearchData } = useSearch();
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(query, 250);

  const { data } = useSearchData(debouncedQuery, { hitsPerPage: 10 });

  const userTiles = useMemo(
    () =>
      (data ?? []).map((user) => {
        return (
          <Hit
            key={user.id}
            hit={user}
            onClick={() => setSelectedUser(user)}
          />
        );
      }),
    [data],
  );

  useEffect(() => {
    if (selectedUser) {
      setOpen(true);
    }
  }, [selectedUser]);

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
      <UserSheet isOpen={isOpen} onClose={() => setOpen(false)}>
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
      <div className='px-8 py-8'>
        <input
          type='text'
          placeholder='search...'
          className='bg-gray-900 rounded-lg p-2'
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className='flex flex-col'>
        {userTiles}
      </div>
    </>
  );
}
