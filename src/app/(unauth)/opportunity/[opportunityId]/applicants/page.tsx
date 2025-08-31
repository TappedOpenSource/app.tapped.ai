import ApplicantsTable from "@/components/opportunity/ApplicantsTable";

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
      <div className="container mx-auto overflow-y-scroll py-10">
        <div className="flex flex-row items-center justify-start gap-4">
          <h1 className="py-6 text-3xl font-bold">applicants</h1>
        </div>
        <ApplicantsTable opId={opportunityId} />
      </div>
    </>
  );
}
