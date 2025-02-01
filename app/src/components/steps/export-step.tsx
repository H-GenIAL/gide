import { Button } from "@/components/ui/button";
import { Step, StepProps } from "@/components/ui/step-navigation";
import { useStepNavigation } from "@/contexts/step-navigation";

export function ExportStep({ step }: StepProps) {
  const { data } = useStepNavigation();

  const handleDownload = async () => {
    if (!data) {
      return;
    }

    const blob = new Blob([data as Blob], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.docx";
    a.click();
  };

  return (
    <Step step={step} className="flex flex-1 items-center justify-center">
      <Button onClick={handleDownload}>Télécharger</Button>
    </Step>
  );
}
