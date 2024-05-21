"use client";

import { useState } from "react";
import ContinueWithGoogleButton from "@/components/login/ContinueWithGoogleButton";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/password_input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithCredentials } from "@/data/auth";

const formSchema = z.object({
  email: z.string().email({ message: "enter a valid email address" }),
  password: z.string(),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("return_url");
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);

  const onGoogleLogin = () => {
    router.push(returnUrl || "/dashboard");
  };

  const onSubmit = async (data: UserFormValue) => {
    try {
      setLoading(true);
      await loginWithCredentials(data);

      router.push(returnUrl || "/dashboard");
    } catch (err) {
      console.error(err);
      throw new Error("failed to login", { cause: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input
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
                  <PasswordInput
                    placeholder="********"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            continue with email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs lowercase">
          <span className="bg-background px-2 text-muted-foreground">
            or
          </span>
        </div>
      </div>
      <ContinueWithGoogleButton
        onClick={onGoogleLogin}
      />
    </>
  );
}
