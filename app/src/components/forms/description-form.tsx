import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { YesNoRadioGroup } from "@/components/forms/elements/yes-no-radiogroup";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { FormSearchLabel } from "./elements/form-search-label";

export const descriptionFormSchema = z.object({
  adresse: z.string().optional(),
  designation: z.string().optional(),
  destination: z.string().optional(),
  clause: z.string().optional(),
  clause_reason: z.string().optional(),
  exclusivite: z.string().optional(),
  non_concurrence: z.string().optional(),
  non_concurrence_reason: z.string().optional(),
});

export function DescriptionForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="adresse"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Adresse</FormSearchLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="designation"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Désignation des Locaux Loués
            </FormSearchLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="destination"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Destination des Locaux Loués et activités autorisés
            </FormSearchLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="clause"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Clause d'enseigne
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
        name="clause_reason"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Raison de la clause
            </FormSearchLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="exclusivite"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Exclusivité</FormSearchLabel>
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
        name="non_concurrence"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Non-concurrence</FormSearchLabel>
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
        name="non_concurrence_reason"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Raison de la non-concurrence
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
