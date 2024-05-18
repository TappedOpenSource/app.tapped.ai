import { useOnboarded } from "@/context/onboarded";

export default function Page() {
  const { state } = useOnboarded();
  console.log({ state });

  return (
    <>
      <p>hi</p>
    </>
  );
}
