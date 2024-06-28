import { ContentLayout } from "@/components/admin-panel/content-layout";
import Footer from "@/components/admin-panel/footer";
import FeaturedPerformers from "@/components/FeaturedPerformers";
import BuyPremium from "@/components/landing/BuyPremium";
import SearchBar from "@/components/search/SearchBar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { q } = searchParams;
  console.log({ q });

  return (
    <>
      <ContentLayout title="search">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>search</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex min-h-screen flex-col items-center justify-start px-4 pb-12">
          <div className="mt-40 w-full md:mt-64 md:w-3/4 lg:mt-64 lg:w-1/2 xl:mt-[175px]">
            <h1 className="mb-4 text-5xl font-black">search performers</h1>
            <SearchBar animatedPlaceholder />
            <div className="flex justify-center">
              <Button variant={"link"}>
                <Link
                  href="https://tapped.ai"
                  className="text-blue-500 underline"
                >
                  what is tapped?
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-3/4 lg:w-1/2">
            <FeaturedPerformers />
          </div>
          <div className="w-full md:w-3/4 lg:w-1/2">
            <BuyPremium />
          </div>
        </div>
        <div className="bottom-0 w-screen md:fixed">
          <Footer />
        </div>
      </ContentLayout>
    </>
  );
}
