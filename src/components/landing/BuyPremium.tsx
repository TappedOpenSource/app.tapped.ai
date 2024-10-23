import { Button } from "../ui/button";
import Link from "next/link";

export default function BuyPremium() {
  return (
    <>
      <div className="w-full bg-blue-500 rounded-xl flex p-8">
        <div className="flex-1">
          <h3 className="text-xl font-bold">tapped premium</h3>
          <p>get more shows with the best tools for live music</p>
        </div>
        <Link href="/premium">
          <Button>upgrade</Button>
        </Link>
      </div>
    </>
  );
}
