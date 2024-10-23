import type { Booking } from "@/domain/types/booking";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { LoadingSpinner } from "@/components/LoadingSpinner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FileUploader } from "@/components/forms/file-uploader";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { toast } from "@/components/ui/use-toast";

import { Separator } from "@/components/ui/separator";
import SearchVenueButton from "@/components/opportunity/form/SearchVenueButton";
import { SearchProvider } from "@/context/search";
import { UserModel } from "@/domain/types/user_model";
import { useState } from "react";
import UserChip from "@/components/UserChip";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/auth";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { uploadFlier } from "@/data/storage";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(1),
  payout: z.coerce.number().positive().optional(),
  startTime: z.date(),
  venue: z.custom<UserModel>().optional(),
  location: z.custom<Location>(),
  flier: z.custom<File>().optional(),
});

export default function AddBooking({
  onSubmit,
}: {
  onSubmit: (booking: Booking) => void;
}) {
  const {
    state: { authUser },
  } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [venue, setVenue] = useState<UserModel | null>(null);
  const [formattedAddress, setFormattedAddress] = useState<string | null>(null);

  const submitForm = async (data: z.infer<typeof formSchema>) => {
    if (!authUser) return;

    const uuid = uuidv4();
    const flierUrl = data.flier ? await uploadFlier(uuid, data.flier) : null;

    const booking: Booking = {
      id: uuid,
      serviceId: null,
      name: data.name,
      note: "",
      requesteeId: authUser.uid,
      requesterId: venue?.id ?? null,
      rate: data.payout ?? 0,
      startTime: data.startTime,
      endTime: new Date(data.startTime.getTime() + 60 * 60 * 1000),
      timestamp: new Date(),
      status: "confirmed",
      location: data.location,
      venueId: venue?.id ?? null,
      eventUrl: null,
      flierUrl,
      referenceEventId: null,
    };
    toast({
      title: "booking added!",
      description: "another booking successfully added to your profile",
    });
    onSubmit?.(booking);
  };

  if (!authUser) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-3">
          <FormField
            control={form.control}
            name="location"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <h3>where was it at?</h3>
                    {value !== undefined ? (
                      <div className="flex flex-row gap-2">
                        <>
                          {venue && <UserChip user={venue} />}
                          {formattedAddress && <p>{formattedAddress}</p>}
                        </>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setVenue(null);
                            setFormattedAddress(null);
                            onChange(undefined);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <SearchProvider>
                        <SearchVenueButton
                          onChange={(v) => {
                            if (v.type === "venue") {
                              setVenue(v);
                              onChange(v.location);
                            }

                            if (v.type === "location") {
                              onChange(v);
                            }
                          }}
                        />
                      </SearchProvider>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-4" />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>event name</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="60min set at Elsewhere" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field: { onChange, value } }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor="datetime">when was it?</FormLabel>
                <FormControl>
                  <DateTimePicker granularity="minute" jsDate={value} onJsDateChange={onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="payout"
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>payout (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    id="payout"
                    type="number"
                    placeholder="500"
                    onChange={(event) => onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="flier"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>event flier</FormLabel>
                <FormControl>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {value ? (
                    <>
                      <div className="relative h-32 w-32">
                        <Image
                          src={URL.createObjectURL(value)}
                          alt="event flier"
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </>
                  ) : (
                    <FileUploader
                      {...fieldProps}
                      label="click here to upload a flier"
                      onChange={(event) => onChange(event.target.files && event.target.files[0])}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-end gap-2">
            <DialogClose asChild>
              <Button type="submit">submit</Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </>
  );
}
