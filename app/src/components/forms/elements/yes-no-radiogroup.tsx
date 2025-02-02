import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

interface YesNoRadioGroupProps {
  onChange: (value: string) => void;
  defaultValue: string;
}

export function YesNoRadioGroup({
  defaultValue,
  onChange,
}: YesNoRadioGroupProps) {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      onValueChange={onChange}
      className="flex gap-4"
    >
      <FormItem className="flex items-center space-x-2">
        <FormControl>
          <RadioGroupItem value="Oui" />
        </FormControl>
        <FormLabel>Oui</FormLabel>
      </FormItem>
      <FormItem className="flex items-center space-x-2">
        <FormControl>
          <RadioGroupItem value="Non" />
        </FormControl>
        <FormLabel>Non</FormLabel>
      </FormItem>
    </RadioGroup>
  );
}
