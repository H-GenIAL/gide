import { CheckIcon, ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMultiStepForm } from "@/contexts/step-form";
import {
  MultiStepFormStepProps,
  MultiStepFormStep,
} from "@/components/ui/multi-step-form";
import { TabContainer, TabPanel } from "@/components/ui/tab-navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
        <TabContainer initialTabName="Parties" className="flex-1">
          <TabPanel tabName="Parties">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="landlord">Bailleur</Label>
                <Input id="landlord" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tenant">Preneur figurant dans le Bail</Label>
                <Input id="tenant" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="cession">
                  Cession du droit au Bail par le Preneur d'origine
                </Label>
                <RadioGroup name="cession">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="r3" />
                    <Label htmlFor="r3">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="r3" />
                    <Label htmlFor="r3">Non</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabPanel>
          <TabPanel tabName="Description des locaux loués">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea id="address" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="designation">
                  Désignation des Locaux Loués
                </Label>
                <Textarea id="designation" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="destination">
                  Destination des Locaux Loués et activités autorisés
                </Label>
                <Textarea id="destination" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="clause">Clause d'enseigne</Label>
                <RadioGroup name="clause">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="r3" />
                    <Label htmlFor="r3">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="r3" />
                    <Label htmlFor="r3">Non</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="clause-reason">Raison de la clause</Label>
                <Textarea name="clause-reason" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="exclusivity">Exclusivité</Label>
                <RadioGroup name="exclusivity">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="r3" />
                    <Label htmlFor="r3">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="r3" />
                    <Label htmlFor="r3">Non</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="no-concurrence">Non-concurrence</Label>
                <RadioGroup name="no-concurrence">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="r3" />
                    <Label htmlFor="r3">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="r3" />
                    <Label htmlFor="r3">Non</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="no-concurrence-reason">
                  Raison de la non-concurrence
                </Label>
                <Textarea name="no-concurrence-reason" />
              </div>
            </div>
          </TabPanel>
          <TabPanel tabName="Durée" />
          <TabPanel tabName="Loyer" />
          <TabPanel tabName="Mesures d'accompagnement" />
          <TabPanel tabName="Garanties" />
          <TabPanel tabName="Honoraires, impots, taxes et assurance du bailleur" />
          <TabPanel tabName="Travaux - réparations - remplacements" />
          <TabPanel tabName="Autorisations de travaux" />
          <TabPanel tabName="Restitution des locaux loués" />
          <TabPanel tabName="Sous-location / Location-gerance / Domiciliation / Cession" />
          <TabPanel tabName="Droit de préemption / Droit de préférence" />
          <TabPanel tabName="Environnement" />
          <TabPanel tabName="Stipulations intuitu personae / Renonciations" />
          <TabPanel tabName="Relations avec le preneur" />
          <TabPanel tabName="Commentaires" />
          <TabPanel tabName="Documents revus" />
        </TabContainer>
      </div>
    </MultiStepFormStep>
  );
}
