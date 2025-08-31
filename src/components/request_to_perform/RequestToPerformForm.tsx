"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import UserAvatarList from "@/components/UserAvatarList";
import type { UserModel } from "@/domain/types/user_model";
import { getUserById } from "@/data/database";
import { useAuth } from "@/context/auth";
import { usePurchases } from "@/context/purchases";
import { useRouter } from "next/navigation";
import { requestToPerform } from "@/domain/usecases/request_to_perform";
import { RequestLoginPage } from "../login/RequireLogin";

const formSchema = z.object({
  note: z.string().min(1).max(512),
});

export default function RequestToPerformForm({
  venueIds,
}: {
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
      const venues = (
        await Promise.all(
          venueIds.map(async (id) => {
            return getUserById(id);
          }),
        )
      ).filter((v) => v !== null) as UserModel[];

      setVenues(venues);
    };
    fetchVenues();
  }, [venueIds]);

  const onSubmit = async (data) => {
    const note = data.note;
    if (venues.length === 0) {
      return;
    }

    const { currentUser } = authState;
    if (currentUser === null) {
      return;
    }

    setLoading(true);
    try {
      await requestToPerform(currentUser, venues, note);
      //   nav.push(RequestToPerformConfirmationPage(venues: _venues));
      router.push("/venue_outreach/request_to_perform_confirmation");
    } catch (e) {
      console.error("error sending the request", { cause: e });

      // show toast of error?
    } finally {
      setLoading(false);
    }
  };

  if (authState === null) {
    return <RequestLoginPage />;
  }

  if (!subscribed) {
    router.push("/billing");
  }

  return (
    <>
      <div className="space-y-6 p-6">
        <UserAvatarList users={venues} />
        <h1 className="text-3xl font-bold">send them a note</h1>
        <h3 className="text-md text-gray-400">
          we&apos;ll be taking your note as well as info from your profile, rewording it all with ChatGPT to make it
          sound as appealing to the promoter/venue owner as possible, and sending it to the venues you selected.
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="note"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>note</FormLabel>
                  <FormControl>
                    <Textarea {...onChange} placeholder="i've got an idea for a show..." rows={4} />
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
