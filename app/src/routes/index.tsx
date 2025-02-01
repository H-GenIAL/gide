import { createFileRoute } from "@tanstack/react-router";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import { RevisionStep, UploadStep, ExportStep } from "@/components/steps";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen w-full flex-col px-10 py-20 md:px-20">
      <MultiStepForm>
        <UploadStep step={1} />
        <RevisionStep step={2} />
        <ExportStep step={3} />
      </MultiStepForm>
    </main>
  );
}
