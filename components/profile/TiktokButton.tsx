
import Link from "next/link";
import { FaTiktok } from "react-icons/fa";

export default function TiktokButton({ tiktokHandle }: {
    tiktokHandle: string;
}) {
  const tiktokLink = `https://tiktok.com/@${tiktokHandle}`;
  return (
    <>
      <Link
        href={tiktokLink}
        target="_blank"
        rel="noreferrer"
        className='bg-[#FFFFFF]/10 hover:bg-[#000000] text-white font-bold py-2 px-4 rounded-full'
      >
        <FaTiktok
          className='w-6 h-6'
        />
      </Link>
    </>
  );
}

