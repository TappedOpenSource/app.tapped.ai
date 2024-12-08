import FeaturedPerformers from "@/components/FeaturedPerformers";
import SearchBar from "@/components/search/SearchBar";
import UnauthHeader from "@/components/unauth_header";

export default function Page() {
  return (
    <>
      <UnauthHeader />
      <div className="flex flex-col items-center px-4 pb-12">
        <div className="mt-40 w-full md:w-3/4 ">
          <h1 className="mb-4 text-5xl font-black">search live music</h1>
          <SearchBar animatedPlaceholder />
        </div>
        <div className="w-full md:w-3/4">
          <FeaturedPerformers />
        </div>
      </div>
    </>
  );
}
