
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function InstagramButton({ instagramHandle }: {
    instagramHandle: string;
}) {
  const instagramLink = `https://instagram.com/${instagramHandle}`;
  return (
    <>
      <Link
        href={instagramLink}
        target="_blank"
        rel="noreferrer"
        className='bg-[#E1306C] hover:bg-[#E1306C] text-white font-bold py-2 px-4 rounded-full'
      >
        <InstagramIcon />
      </Link>
    </>
  );
}
