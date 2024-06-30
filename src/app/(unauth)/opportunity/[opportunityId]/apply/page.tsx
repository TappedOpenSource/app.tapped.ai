import { LoadingSpinner } from "@/components/LoadingSpinner";
import ApplyForm from "@/components/opportunity/form/ApplyForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ApplyForm />
      </Suspense>
    </>
  );
}
