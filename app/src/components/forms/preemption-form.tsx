import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { YesNoRadioGroup } from "./elements/yes-no-radiogroup";
import { FormSearchLabel } from "./elements/form-search-label";

export function PreemptionForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="droit_pref_b_app"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Droit de préférence du bailleur sur les appartements
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
        name="droit_pref_b_loc_loues"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Droit de préférence du bailleur sur les locaux loués
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
        name="droit_pref_b_immeuble"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Droit de préférence du bailleur sur l'immeuble
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
        name="droit_pref_p_fonds_com"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Droit de préférence du preneur sur le fonds de commerce
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
        name="annex_dta"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Annexe DTA</FormSearchLabel>
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
        name="annex_er"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Annexe ER</FormSearchLabel>
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
        name="annex_dpe"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Annexe DPE</FormSearchLabel>
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
        name="annex_envir"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Annexe environnementale
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
        name="decret_terti_applicable"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Décret tertiaire applicable
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
        name="icpe"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>ICPE</FormSearchLabel>
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
