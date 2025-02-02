import { createContext, useContext } from "react";

interface StepNavigationContextType {
  steps: number;
  currentStep: number;
  nextStep: (data?: unknown) => void;
  previousStep: (data?: unknown) => void;
  data: unknown;
}

export const StepNavigationContext = createContext<StepNavigationContextType>({
  steps: 1,
  currentStep: 1,
  nextStep: () => {},
  previousStep: () => {},
  data: null,
});

export function useStepNavigation() {
  const context = useContext(StepNavigationContext);

  if (!context) {
    throw new Error(
      "useStepNavigation must be used within a StepNavigationProvider",
    );
  }

  return context;
}
