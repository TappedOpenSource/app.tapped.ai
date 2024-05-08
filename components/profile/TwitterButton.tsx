
import Link from "next/link";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function TwitterButton({ twitterHandle }: {
    twitterHandle: string;
}) {
  const twitterLink = `https://twitter.com/${twitterHandle}`;
  return (
    <>
      <Link
        href={twitterLink}
        target="_blank"
        rel="noreferrer"
        className='bg-[#1DA1F2] hover:bg-[#1DA1F2] text-white font-bold py-2 px-4 rounded-full'
      >
        <TwitterIcon />
      </Link>
    </>
  );
}

