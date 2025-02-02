import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { YesNoRadioGroup } from "./elements/yes-no-radiogroup";
import { SimpleCheckbox } from "./elements/checkbox";
import { FormSearchLabel } from "./elements/form-search-label";

export function SubleaseForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="facu_sousloc"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Faculté de sous-location
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
        name="facu_loca_gerance"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Faculté de location-gérance
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
        name="facu_domic"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Faculté de domiciliation
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
        name="facu_cess_droit_bail"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Faculté de cession du droit au bail
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
        name="facu_cess_fonds_com"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Faculté de cession du fonds de commerce
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
        name="locaux_indiv"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Locaux indivis</FormSearchLabel>
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
        name="garanties_cession"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Garanties de cession
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

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Garanties de cession</h4>
        <FormField
          control={form.control}
          name="gar_cess_enti_prem"
          render={({ field }) => (
            <SimpleCheckbox
              label="Entité première"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="gar_cess_enti_successifs"
          render={({ field }) => (
            <SimpleCheckbox
              label="Entités successives"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="gar_cess_dur_stip_3y"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Durée stipulée 3 ans
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
        name="gar_cess_cessionnaire"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Cessionnaire</FormSearchLabel>
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
