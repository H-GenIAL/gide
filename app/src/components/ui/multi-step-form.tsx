import React, { ReactElement, useState } from "react";
import { CheckIcon } from "lucide-react";
import { StepFormContext } from "@/contexts/step-form";
import { cn } from "@/lib/utils";

interface MultiStepFormProps {
  children: React.ReactNode;
}

export function MultiStepForm({ children }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Validate that all children are MultiStepFormStep components
  const stepsComponents = React.Children.toArray(children).filter(
    (child): child is ReactElement<MultiStepFormStepProps> => {
      if (React.isValidElement(child) && child.props.step) {
        return true;
      }
      console.warn(
        "MultiStepForm component only accepts MultiStepFormStep components as children",
      );
      return false;
    },
  );

  const ActiveStepComponent = stepsComponents.find(
    (step) => step.props.step === currentStep,
  );

  return (
    <StepFormContext.Provider
      value={{
        steps: stepsComponents.length,
        currentStep,
        nextStep,
        previousStep,
      }}
    >
      <MultiStepProgressBar
        steps={stepsComponents.length}
        currentStep={currentStep}
      />
      {ActiveStepComponent}
    </StepFormContext.Provider>
  );
}

interface MultiStepProgressBarProps {
  steps: number;
  currentStep: number;
  className?: string;
}

function MultiStepProgressBar({
  steps,
  currentStep,
  className,
}: MultiStepProgressBarProps) {
  return (
    <div
      className={cn(
        "mx-auto mb-8 flex w-full max-w-xl items-center justify-center",
        className,
      )}
    >
      {Array.from({ length: steps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full text-lg transition-colors",
              i + 1 <= currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
            aria-current={i + 1 === currentStep ? "step" : undefined}
          >
            {i + 1 < currentStep ? <CheckIcon className="size-4" /> : i + 1}
          </div>
          {i < steps - 1 && (
            <div
              className={cn(
                "mx-2 h-[2px] w-16 transition-colors",
                i + 1 < currentStep ? "bg-primary" : "bg-muted",
              )}
              role="presentation"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export interface MultiStepFormStepProps {
  step: number;
  children?: React.ReactNode;
  className?: string;
}

export function MultiStepFormStep({
  children,
  className,
}: MultiStepFormStepProps) {
  return <div className={className}>{children}</div>;
}

MultiStepFormStep.displayName = "MultiStepFormStep";
