import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { YesNoRadioGroup } from "@/components/forms/yes-no-radiogroup";

export function PartiesSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="bailleur">Bailleur</Label>
        <Input id="bailleur" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="preneur">Preneur</Label>
        <Input id="preneur" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="cession">
          Cession du droit au Bail par le Preneur d'origine
        </Label>
        <YesNoRadioGroup name="cession" />
        <Label htmlFor="cession-reason">Raison de la cession</Label>
        <Textarea id="cession-reason" />
      </div>
    </div>
  );
}
