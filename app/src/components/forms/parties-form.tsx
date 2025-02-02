import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { YesNoRadioGroup } from "@/components/forms/elements/yes-no-radiogroup";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { FormSearchLabel } from "./elements/form-search-label";

export const partiesFormSchema = z.object({
  bailleur: z.string().optional(),
  preneur: z.string().optional(),
  cession: z.string().optional(),
  cession_reason: z.string().optional(),
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
            <FormSearchLabel name={field.name}>
              Cession du droit au Bail par le Preneur d'origine
            </FormSearchLabel>
            <FormControl>
              <YesNoRadioGroup
                defaultValue={field.value}
                onChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cession_reason"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Raison de la cession
            </FormSearchLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
