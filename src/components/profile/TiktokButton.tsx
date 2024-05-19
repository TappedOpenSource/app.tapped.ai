import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaTiktok } from "react-icons/fa";

export default function TiktokButton({
  tiktokHandle,
}: {
  tiktokHandle: string;
}) {
  const tiktokLink = `https://tiktok.com/@${tiktokHandle}`;
  return (
    <>
      <Link href={tiktokLink} target="_blank" rel="noreferrer">
        <Button variant="outline" size="icon">
          <FaTiktok className="h-6 w-6" />
        </Button>
      </Link>
    </>
  );
}
