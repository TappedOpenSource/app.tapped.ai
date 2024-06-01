import FeaturedPerformers from "@/components/FeaturedPerformers";
import Footer from "@/components/admin-panel/footer";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import SearchBar from "@/components/SearchBar";
import TappedSheet from "@/components/TappedSheet";
import BuyPremium from "@/components/landing/BuyPremium";
// import BuyPremium from "@/components/landing/BuyPremium";
import MapHeader from "@/components/map_header";
import { Button } from "@/components/ui/button";
import { Globe2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <TappedSheet />
      <div className="fixed top-0 z-10">
        <Suspense
          fallback={
            <div className="w-screen flex items-center justify-center">
              <LoadingSpinner />
            </div>
          }
        >
          <MapHeader showSearch={false} />
        </Suspense>
      </div>
      <div className="px-4 pb-12 min-h-screen flex flex-col justify-start items-center">
        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mt-40 md:mt-64 lg:mt-64 xl:mt-[175px]">
          <h1 className="font-black text-5xl mb-4">
              search performers
          </h1>
          <SearchBar animatedPlaceholder />
          <div className="flex justify-center gap-4 mt-4">
            <Link
              href="/map"
            >
              <Button variant={"secondary"}>
              view the map <span className="ml-2"><Globe2 className="h-4 w-4" /></span>
              </Button>
            </Link>
            <Link
              href="/premium"
            >
              <Button variant={"ghost"}>
                try premium
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
          <FeaturedPerformers />
        </div>
        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
          <BuyPremium />
        </div>
      </div>
      <Footer />
    </>
  );
}
