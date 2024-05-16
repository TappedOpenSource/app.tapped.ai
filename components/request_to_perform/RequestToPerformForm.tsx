"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import UserAvatarList from "@/components/UserAvatarList";
import type { UserModel } from "@/domain/types/user_model";
import { getUserById } from "@/data/database";
import { useAuth } from "@/context/auth";
import { usePurchases } from "@/context/purchases";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { requestToPerform } from "@/domain/usecases/request_to_perform";

const formSchema = z.object({
  note: z.string().min(1).max(512),
});

export default function RequestToPerformForm({ venueIds }: {
    venueIds: string[];
}) {
  const { state: authState } = useAuth();
  const { state: subscribed } = usePurchases();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });
  const [venues, setVenues] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      const venues = (await Promise.all(
        venueIds.map(async (id) => {
          return getUserById(id);
        })
      )).filter((v) => v !== null) as UserModel[];

      setVenues(venues);
    };
    fetchVenues();
  }, [venueIds]);

  const onSubmit = async (data) => {
    console.log({ data });

    const note = data.note;
    if (venues.length === 0) {
      return;
    }

    if (authState === null) {
      return;
    }

    const { currentUser } = authState;

    setLoading(true);
    try {
      await requestToPerform(currentUser, venues, note);
      //   nav.push(RequestToPerformConfirmationPage(venues: _venues));
      router.push("/request_to_perform_confirmation");
    } catch (e) {
      console.error(
        "error sending the request", { cause: e }
      );

      // show toast of error?
    } finally {
      setLoading(false);
    }
  };

  if (authState === null) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>please log in to send a request</p>
        <Link href="/login">
          <Button>login</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <UserAvatarList users={venues} />
        <h1 className="text-3xl font-bold">send them a note</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="note"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>note</FormLabel>
                  <FormControl>
                    <Textarea
                      {...onChange}
                      placeholder="i've got an idea for a show..."
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              send
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
