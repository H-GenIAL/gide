import { YesNoRadioGroup } from "@/components/forms/yes-no-radiogroup";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function DescriptionSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="adresse">Adresse</Label>
        <Textarea id="address" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="designation">Désignation des Locaux Loués</Label>
        <Textarea id="designation-reason" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="destination">
          Destination des Locaux Loués et activités autorisés
        </Label>
        <Textarea id="destination" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="clause">Clause d'enseigne</Label>
        <YesNoRadioGroup name="clause" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="clause-reason">Raison de la clause</Label>
        <Textarea name="clause-reason" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="exclusivite">Exclusivité</Label>
        <YesNoRadioGroup name="exclusivite" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="non-concurrence">Non-concurrence</Label>
        <YesNoRadioGroup name="non-concurrence" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="non-concurrence-reason">
          Raison de la non-concurrence
        </Label>
        <Textarea name="non-concurrence-reason" />
      </div>
    </div>
  );
}
