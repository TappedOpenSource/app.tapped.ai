
import Image from "next/image";
import { UserModel, audienceSize, profileImage } from "@/domain/types/user_model";
import { useMemo, useState } from "react";
import { useSearch } from "@/context/search";
import { useDebounce } from "@/context/debounce";
import { useRouter } from "next/navigation";
import { Avatar } from "./ui/avatar";

function getSubtitle(hit: UserModel): string {
  const capacity = hit.venueInfo?.capacity ?? null;
  const totalFollowing = audienceSize(hit);
  const category = hit.performerInfo?.category ?? null;

  if (capacity === null && category === null) {
    return totalFollowing === 0 ? `@${hit.username}` : `${totalFollowing} followers`;
  }


  if (capacity === null && category !== null) {
    return `${category} performer`;
  }

  if (capacity === null) {
    return `@${hit.username}`;
  }

  return `${capacity} capacity venue`;
}

function Hit({ hit, onClick }: { hit: UserModel, onClick: () => void}) {
  const imageSrc = profileImage(hit);
  const subtitle = getSubtitle(hit);

  return (
    <button
      onClick={onClick}
    >
      <div className='px-8 py-px w-screen'>
        <div
          className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 flex flex-row items-center justify-start bg-background rounded-full py-3 my-1 hover:scale-105 transition-all duration-150 ease-in-out'
        >
          <div className='relative w-[42px] h-[42px]'>
            <Image
              src={imageSrc}
              alt="user profile picture"
              fill
              className="rounded-full"
              style={{ objectFit: "cover", overflow: "hidden" }}
            />
          </div>
          <div className="w-4" />
          <div className='flex flex-col justify-start items-start'>
            <h1 className="font-bold text-xl line-clamp-1">{hit.artistName ?? hit.username}</h1>
            <p className="text-sm text-gray-400 line-clamp-1">{subtitle}</p>
          </div>
        </div>
      </div>
    </button>
  );
}


export default function MapHeader() {
  const { useSearchData } = useSearch();
  const [query, setQuery] = useState<string>("");
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
        <div>
          <input
            type='text'
            placeholder='search tapped...'
            className='bg-background rounded-full shadow-xl py-4 px-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          {userTiles}
        </div>
      </div>
      <div>
        <Avatar />
      </div>
    </>
  );
}
