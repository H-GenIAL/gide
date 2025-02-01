import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { YesNoRadioGroup } from "@/components/forms/elements/yes-no-radiogroup";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

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
            <FormLabel>Adresse</FormLabel>
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
            <FormLabel>Désignation des Locaux Loués</FormLabel>
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
            <FormLabel>
              Destination des Locaux Loués et activités autorisés
            </FormLabel>
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
            <FormLabel>Clause d'enseigne</FormLabel>
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
            <FormLabel>Raison de la clause</FormLabel>
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
            <FormLabel>Exclusivité</FormLabel>
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
            <FormLabel>Non-concurrence</FormLabel>
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
            <FormLabel>Raison de la non-concurrence</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
