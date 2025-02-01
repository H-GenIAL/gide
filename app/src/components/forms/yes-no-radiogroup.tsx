import { RadioGroup } from "@radix-ui/react-radio-group";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

export function YesNoRadioGroup({ name }: { name: string }) {
  return (
    <RadioGroup name={name} className="flex items-center space-x-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="true" id="r3" />
        <Label htmlFor="r3">Oui</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="false" id="r3" />
        <Label htmlFor="r3">Non</Label>
      </div>
    </RadioGroup>
  );
}
