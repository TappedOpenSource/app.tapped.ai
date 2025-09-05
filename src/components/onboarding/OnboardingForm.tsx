"use client";

import { useAuth } from "@/context/auth";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { onboardNewUser } from "@/domain/usecases/onboarding";
import { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { redirect, useRouter } from "next/navigation";
import { generateDefaultUsername } from "@/utils/default_username";

const formSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
  profilePicture: z.custom<File>(),
  instagramHandle: z.string().min(3).max(20).optional(),
  instagramFollowers: z.coerce.number().int().nonnegative(),
  twitterHandle: z.string().min(3).max(20).optional(),
  twitterFollowers: z.coerce.number().int().nonnegative(),
  tiktokHandle: z.string().min(3).max(20).optional(),
  tiktokFollowers: z.coerce.number().int().nonnegative(),
  eula: z.boolean(),
});

export default function OnboardingForm({
  returnUrl,
}: {
  returnUrl?: string | null;
}) {
  const router = useRouter();
  const {
    state: { authUser, currentUser },
    dispatch,
  } = useAuth();
  const defaultUsername =
    authUser?.displayName !== undefined
      ? `${authUser?.displayName
          ?.replaceAll(" ", "")
          .toLowerCase()}${Math.floor(Math.random() * 1000)}`
      : generateDefaultUsername();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: defaultUsername,
      twitterFollowers: 0,
      instagramFollowers: 0,
      tiktokFollowers: 0,
    },
  });
  const [loading, setLoading] = useState(false);

  if (authUser === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>you must be logged in to access this page.</p>
        <Link href="/signup">
          <Button variant="secondary">sign in</Button>
        </Link>
      </div>
    );
  }

  if (currentUser !== undefined) {
    router.push("/dashboard");
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      setLoading(true);

      if (!authUser) {
        throw new Error("cannot onboard without an auth user");
      }

      await onboardNewUser(dispatch, authUser, values);
      if (returnUrl) {
        router.push(returnUrl);
      }
    } catch (e) {
      console.error(e);
      alert(e.message);
    }

    setLoading(true);
  }

  return (
    <>
      <div className="mx-auto w-full max-w-lg py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">complete your profile</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      placeholder="handle (no caps or spaces)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="eula"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        i agree to the{" "}
                        <Link
                          className="underline"
                          href="/eula"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          eula
                        </Link>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={!form.getValues().eula}
            >
              complete onboarding
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
