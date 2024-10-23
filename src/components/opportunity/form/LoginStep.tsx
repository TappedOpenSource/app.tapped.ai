"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import SignUpForm from "@/components/login/SignUpForm";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function LoginStep() {
  const pathname = usePathname();
  const encodedPathname = encodeURIComponent(pathname);

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Suspense fallback={<LoadingSpinner />}>
          <SignUpForm redirect={encodedPathname} />
        </Suspense>
        <p className="text-muted-foreground px-8 text-center text-sm">
          by clicking continue, you agree to our{" "}
          <Link href="/terms" className="hover:text-primary underline underline-offset-4">
            terms of service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:text-primary underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </>
  );
}
