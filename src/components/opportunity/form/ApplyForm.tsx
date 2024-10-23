"use client";

import { Step, type StepItem, Stepper } from "@/components/ui/stepper";
import { useAuth } from "@/context/auth";
import { CalendarDays, FolderOpen, Instagram, LogIn, StickyNote } from "lucide-react";
import BookingHistoryStep from "./BookingHistoryStep";
import FinalNoteStep from "./FinalNoteStep";
import LoginStep from "./LoginStep";
import OnboardingStep from "./OnboardingStep";
import SocialsStep from "./SocialsStep";
import { useState, useEffect } from "react";
import type { Opportunity } from "@/domain/types/opportunity";
import { checkIfUserApplied, getOpportunityById } from "@/data/database";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Footer from "@/components/Footer";
import DownloadTheAppSection from "@/components/profile/DownloadTheAppSection";

export default function ApplyForm({
  opportunityId,
}: {
  opportunityId: string;
}) {
  const {
    state: { authUser },
  } = useAuth();
  const [isApplied, setIsApplied] = useState(false);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    const isAppliedToOp = async () => {
      if (authUser === null) return;

      const isApplied = await checkIfUserApplied(opportunityId, authUser.uid);
      setIsApplied(isApplied);
    };
    isAppliedToOp();
  }, [opportunityId, authUser]);

  useEffect(() => {
    const fetchOp = async () => {
      const op = await getOpportunityById(opportunityId);
      setOpportunity(op);
    };
    fetchOp();
  }, [opportunityId]);

  const steps = [
    {
      label: "basic info",
      icon: FolderOpen,
      view: OnboardingStep,
    },
    { label: "socials", icon: Instagram, optional: true, view: SocialsStep },
    { label: "booking history", icon: CalendarDays, view: BookingHistoryStep },
    { label: "final note", icon: StickyNote, view: FinalNoteStep },
  ] satisfies (StepItem & {
    view: React.FC<{ opportunity: Opportunity }>;
  })[];

  if (authUser === null) {
    steps.unshift({ label: "sign up", icon: LogIn, view: LoginStep });
  }

  if (opportunity === null) {
    return (
      <>
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (isApplied) {
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-2xl font-bold">you have already applied to this opportunity</h1>
          <div className="px-4 py-24">
            <DownloadTheAppSection showIcon={false} />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="flex w-full flex-col justify-center gap-4 px-4">
      <Stepper orientation="horizontal" variant={"line"} initialStep={0} steps={steps}>
        {steps.map((stepProps) => {
          const View = stepProps.view;
          return (
            <Step key={stepProps.label} {...stepProps}>
              <View opportunity={opportunity} />
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
