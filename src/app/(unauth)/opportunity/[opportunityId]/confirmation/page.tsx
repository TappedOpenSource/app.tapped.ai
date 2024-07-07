import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const colors = [
  "blue-500",
  "purple-500",
  "green-600",
  "red-600",
  "yellow-800",
  "indigo-300",
  "pink-500",
  "yellow-800",
];

export default function Page({
  params,
}: {
  params: {
    opportunityId: string;
  };
}) {
  const { opportunityId } = params;
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-6">
        <h1 className="text-center text-4xl font-bold">
          your application has been submitted!
        </h1>
        <h2 className="text-center text-lg">
          download the tapped app to discover more!
        </h2>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link href="/download">
            <Button>download</Button>
          </Link>
          <Link href={`/opportunity/${opportunityId}?show_confirmation=true`}>
            <Button variant="secondary">maybe later</Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 lg:grid-cols-4 lg:px-12">
        {colors.map((c, i) => (
          <div
            key={i}
            className={`h-24 w-24 rounded-md lg:h-44 lg:w-44 bg-${c} py-4 blur-md`}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
