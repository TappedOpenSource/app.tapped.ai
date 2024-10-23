"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen w-screen flex justify-center items-center">
            <LoadingSpinner />
          </div>
        }
      >
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted dark:border-r lg:flex">
            <div className="relative z-20 w-full h-full">
              <Image
                src={"/gifs/splash.gif"}
                alt="splash animation"
                fill
                priority
                unoptimized
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="relative z-20 mt-auto p-10">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;first you learn the instrument, then you learn the music, then you forget all that s**t and
                  just play.&rdquo;
                </p>
                <footer className="text-sm">Charlie Parker</footer>
              </blockquote>
            </div>
          </div>
          <div className="p-4 lg:p-8 h-full flex items-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
              <p className="px-8 text-center text-sm text-muted-foreground">
                by clicking continue, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
