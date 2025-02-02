import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { YesNoRadioGroup } from "./elements/yes-no-radiogroup";
import { SimpleCheckbox } from "./elements/checkbox";
import { FormSearchLabel } from "./elements/form-search-label";

export function GuaranteesForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="depot_garantie"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Dépôt de garantie
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
        name="autres_garanties"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Autres garanties
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
        name="garantie_possess_b"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Garantie de possession du bailleur
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
        <h4 className="font-medium">Types de garantie</h4>
        <FormField
          control={form.control}
          name="garantie_cautio_soli"
          render={({ field }) => (
            <SimpleCheckbox
              label="Garantie caution solidaire"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="garantie_autonome"
          render={({ field }) => (
            <SimpleCheckbox
              label="Garantie autonome"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="garantie_autre"
          render={({ field }) => (
            <SimpleCheckbox
              label="Autre garantie"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Type de garant</h4>
        <FormField
          control={form.control}
          name="garant_societe"
          render={({ field }) => (
            <SimpleCheckbox
              label="Société"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="garant_banque"
          render={({ field }) => (
            <SimpleCheckbox
              label="Banque"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="montant"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Montant</FormSearchLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="expiration"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Date d'expiration
            </FormSearchLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="transfer_nb"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Nombre de transferts
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
