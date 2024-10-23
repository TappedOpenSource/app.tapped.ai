import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useState } from "react";
import { createOrUpdateUser } from "@/data/database";
import { idFromSpotifyUrl } from "@/utils/spotify";

const formSchema = z.object({
  instagramHandle: z.string().min(3).max(20).optional(),
  instagramFollowers: z.coerce.number().int().nonnegative(),
  twitterHandle: z.string().min(3).max(20).optional(),
  twitterFollowers: z.coerce.number().int().nonnegative(),
  tiktokHandle: z.string().min(3).max(20).optional(),
  tiktokFollowers: z.coerce.number().int().nonnegative(),
  spotifyUrl: z.string().url().optional(),
  soundcloudHandle: z.string().min(3).max(20).optional(),
});

export default function SocialsStep() {
  const {
    state: { authUser, currentUser },
  } = useAuth();
  const instagramHandle = currentUser?.socialFollowing?.instagramHandle;
  const instagramFollowers = currentUser?.socialFollowing?.instagramFollowers;
  const twitterHandle = currentUser?.socialFollowing?.twitterHandle;
  const twitterFollowers = currentUser?.socialFollowing?.twitterFollowers;
  const tiktokHandle = currentUser?.socialFollowing?.tiktokHandle;
  const tiktokFollowers = currentUser?.socialFollowing?.tiktokFollowers;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instagramHandle: instagramHandle ?? undefined,
      twitterHandle: twitterHandle ?? undefined,
      tiktokHandle: tiktokHandle ?? undefined,
      twitterFollowers: twitterFollowers ?? undefined,
      instagramFollowers: instagramFollowers ?? undefined,
      tiktokFollowers: tiktokFollowers ?? undefined,
    },
  });
  const { nextStep, prevStep, isDisabledStep } = useStepper();
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (authUser === null) return;

    setLoading(true);

    const {
      instagramHandle,
      instagramFollowers,
      twitterHandle,
      twitterFollowers,
      tiktokHandle,
      tiktokFollowers,
      spotifyUrl,
      soundcloudHandle,
    } = data;

    const spotifyId = spotifyUrl ? idFromSpotifyUrl(spotifyUrl) : null;
    await createOrUpdateUser(authUser.uid, {
      socialFollowing: {
        instagramHandle: instagramHandle ?? null,
        instagramFollowers: instagramFollowers ?? 0,
        twitterHandle: twitterHandle ?? null,
        twitterFollowers: twitterFollowers ?? 0,
        tiktokHandle: tiktokHandle ?? null,
        tiktokFollowers: tiktokFollowers ?? 0,
        spotifyUrl: spotifyUrl ?? null,
        soundcloudHandle: soundcloudHandle ?? null,
      },
      performerInfo: {
        spotifyId,
      },
    });

    setLoading(false);
    nextStep();
  };

  return (
    <>
      <div className="mx-auto max-w-md space-y-6 py-12">
        <div className="space-y-2 text-start">
          <h1 className="text-3xl font-bold">socials</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="spotifyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>spotify URL</FormLabel>
                  <FormControl>
                    <Input id="spotifyUrl" placeholder="https://open.spotify.com/artist/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="soundcloudHandle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>soundcloud handle</FormLabel>
                  <FormControl>
                    <Input id="soundcloudHandle" placeholder="jonaylor89" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              // eslint-disable-next-line indent
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
            <div className="flex w-full flex-row gap-2">
              <Button disabled={isDisabledStep} onClick={prevStep} size="sm" variant="secondary" className="w-full">
                prev
              </Button>
              <Button size="sm" type="submit" className="w-full">
                next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
