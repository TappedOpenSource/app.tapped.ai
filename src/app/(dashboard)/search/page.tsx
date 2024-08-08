import { ContentLayout } from "@/components/admin-panel/content-layout";
import FeaturedPerformers from "@/components/FeaturedPerformers";
import SearchBar from "@/components/search/SearchBar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function Page() {
  // const { q } = searchParams;
  // console.log({ q });

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
        <div className="flex flex-col items-center px-4 pb-12">
          <div className="mt-40 w-full md:w-3/4 ">
            <h1 className="mb-4 text-5xl font-black">search live music</h1>
            <SearchBar animatedPlaceholder />
          </div>
          <div className="w-full md:w-3/4">
            <FeaturedPerformers />
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
