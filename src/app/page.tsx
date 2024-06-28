import { redirect } from "next/navigation";

export default function Page() {
  redirect("/map");
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <p>redirecting...</p>
      </div>
    </>
  );
}
