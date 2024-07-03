import type { Booking } from "@/domain/types/booking";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().nonempty(),
  payout: z.number().positive().optional(),
  startTime: z.date().optional(),
  venueId: z.string().nonempty(),
  location: z.object({
    placeId: z.string().nonempty(),
    lat: z.number(),
    lng: z.number(),
  }),
  flier: z.custom<File>(),
});

export default function AddBooking({
  onSubmit,
}: {
  onSubmit: (booking: Booking) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const submitForm = async (data: z.infer<typeof formSchema>) => {
    // const booking: Booking = {};
    // onSubmit?.(booking);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}></form>
      </Form>
    </>
  );
}
