import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LeaderboardTable, { LeaderboardType } from "@/components/leaderboards/leaders_table";
import Link from "next/link";

const validatedType = (type: string): LeaderboardType => {
  switch (type) {
  case "rising":
  case "performer":
    // case "venue":
    // case "genre":
    // case "city":
    return type;
  default:
    return "rising";
  }
};

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const rawListType = searchParams["type"] ?? "rising";
  const listType = validatedType(rawListType);

  return (
    <>
      <ContentLayout title="charts">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>charts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-center items-center">
          <LeaderboardTable type={listType} />
        </div>
      </ContentLayout>
    </>
  );
}
