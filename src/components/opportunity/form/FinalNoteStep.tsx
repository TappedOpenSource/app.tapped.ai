import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper";
import type { Opportunity } from "@/domain/types/opportunity";
import type { UserModel } from "@/domain/types/user_model";
import { useRouter } from "next/navigation";
import UserChip from "@/components/UserChip";
import { useState, useEffect } from "react";
import { getUserById } from "@/data/database";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { guardedApplyForOpportunity } from "@/domain/usecases/opportunities";
import { useAuth } from "@/context/auth";
import { usePurchases } from "@/context/purchases";

const formSchema = z.object({
  note: z.string().min(3).max(256),
});

export default function FinalNoteStep({
  opportunity,
}: {
  opportunity: Opportunity;
}) {
  const {
    state: { authUser },
  } = useAuth();
  const { state: subscribed } = usePurchases();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();
  const { prevStep, isDisabledStep, isLastStep } = useStepper();
  const [loading, setLoading] = useState(false);
  const [requester, setRequester] = useState<UserModel | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(opportunity.userId);
      setRequester(user ?? null);
    };
    fetchUser();
  }, [opportunity]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!authUser) return;

    const { note } = data;

    setLoading(true);
    try {
      await guardedApplyForOpportunity({
        opportunityId: opportunity.id,
        userId: authUser.uid,
        isPremium: subscribed ?? false,
        userComment: note ?? "",
      });
      router.push(`/opportunity/${opportunity.id}/confirmation`);
    } catch (e) {
      console.error("error applying for opportunity", e);
      toast({
        title: "you've run out of opportunities to apply for",
        description: "join tapped premium to get unlimited gig opportunities",
      });

      router.push(`/premium?return_url=/opportunities/${opportunity.id}/apply`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto w-2/3 space-y-6 py-12">
        {requester && <UserChip user={requester} />}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>additional info for the booker</FormLabel>
                  <FormControl>
                    <Textarea placeholder="add a note for the booker..." className="resize-none" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-center gap-2">
              <Button disabled={isDisabledStep} onClick={prevStep} size="sm" variant="secondary">
                prev
              </Button>
              {loading ? (
                <Button disabled variant="outline" size="icon" type="button">
                  <LoadingSpinner />
                </Button>
              ) : (
                <Button size="sm" type="submit">
                  {isLastStep ? "finish and apply" : "next"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
