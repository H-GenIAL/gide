import { CheckIcon, ChevronLeftIcon, Loader2Icon } from "lucide-react";
import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { TabNavigation, Tab } from "@/components/ui/tab-navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStepNavigation } from "@/contexts/step-navigation";
import { StepProps, Step } from "@/components/ui/step-navigation";
import { Form } from "@/components/ui/form";
import {
  descriptionFormSchema,
  DescriptionForm,
} from "@/components/forms/description-form";
import {
  partiesFormSchema,
  PartiesForm,
} from "@/components/forms/parties-form";

const formSchema = z.object({
  ...descriptionFormSchema.shape,
  ...partiesFormSchema.shape,
});

export function RevisionStep({ step }: StepProps) {
  const { previousStep, nextStep } = useStepNavigation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const { mutate: createDocument, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/forms/lease/export`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to export");
      }

      const base64Data = await response.text();

      // More efficient base64 to blob conversion
      const blob = new Blob(
        [Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))],
        {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      );

      return blob;
    },
    onSuccess: (data) => {
      nextStep(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    createDocument(data);
  };

  const onError = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    console.log("Form errors:", errors);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, onError)}>
        <Step step={step} className="flex-1">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={previousStep}>
                  <ChevronLeftIcon className="size-4" />
                </Button>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Révision
                </h1>
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <CheckIcon className="size-4" />
                )}
                Confirmer
              </Button>
            </div>
            <Separator />
            <TabNavigation initialTabName="Parties" className="flex-1">
              <Tab tabName="Parties">
                <PartiesForm />
              </Tab>
              <Tab tabName="Description des locaux loués">
                <DescriptionForm />
              </Tab>
              <Tab tabName="Durée" />
              <Tab tabName="Loyer" />
              <Tab tabName="Mesures d'accompagnement" />
              <Tab tabName="Garanties" />
              <Tab tabName="Honoraires, impots, taxes et assurance du bailleur" />
              <Tab tabName="Travaux - réparations - remplacements" />
              <Tab tabName="Autorisations de travaux" />
              <Tab tabName="Restitution des locaux loués" />
              <Tab tabName="Sous-location / Location-gerance / Domiciliation / Cession" />
              <Tab tabName="Droit de préemption / Droit de préférence" />
              <Tab tabName="Environnement" />
              <Tab tabName="Stipulations intuitu personae / Renonciations" />
              <Tab tabName="Relations avec le preneur" />
              <Tab tabName="Commentaires" />
              <Tab tabName="Documents revus" />
            </TabNavigation>
          </div>
        </Step>
      </form>
    </Form>
  );
}
