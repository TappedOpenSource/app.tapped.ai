"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

type RequireLoginProps = {
  returnUrl?: string;
};

export function RequestLoginPage(props: RequireLoginProps) {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <RequestLoginCard {...props} />
      </div>
    </>
  );
}

export function RequestLoginCard({ returnUrl }: RequireLoginProps) {
  const pathname = usePathname();
  const encodedPathname = encodeURIComponent(pathname);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link href={`/signup?return_url=${returnUrl ?? encodedPathname}`}>
        <Button>sign up</Button>
      </Link>
    </div>
  );
}
