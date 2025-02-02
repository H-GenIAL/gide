import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { YesNoRadioGroup } from "./elements/yes-no-radiogroup";
import { FormSearchLabel } from "./elements/form-search-label";

export function StipulationsForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="stipu_intuitu_personae"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Stipulation intuitu personae
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
        name="renonc_imprev"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Renonciation à l'imprévision
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
