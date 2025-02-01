import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStepNavigation } from "@/contexts/step-navigation";
import { StepProps, Step } from "@/components/ui/step-navigation";
import { FileUpload } from "@/components/ui/file-upload";

export function ImportStep({ step }: StepProps) {
  const { nextStep } = useStepNavigation();

  return (
    <Step
      step={step}
      className="flex flex-1 flex-col items-center justify-center gap-4"
    >
      <FileUpload onChange={() => {}} />
      <Button className="w-full max-w-xl" size="lg" onClick={nextStep}>
        <SparklesIcon className="size-4" />
        Générer la fiche audit
      </Button>
    </Step>
  );
}
