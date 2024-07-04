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

export default function ApplyButton({ op }: { op: Opportunity }) {
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

  if (isApplied) {
    return (
      <div>
        <Button disabled>
          <Check className="mr-2 h-4 w-4" />
          <span>you&apos;re applied!</span>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Link
        href={{
          pathname: "/opportunities/[opportunityId]/apply",
          query: { opportunityId: op.id },
        }}
      >
        <Button className="bg-blue-500">apply to perform</Button>
      </Link>
    </div>
  );
}
