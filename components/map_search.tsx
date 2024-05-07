
import Image from 'next/image';
import { UserModel, profileImage } from '@/domain/types/user_model';
import { useMemo, useState } from 'react';
import { useSearch } from '@/context/search';
import { useDebounce } from '@/context/debounce';
import { useRouter } from 'next/navigation';


function Hit({ hit, onClick }: { hit: UserModel, onClick: () => void}) {
  const imageSrc = profileImage(hit);
  return (
    <button
      onClick={onClick}
    >
      <div className='px-8 py-px w-screen'>
        <div
          className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 flex flex-row items-center justify-start bg-gray-900 rounded-full py-3 my-1 hover:scale-105 transition-all duration-150 ease-in-out'
        >
          <div className='relative w-[48px] h-[48px]'>
            <Image
              src={imageSrc}
              alt="user profile picture"
              fill
              className="rounded-full"
              objectFit='cover'
              style={{ objectFit: 'cover', overflow: 'hidden' }}
            />
          </div>
          <div className="w-4" />
          <div className='flex flex-col justify-start items-start'>
            <h1 className="font-bold text-xl line-clamp-1">{hit.artistName}</h1>
            <p className="text-sm text-gray-400 line-clamp-1">@{hit.username}</p>
          </div>
        </div>
      </div>
    </button>
  );
}


export default function MapSearch() {
  const { useSearchData } = useSearch();
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(query, 250);
  const router = useRouter();

  const { data } = useSearchData(debouncedQuery, { hitsPerPage: 5 });

  const userTiles = useMemo(
    () =>
      (data ?? []).map((user) => {
        return (
          <Hit
            key={user.id}
            hit={user}
            onClick={() => router.push(`/map?username=${user.username}`)}
          />
        );
      }),
    [data, router],
  );

  return (
    <>

      <div className='px-8 pt-8 pb-1 w-screen'>
        <input
          type='text'
          placeholder='search tapped...'
          className='bg-gray-900 rounded-full py-4 px-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className='flex flex-col'>
        {userTiles}
      </div>
    </>
  );
}
