import { SparklesIcon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useStepNavigation } from "@/contexts/step-navigation";
import { StepProps, Step } from "@/components/ui/step-navigation";
import { FileUpload } from "@/components/ui/file-upload";

export function ImportStep({ step }: StepProps) {
  const { nextStep } = useStepNavigation();
  const [files, setFiles] = useState<File[]>([]);

  // const generateData = useMutation({
  //   mutationFn: (file: File) => {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     return fetch(`${import.meta.env.VITE_API_URL}/forms/lease/generate`, {
  //       method: "POST",
  //       body: formData,
  //     });
  //   },
  //   onSuccess: (data) => {
  //     nextStep(data);
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   },
  // });

  const handleFileChange = (files: File[]) => {
    setFiles(files);
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    if (file.type === "application/pdf") {
      // Send the file to the server, and get the data back in the mutation
      // generateData.mutate(file);
      const response = await fetch("/example_data.json", {
        method: "GET",
      });
      const data = await response.json();
      nextStep(data);
    } else if (file.type === "application/json") {
      // Parse the file and pass it to the next step
      const json = await file.text();
      const data = JSON.parse(json);
      nextStep(data);
    }
  };

  return (
    <Step
      step={step}
      className="flex flex-1 flex-col items-center justify-center gap-4"
    >
      <FileUpload
        maxFiles={1}
        mimeTypes={["application/pdf", "application/json"]}
        onChange={handleFileChange}
      />
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
