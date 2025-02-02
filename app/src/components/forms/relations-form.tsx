import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { YesNoRadioGroup } from "./elements/yes-no-radiogroup";
import { FormSearchLabel } from "./elements/form-search-label";

export function RelationsForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="relations_impayes"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Impayés</FormSearchLabel>
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
        name="relations_ech_signif"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Échanges significatifs
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
        name="relations_precontentieux"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Précontentieux</FormSearchLabel>
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
