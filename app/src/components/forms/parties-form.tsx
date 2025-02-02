import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { YesNoRadioGroup } from "@/components/forms/elements/yes-no-radiogroup";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { FormSearchLabel } from "./elements/form-search-label";

export const partiesFormSchema = z.object({
  bailleur: z.string().optional(),
  preneur: z.string().optional(),
  cession: z.string().optional(),
});

export function PartiesForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="bailleur"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Bailleur</FormSearchLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="preneur"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Preneur</FormSearchLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cession"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Cession</FormSearchLabel>
            <FormControl>
              <YesNoRadioGroup
                defaultValue={field.value}
                onChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
