"use client";

import { useAuth } from "@/context/auth";
import Link from "next/link";
import { Button } from "../ui/button";
import { Opportunity } from "@/domain/types/opportunity";
import { useState, useEffect } from "react";
import { checkIfUserApplied } from "@/data/database";
import { Check } from "lucide-react";

export default function ApplyButton({ op }: { op: Opportunity }) {
  const { state: authState } = useAuth();
  const { authUser } = authState;
  const [isApplied, setIsApplied] = useState(false);
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

  const applicationDeadline = op.deadline ?? op.startTime;
  const isExpired = applicationDeadline < new Date();

  if (isExpired) {
    return (
      <div>
        <Button disabled>application deadline expired</Button>
      </div>
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
      <Link href={`/opportunity/${op.id}/apply`}>
        <Button className="bg-blue-500 font-bold text-white">apply to perform</Button>
      </Link>
    </div>
  );
}
