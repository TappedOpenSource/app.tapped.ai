"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Step,
  type StepItem,
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
import LoginStep from "./LoginStep";

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
                <LoginStep />
              </Step>
            );
          }

          // if (index === 1) {
          //   return (
          //     <Step key={stepProps.label} {...stepProps}>
          //       <OnboardingStep />
          //     </Step>
          //   );
          // }

          // if (index === 2) {
          //   return (
          //     <Step key={stepProps.label} {...stepProps}>
          //       <SocialsStep />
          //     </Step>
          //   );
          // }

          // if (index === 3) {
          //   return (
          //     <Step key={stepProps.label} {...stepProps}>
          //       <BookingHistoryStep />
          //     </Step>
          //   );
          // }

          // if (index === 4) {
          //   return (
          //     <Step key={stepProps.label} {...stepProps}>
          //       <FinalNoteStep />
          //     </Step>
          //   );
          // }

          return (
            <Step key={stepProps.label} {...stepProps}>
              <div className="flex h-40 items-center justify-center rounded-md border">
                <LoadingSpinner />
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
          <h1 className="text-xl">Woohoo! all steps completed! 🎉</h1>
        </div>
      )}
      <div className="flex w-full justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            reset
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
              {isLastStep ? "finish" : isOptionalStep ? "skip" : "next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
