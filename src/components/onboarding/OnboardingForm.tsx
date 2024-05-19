"use client";

import { useAuth } from "@/context/auth";

export default function OnboardingForm() {
  const { state } = useAuth();
  console.log({ state });

  return (
    <>
      <p>bruh</p>
    </>
  );
}
