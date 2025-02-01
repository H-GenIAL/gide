import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMultiStepForm } from "@/contexts/step-form";
import {
  MultiStepFormStepProps,
  MultiStepFormStep,
} from "@/components/ui/multi-step-form";

export function UploadStep({ step }: MultiStepFormStepProps) {
  const { nextStep } = useMultiStepForm();

  return (
    <MultiStepFormStep
      step={step}
      className="flex flex-1 items-center justify-center"
    >
      <Button onClick={nextStep}>
        <CheckIcon className="size-4" />
        Valider
      </Button>
    </MultiStepFormStep>
  );
}
