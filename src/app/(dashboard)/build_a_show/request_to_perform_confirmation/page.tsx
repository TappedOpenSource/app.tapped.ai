
import Link from "next/link";
import MapHeader from "@/components/map_header";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mx-auto max-w-2xl space-y-6 p-6">
        <h1 className="text-3xl font-bold">your request has been sent</h1>
        <p className="">
        you will get a DM from the venue if they accept your request and venues usually take 1-2 weeks to respond. if you have any questions or if they&apos;re taking too long, please contact the venue directly.,
        </p>
        <Link href={"/dashboard"}>
          <Button>okay</Button>
        </Link>
      </div>
    </>
  );
}
