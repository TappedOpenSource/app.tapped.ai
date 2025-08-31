import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const colors = ["blue-500", "purple-500", "green-600", "red-600", "yellow-800", "indigo-300", "pink-500", "yellow-800"];

export default async function Page(
  props: {
    params: Promise<{
      opportunityId: string;
    }>;
  }
) {
  const params = await props.params;
  const { opportunityId } = params;
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-6">
        <h1 className="text-center text-4xl font-bold">your application has been submitted!</h1>
        <h2 className="text-center text-lg">download the tapped app to discover more!</h2>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link href="/download">
            <Button>download</Button>
          </Link>
          <Link href={`/opportunity/${opportunityId}?show_confirmation=true`}>
            <Button variant="secondary">maybe later</Button>
          </Link>
        </div>
      </div>
      <Link href="/download" className="flex justify-center">
        <div className="grid grid-cols-3 place-items-center gap-3 px-4 lg:grid-cols-4 lg:px-12">
          {colors.map((c, i) => (
            <div
              key={i}
              className="flex h-32 w-28 items-center justify-center rounded-md bg-indigo-500 text-2xl font-bold text-white blur-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg lg:h-56 lg:w-44"
            >
              bg - {c}
            </div>
          ))}
        </div>
      </Link>
      <Footer />
    </>
  );
}
