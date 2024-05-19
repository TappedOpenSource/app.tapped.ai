import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";
import Link from "next/link";

export default function TwitterButton({
  twitterHandle,
}: {
  twitterHandle: string;
}) {
  const twitterLink = `https://twitter.com/${twitterHandle}`;
  return (
    <>
      <Link href={twitterLink} target="_blank" rel="noreferrer">
        <Button variant="outline" size="icon">
          <Twitter />
        </Button>
      </Link>
    </>
  );
}
