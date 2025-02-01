import { createContext, useContext } from "react";

interface StepFormContextType {
  steps: number;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
}

export const StepFormContext = createContext<StepFormContextType>({
  steps: 1,
  currentStep: 1,
  nextStep: () => {},
  previousStep: () => {},
});

export function useMultiStepForm() {
  return useContext(StepFormContext);
}
