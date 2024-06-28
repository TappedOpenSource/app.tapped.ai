"use client";

import { useAuth } from "@/context/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Opportunity } from "@/domain/types/opportunity";
import { useState, useEffect } from "react";
import { checkIfUserApplied } from "@/data/database";
import { Check } from "lucide-react";
import { LoadingSpinner } from "../LoadingSpinner";
import { useToast } from "../ui/use-toast";
import { guardedApplyForOpportunity } from "@/domain/usecases/opportunities";
import { usePurchases } from "@/context/purchases";

export default function ApplyButton({ op }: {
    op: Opportunity;
}) {
  const { state: authState } = useAuth();
  const { authUser } = authState;
  const { state: subscribed } = usePurchases();
  const router = useRouter();
  const pathname = usePathname();
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (!authUser) {
      return;
    }

    const checkIfApplied = async () => {
      const isApplied = await checkIfUserApplied(op.id, authUser.uid);
      setIsApplied(isApplied);
    };
    checkIfApplied();
  }, [authUser, op.id]);

  if (loading) {
    return (
      <Button size="icon">
        <LoadingSpinner />
      </Button>
    );
  }

  if (!authUser) {
    return (
      <div>
        <Link href={`/signup?return_url=${pathname}`}>
          <Button className="bg-blue-500">
            apply to perform
          </Button>
        </Link>
      </div>
    );
  }


  if (authUser.uid) {
    <div>
      <Link href={`/opportunity/${op.id}/applicants`}>
        <Button aria-label="add">
            see who&apos;s applied
        </Button>
      </Link>
    </div>;
  }

  if (isApplied) {
    return (
      <div>
        <Button disabled>
          <Check className="h-4 w-4 mr-2" />
          <span>you&apos;re applied!</span>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button
        className="bg-blue-500"
        onClick={async () => {
          setLoading(true);
          try {
            await guardedApplyForOpportunity({
              opportunityId: op.id,
              userId: authUser.uid,
              isPremium: subscribed ?? false,
            });
            setIsApplied(true);
            toast({
              title: "application submitted!",
              description: "this is a huge step in your career. the booker will be in touch if you're selected",
            });
          } catch (e) {
            console.error("error applying for opportunity", e);
            toast({
              title: "you've run out of opportunities to apply for",
              description: "join tapped premium to get unlimited gig opportunities",
            });

            router.push(
              `/premium?return_url=/opportunities/${op.id}`
            );
          } finally {
            setLoading(false);
          }
        }}
      >
            apply to perform
      </Button>
    </div>
  );
}
