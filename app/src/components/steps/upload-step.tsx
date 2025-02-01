import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMultiStepForm } from "@/contexts/step-form";
import {
  MultiStepFormStepProps,
  MultiStepFormStep,
} from "@/components/ui/multi-step-form";
import { FileUpload } from "@/components/ui/file-upload";

export function UploadStep({ step }: MultiStepFormStepProps) {
  const { nextStep } = useMultiStepForm();

  return (
    <MultiStepFormStep
      step={step}
      className="flex flex-1 flex-col items-center justify-center gap-4"
    >
      <FileUpload onChange={() => {}} />
      <Button className="w-full max-w-xl" onClick={nextStep}>
        <SparklesIcon className="size-4" />
        Générer la fiche audit
      </Button>
    </MultiStepFormStep>
  );
}
