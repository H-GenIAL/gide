import React, { ReactElement, useState } from "react";
import { CheckIcon } from "lucide-react";
import { StepNavigationContext } from "@/contexts/step-navigation";
import { cn } from "@/lib/utils";

interface StepNavigationProps {
  children: React.ReactNode;
}

export function StepNavigation({ children }: StepNavigationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<unknown>(null);

  const nextStep = (data: unknown) => {
    setData(data);
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Validate that all children are MultiStepSection components
  const stepsComponents = React.Children.toArray(children).filter(
    (child): child is ReactElement<StepProps> => {
      if (React.isValidElement(child) && child.props.step) {
        return true;
      }
      console.warn(
        "StepNavigation component only accepts Step components as children",
      );
      return false;
    },
  );

  const ActiveStepComponent = stepsComponents.find(
    (step) => step.props.step === currentStep,
  );

  return (
    <StepNavigationContext.Provider
      value={{
        steps: stepsComponents.length,
        currentStep,
        nextStep,
        previousStep,
        data,
      }}
    >
      <StepNavigationProgress
        steps={stepsComponents.length}
        currentStep={currentStep}
      />
      {ActiveStepComponent}
    </StepNavigationContext.Provider>
  );
}

interface StepNavigationProgressProps {
  steps: number;
  currentStep: number;
  className?: string;
}

function StepNavigationProgress({
  steps,
  currentStep,
  className,
}: StepNavigationProgressProps) {
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

export interface StepProps {
  step: number;
  children?: React.ReactNode;
  className?: string;
}

export function Step({ children, className }: StepProps) {
  return <div className={className}>{children}</div>;
}

Step.displayName = "Step";
