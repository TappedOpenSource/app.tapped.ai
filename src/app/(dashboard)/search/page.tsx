import SearchBar from "@/components/search/SearchBar";

export default function Page({ searchParams }: {
    searchParams: { [key: string]: string }
}) {
  const { q } = searchParams;
  console.log({ q });

  return (
    <>
      <SearchBar />
    </>
  );
}
