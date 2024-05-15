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
import MultipleSelector from "@/components/ui/multiple-selector";
import SearchAddress from "@/components/ui/search-address";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/context/auth";
import { usePurchases } from "@/context/purchases";
import { genres } from "@/domain/types/genre";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingSpinner } from "../LoadingSpinner";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const defaultCapacity = 500;
const formSchema = z.object({
  genres: z.array(optionSchema).nonempty(),
  capacity: z.number().min(50).max(1000),
  location: z.object({
    placeId: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
});

const genreOptions = genres.map((genre) => ({
  label: genre.toLowerCase(),
  value: genre,
}));

export default function VenueSearchForm() {
  const { state: authState } = useAuth();
  const { state: subscribed } = usePurchases();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genres: [],
      capacity: defaultCapacity,
    },
  });

  if (authState === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
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

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <h1 className="text-3xl font-bold">find the right venues</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="location"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>where</FormLabel>
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
            <FormField
              control={form.control}
              name="capacity"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>capacity</FormLabel>
                  <FormControl>
                    <Slider
                      onValueChange={(value) => onChange(value[0])}
                      defaultValue={[defaultCapacity]}
                      id="capacity"
                      max={1000}
                      min={50}
                      step={10}
                    />
                  </FormControl>
                  <FormDescription>
                    max capacity of{" "}
                    {form.watch("capacity") === 1000 ?
                      "1000+" :
                      form.watch("capacity")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              search
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
