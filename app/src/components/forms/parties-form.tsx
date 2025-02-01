import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { YesNoRadioGroup } from "@/components/forms/elements/yes-no-radiogroup";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

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
            <FormLabel>Bailleur</FormLabel>
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
            <FormLabel>Preneur</FormLabel>
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
            <FormLabel>
              Cession du droit au Bail par le Preneur d'origine
            </FormLabel>
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
            <FormLabel>Raison de la cession</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
