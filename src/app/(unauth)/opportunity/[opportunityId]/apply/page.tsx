import ApplyForm from "@/components/opportunity/form/ApplyForm";

export default async function Page(
  props: {
    params: Promise<{ opportunityId: string }>;
  }
) {
  const params = await props.params;
  const opId = params.opportunityId;
  return (
    <>
      <ApplyForm opportunityId={opId} />
    </>
  );
}
