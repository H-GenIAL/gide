import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { YesNoRadioGroup } from "./elements/yes-no-radiogroup";
import { FormSearchLabel } from "./elements/form-search-label";

export function DestructionForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="derog_1722"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Dérogation à l'article 1722
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
        name="facu_modif"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Faculté de modification
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
        name="facu_trav"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Faculté de travaux
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
        name="facu_p_trav"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Faculté de travaux du preneur
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
        name="facu_p_plaques"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Faculté de plaques du preneur
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
