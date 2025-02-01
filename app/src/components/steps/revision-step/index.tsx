import { CheckIcon, ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMultiStepForm } from "@/contexts/step-form";
import {
  MultiStepFormStepProps,
  MultiStepFormStep,
} from "@/components/ui/multi-step-form";
import { LeaseForm } from "./forms/lease/lease-form";

export function RevisionStep({ step }: MultiStepFormStepProps) {
  const { previousStep, nextStep } = useMultiStepForm();

  return (
    <MultiStepFormStep step={step} className="flex-1">
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={previousStep}>
              <ChevronLeftIcon className="size-4" />
            </Button>
            <h1 className="text-2xl font-semibold tracking-tight">Révision</h1>
          </div>
          <Button onClick={nextStep}>
            <CheckIcon className="size-4" />
            Exporter
          </Button>
        </div>
        <Separator />
        <LeaseForm />
      </div>
    </MultiStepFormStep>
  );
}
