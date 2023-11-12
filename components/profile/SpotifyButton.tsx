
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';

export default function InstagramButton({ spotifyId }: {
    spotifyId: string;
}) {
  return (
    <>
      <Link
        href={spotifyId}
        target="_blank"
        rel="noreferrer"
        className='bg-[#1DB954] hover:bg-[#1DB954] text-white font-bold py-2 px-4 rounded-full'
      >
        <FaSpotify
          className='w-6 h-6'
        />
      </Link>
    </>
  );
}
