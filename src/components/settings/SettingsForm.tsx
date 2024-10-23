"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
// import SearchAddress from "../ui/search-address";
import { useAuth } from "@/context/auth";
import { uploadProfilePicture } from "@/data/storage";
import { genres } from "@/domain/types/genre";
import { updateOnboardedUser } from "@/domain/usecases/onboarding";
import { getInstagramHandle, getTiktokHandle, getTwitterHandle } from "@/utils/url_parsing";
import * as _ from "lodash";
import { LoadingSpinner } from "../LoadingSpinner";
import MultipleSelector from "../ui/multiple-selector";
import { useToast } from "../ui/use-toast";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const genreOptions = genres.map((genre) => ({
  label: genre.toLowerCase(),
  value: genre,
}));

const formSchema = z.object({
  profilePicture: z.custom<File>(),
  username: z.string().min(3).max(25),
  artistName: z.string().min(3).max(25),
  bio: z.string().max(1024).optional(),
  // location: z.object({
  //   placeId: z.string(),
  //   lat: z.number(),
  //   lng: z.number(),
  // }).optional(),
  twitterHandle: z.string().optional(),
  twitterFollowers: z.coerce.number().int().nonnegative(),
  instagramHandle: z.string().min(3).max(20).optional(),
  instagramFollowers: z.coerce.number().int().nonnegative(),
  tiktokHandle: z.string().min(3).max(20).optional(),
  tiktokFollowers: z.coerce.number().int().nonnegative(),
  // youtubeHandle: z.string().min(3).max(20).optional(),
  spotifyUrl: z.string().url().optional(),
  label: z.string().optional(),
  genres: z.array(optionSchema),
});

export default function SettingsForm() {
  const {
    state: { currentUser },
    dispatch,
  } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: currentUser?.username,
      artistName: currentUser?.artistName,
      bio: currentUser?.bio,
      twitterHandle: currentUser?.socialFollowing.twitterHandle ?? undefined,
      twitterFollowers: currentUser?.socialFollowing.twitterFollowers ?? 0,
      instagramHandle: currentUser?.socialFollowing.instagramHandle ?? undefined,
      instagramFollowers: currentUser?.socialFollowing.instagramFollowers ?? 0,
      tiktokHandle: currentUser?.socialFollowing.tiktokHandle ?? undefined,
      tiktokFollowers: currentUser?.socialFollowing.tiktokFollowers ?? 0,
      // youtubeHandle: currentUser?.socialFollowing.youtubeHandle ?? undefined,
      spotifyUrl: currentUser?.socialFollowing.spotifyUrl ?? undefined,
      label: currentUser?.performerInfo?.label ?? undefined,
      genres:
        currentUser?.performerInfo?.genres.map((genre) => ({
          label: genre.toLowerCase(),
          value: genre,
        })) ?? [],
    },
  });
  const { toast } = useToast();

  if (currentUser === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const profilePictureUrl = await (async () => {
        if (data.profilePicture) {
          return await uploadProfilePicture(currentUser.id, data.profilePicture);
        } else {
          return currentUser.profilePicture;
        }
      })();

      const newUserObj = _.merge(currentUser, {
        username: data.username,
        artistName: data.artistName,
        bio: data.bio,
        profilePicture: profilePictureUrl,
        socialFollowing: {
          instagramHandle: getInstagramHandle(data.instagramHandle),
          instagramFollowers: data.instagramFollowers,
          twitterHandle: getTwitterHandle(data.twitterHandle),
          twitterFollowers: data.twitterFollowers,
          tiktokHandle: getTiktokHandle(data.tiktokHandle),
          tiktokFollowers: data.tiktokFollowers,
          // youtubeHandle: data.youtubeHandle,
          spotifyUrl: data.spotifyUrl,
        },
        performerInfo: {
          genres: data.genres.map((genre) => genre.value),
          label: data.label,
        },
        // location: data.location,
      });

      await updateOnboardedUser(dispatch, newUserObj);
      toast({
        title: "success",
        description: "profile saved!",
      });
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <>
      <div className="space-y-6 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-bold">settings</h1>
              <Button type="submit">save</Button>
            </div>
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field: { onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>profile picture</FormLabel>
                  <FormControl>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <Input
                      {...fieldProps}
                      placeholder="profile picture"
                      type="file"
                      accept="image/*"
                      onChange={(event) => onChange(event.target.files && event.target.files[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="username" className="lowercase" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artistName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>performer name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="artistName" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>bio</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="bio" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="location"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>city</FormLabel>
                  <FormControl>
                    <SearchAddress onSelectLocation={
                      (location) => {
                        console.log(location);
                        if (location === null) {
                          return;
                        }

                        onChange({
                          placeId: location.id,
                          lat: location.latitude,
                          lng: location.longitude,
                        });
                      }
                    } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
            <FormField
              control={form.control}
              name="spotifyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>spotify url</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://open.spotify.com/artist/..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>label</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Interscope Records" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>genres</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      defaultOptions={genreOptions}
                      placeholder="select genres you like..."
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
}
