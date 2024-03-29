
'use client';

import { UserModel, profileImage } from '@/domain/models/user_model';
import {
  InstantSearch,
  Hits,
} from 'react-instantsearch';
import Image from 'next/image';
import Link from 'next/link';
import CustomSearchBox from '@/components/SearchBox';
import { useEffect } from 'react';
import { searchClient } from '@/data/search';

function Hit({ hit }: { hit: UserModel }) {
  useEffect(() => {
    // get the artist info using hit.id

  }, [hit]);

  const imageSrc = profileImage(hit);

  return (
    <Link
      href={`https://tapped.ai/${hit.username}`}
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
          style={{ objectFit: 'cover' }}
        />
        <div className="w-4" />
        <div>
          <h1 className="font-bold text-xl">{hit.artistName}</h1>
          <p className="text-sm text-gray-400">@{hit.username}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Search() {
  return (
    <>
      <InstantSearch
        future={{ preserveSharedStateOnUnmount: true }}
        indexName="prod_users"
        searchClient={searchClient}>
        <CustomSearchBox />
        <div className="w-full md:w-1/2">
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </>
  );
}
