"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import SignUpForm from "@/components/login/SignUpForm";
import { Button } from "@/components/ui/button";
import {
  type StepItem,
  Step,
  Stepper,
  useStepper,
} from "@/components/ui/stepper";
import {
  CalendarDays,
  FolderOpen,
  Instagram,
  LogIn,
  StickyNote,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function ApplyForm() {
  const steps = [
    { label: "sign up", icon: LogIn },
    {
      label: "basic info",
      icon: FolderOpen,
    },
    { label: "socials", icon: Instagram, optional: true },
    { label: "booking history", icon: CalendarDays },
    { label: "final note", icon: StickyNote },
  ] satisfies StepItem[];

  return (
    <div className="flex w-full flex-col justify-center gap-4 px-4">
      <Stepper
        orientation="horizontal"
        variant={"line"}
        initialStep={0}
        steps={steps}
      >
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                  <Suspense fallback={<LoadingSpinner />}>
                    <SignUpForm />
                  </Suspense>
                  <p className="text-muted-foreground px-8 text-center text-sm">
                    by clicking continue, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="hover:text-primary underline underline-offset-4"
                    >
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="hover:text-primary underline underline-offset-4"
                    >
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>
              </Step>
            );
          }

          return (
            <Step key={stepProps.label} {...stepProps}>
              <div className="bg-secondary text-primary my-2 flex h-40 items-center justify-center rounded-md border">
                <h1 className="text-xl">Step {index + 1}</h1>
              </div>
            </Step>
          );
        })}
        <StepperFooter />
      </Stepper>
    </div>
  );
}

const StepperFooter = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="bg-secondary text-primary my-2 flex h-40 items-center justify-center rounded-md border">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="flex w-full justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "skip" : "next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
