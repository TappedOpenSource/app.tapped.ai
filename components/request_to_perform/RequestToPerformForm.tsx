"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UserTile from "@/components/UserTile";
import { useAuth } from "@/context/auth";
import { usePurchases } from "@/context/purchases";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

export default function RequestToPerformForm({ venueId }: { venueId: string }) {
  const { state: authState } = useAuth();
  const { state: subscribed } = usePurchases();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  if (authState === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        loading...
      </div>
    );
  }

  if (!subscribed) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Link href="/login">
          <Button>login</Button>
        </Link>
      </div>
    );
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  console.log({ venueId });
  const currentUser = authState.currentUser;
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold">who</h1>
          <UserTile user={currentUser} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">where</h1>
        </div>
        <div>
          <h1 className="text-2xl font-bold">genres</h1>
        </div>
        <div>
          <h1 className="text-2xl font-bold">capacity</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
