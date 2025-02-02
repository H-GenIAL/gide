import { SparklesIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStepNavigation } from "@/contexts/step-navigation";
import { StepProps, Step } from "@/components/ui/step-navigation";
import { FileUpload } from "@/components/ui/file-upload";

export function ImportStep({ step }: StepProps) {
  const { nextStep } = useStepNavigation();
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (files: File[]) => {
    setFiles(files);
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    // Load file data as JSON
    const data = await file.text();
    const json = JSON.parse(data);
    nextStep(json);
  };

  return (
    <Step
      step={step}
      className="flex flex-1 flex-col items-center justify-center gap-4"
    >
      <FileUpload maxFiles={1} onChange={handleFileChange} />
      <Button
        className="w-full max-w-xl"
        onClick={handleSubmit}
        disabled={files.length === 0}
      >
        <SparklesIcon className="size-4" />
        Générer la fiche audit
      </Button>
    </Step>
  );
}
