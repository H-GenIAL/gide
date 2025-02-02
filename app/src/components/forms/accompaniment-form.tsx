import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { YesNoRadioGroup } from "./elements/yes-no-radiogroup";
import { FormSearchLabel } from "./elements/form-search-label";

export function AccompanimentForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="franchise_reduct_loyer"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Franchise/Réduction de loyer
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
        name="side_letter_tva"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Side letter TVA</FormSearchLabel>
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
        name="autres_mesures_accomp"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Autres mesures d'accompagnement
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
    </div>
  );
}
