"use client";

import { useAuth } from "@/context/auth";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { onboardNewUser } from "@/domain/usecases/onboarding";
import { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";

const formSchema = z.object({
  username: z.string().min(3).max(20),
  profilePicture: z.custom<File>(),
  instagramHandle: z.string().min(3).max(20).optional(),
  instagramFollowers: z.coerce.number().int().positive(),
  twitterHandle: z.string().min(3).max(20).optional(),
  twitterFollowers: z.coerce.number().int().positive(),
  tiktokHandle: z.string().min(3).max(20).optional(),
  tiktokFollowers: z.coerce.number().int().positive(),
  eula: z.boolean(),
});


export default function OnboardingForm() {
  const { state: { authUser }, dispatch } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twitterFollowers: 0,
      instagramFollowers: 0,
      tiktokFollowers: 0,
    },
  });
  const [loading, setLoading] = useState(false);

  if (authUser === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>you must be logged in to access this page.</p>
      </div>
    );
  }


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
    // Do something with the form values.
      // ✅ This will be type-safe and validated.
      setLoading(true);
      console.log(values);

      if (!authUser) {
        throw new Error("cannot onboard without an auth user");
      }

      await onboardNewUser(dispatch, authUser, values);
    } catch (e) {
      console.error(e);
      alert(e.message);
    }

    setLoading(true);
  }

  return (
    <>
      <div className="mx-auto max-w-md space-y-6 py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">complete your profile</h1>
          <p className="text-gray-500 dark:text-gray-400">enter your information to get started.</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>preferred username</FormLabel>
                  <FormControl>
                    <Input id="username" placeholder="enter your username" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>profile picture</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      placeholder="profile picture"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="instagramHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>instagram handle</FormLabel>
                    <FormControl>
                      <Input id="instagram_handle" placeholder="@champagnepapi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagramFollowers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>instagram followers</FormLabel>
                    <FormControl>
                      <Input id="instagram_followers" type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="twitterHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>twitter handle</FormLabel>
                    <FormControl>
                      <Input id="twitter_handle" placeholder="@taylorswift13" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitterFollowers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>twitter followers</FormLabel>
                    <FormControl>
                      <Input id="twitter_followers" type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tiktokHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>tiktok handle</FormLabel>
                    <FormControl>
                      <Input id="tiktok_handle" placeholder="@chandlermatkins" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tiktokFollowers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>tiktok followers</FormLabel>
                    <FormControl>
                      <Input id="tiktok_followers" type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                      i agree to the {" "}
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
            <Button className="w-full" type="submit">
          complete onboarding
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
