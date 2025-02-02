import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { YesNoRadioGroup } from "./elements/yes-no-radiogroup";
import { SimpleCheckbox } from "./elements/checkbox";
import { FormSearchLabel } from "./elements/form-search-label";

export function PremisesRestitutionForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h4 className="font-medium">État des locaux</h4>
        <FormField
          control={form.control}
          name="etat_neuf"
          render={({ field }) => (
            <SimpleCheckbox
              label="Neuf"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="etat_parfait"
          render={({ field }) => (
            <SimpleCheckbox
              label="Parfait état"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="etat_bon"
          render={({ field }) => (
            <SimpleCheckbox
              label="Bon état"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="etat_usage"
          render={({ field }) => (
            <SimpleCheckbox
              label="État d'usage"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="clause_accession"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Clause d'accession
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
        name="facu_b_remise_etat"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Faculté de remise en état du bailleur
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
        name="indemn_immo"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Indemnité d'immobilisation
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
        name="edl_entree_dataroom"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              État des lieux d'entrée dans la dataroom
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
