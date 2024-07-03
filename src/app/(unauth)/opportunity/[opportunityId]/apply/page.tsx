import ApplyForm from "@/components/opportunity/form/ApplyForm";

export default function Page({
  params,
}: {
  params: { opportunityId: string };
}) {
  const opId = params.opportunityId;
  return (
    <>
      <ApplyForm opportunityId={opId} />
    </>
  );
}
