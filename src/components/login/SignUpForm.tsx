"use client";

import ContinueWithGoogleButton from "@/components/login/ContinueWithGoogleButton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password_input";
import { signupWithCredentials } from "@/data/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "enter a valid email address" }),
  password: z.string().min(8, { message: "password must be at least 8 characters" }),
  confirmPassword: z.string(),
});

type SignUpFormValue = z.infer<typeof formSchema>;

export default function SignUpForm({
  doRedirect = true,
  redirect = "/dashboard",
}: {
  doRedirect?: boolean;
  redirect?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("return_url") ?? redirect;
  const form = useForm<SignUpFormValue>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);

  const onGoogleLogin = () => {
    if (doRedirect) {
      router.push(returnUrl);
    }
  };

  const onSubmit = async (data: SignUpFormValue) => {
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("passwords do not match");
      }

      setLoading(true);
      const { email } = data;
      await signupWithCredentials(data);

      if (window["tolt_referral"] && email != null) {
        window["tolt"].signup(email);
      }

      if (doRedirect) {
        router.push(returnUrl ?? "/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="username"
                    type="email"
                    placeholder="enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <PasswordInput autoComplete="new-password" placeholder="********" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>confirm password</FormLabel>
                <FormControl>
                  <PasswordInput autoComplete="new-password" placeholder="********" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-4">
            <Button variant={"secondary"}>
              <Link href={`/login?return_url=${encodeURIComponent(returnUrl)}`}>already have an account?</Link>
            </Button>
            <Button disabled={loading} className="ml-auto w-full" type="submit">
              sign up
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs lowercase">
          <span className="bg-background text-muted-foreground px-2">or</span>
        </div>
      </div>
      <ContinueWithGoogleButton onClick={onGoogleLogin} />
    </>
  );
}
