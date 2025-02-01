import { createFileRoute } from "@tanstack/react-router";
import { StepNavigation } from "@/components/ui/step-navigation";
import { RevisionStep, ImportStep, ExportStep } from "@/components/steps";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen w-full flex-col px-10 py-20 md:px-20">
      <StepNavigation>
        <ImportStep step={1} />
        <RevisionStep step={2} />
        <ExportStep step={3} />
      </StepNavigation>
    </main>
  );
}
