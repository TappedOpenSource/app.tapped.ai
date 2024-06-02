import LeaderboardTable, { LeaderboardType } from "@/components/leaderboards/leaders_table";

const validatedType = (type: string): LeaderboardType => {
  switch (type) {
  case "trending":
  case "performer":
  // case "venue":
  // case "genre":
  // case "city":
    return type;
  default:
    return "trending";
  }
};

export default function Page({ searchParams }: {
  searchParams: { [key: string]: string };
}) {
  const rawListType = searchParams["type"] ?? "trending";
  const listType = validatedType(rawListType);

  return (
    <>
      <div className="flex justify-center items-center">
        <LeaderboardTable type={listType} />
      </div>
    </>
  );
}
