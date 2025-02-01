import { Button } from "@/components/ui/button";
import {
  MultiStepFormStepProps,
  MultiStepFormStep,
} from "@/components/ui/multi-step-form";

export function ExportStep({ step }: MultiStepFormStepProps) {
  return (
    <MultiStepFormStep
      step={step}
      className="flex flex-1 items-center justify-center"
    >
      <Button>Exporter</Button>
    </MultiStepFormStep>
  );
}
