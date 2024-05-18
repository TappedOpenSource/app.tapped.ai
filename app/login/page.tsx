"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import AuthForm from "@/components/login/AuthForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className='min-h-screen w-screen flex justify-center items-center'>
      <LoadingSpinner />
    </div>}>
      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 hidden top-4 md:right-8 md:top-8",
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted dark:border-r lg:flex">
          {/* <div className="absolute inset-0 bg-zinc-900" /> */}
          <div className="relative z-20 w-full h-full">
            <Image
              src={"/gifs/splash.gif"}
              alt="splash animation"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="relative z-20 mt-auto p-10">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;First you learn the instrument, then you learn the music, then you forget all that s**t and just play.&rdquo;
              </p>
              <footer className="text-sm">Charlie Parker</footer>
            </blockquote>
          </div>
        </div>
        <div className="p-4 lg:p-8 h-full flex items-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {/* <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
            </p>
          </div> */}
            <Suspense fallback={<LoadingSpinner />}>
              <AuthForm />
            </Suspense>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
