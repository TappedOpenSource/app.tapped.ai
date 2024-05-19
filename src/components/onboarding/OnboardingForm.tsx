"use client";

import { useOnboarded } from "@/context/onboarded";

export default function OnboardingForm() {
  const { state } = useOnboarded();
  console.log({ state });

  return (
    <>
      <p>bruh</p>
    </>
  );
}
