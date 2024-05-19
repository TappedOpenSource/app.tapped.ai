import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import Link from "next/link";

export default function InstagramButton({
  instagramHandle,
}: {
  instagramHandle: string;
}) {
  const instagramLink = `https://instagram.com/${instagramHandle}`;
  return (
    <>
      <Link href={instagramLink} target="_blank" rel="noreferrer">
        <Button variant={"outline"} size={"icon"}>
          <Instagram />
        </Button>
      </Link>
    </>
  );
}
