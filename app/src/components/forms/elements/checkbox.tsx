import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface SimpleCheckboxProps {
  onChange: (checked: string) => void;
  defaultChecked?: string;
  label: string;
}

export function SimpleCheckbox({
  defaultChecked,
  onChange,
  label,
}: SimpleCheckboxProps) {
  return (
    <FormItem className="flex items-center space-x-2">
      <FormControl>
        <Checkbox
          defaultChecked={defaultChecked === "Oui"}
          onCheckedChange={(checked) => onChange(checked ? "Oui" : "Non")}
        />
      </FormControl>
      <FormLabel>{label}</FormLabel>
    </FormItem>
  );
}
