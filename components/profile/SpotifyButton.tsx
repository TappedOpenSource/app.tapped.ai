import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaSpotify } from "react-icons/fa";

export default function InstagramButton({ spotifyId }: { spotifyId: string }) {
  return (
    <>
      <Link href={spotifyId} target="_blank" rel="noreferrer">
        <Button variant="outline" size="icon">
          <FaSpotify className="h-6 w-6" />
        </Button>
      </Link>
    </>
  );
}
