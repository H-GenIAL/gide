import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { YesNoRadioGroup } from "./elements/yes-no-radiogroup";
import { SimpleCheckbox } from "./elements/checkbox";
import { FormSearchLabel } from "./elements/form-search-label";

export function RentForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Mode de calcul</h4>
        <FormField
          control={form.control}
          name="mode_calc_fixe"
          render={({ field }) => (
            <SimpleCheckbox
              label="Fixe"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="mode_calc_paliers"
          render={({ field }) => (
            <SimpleCheckbox
              label="Paliers"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="mode_calc_recette"
          render={({ field }) => (
            <SimpleCheckbox
              label="Recette"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="loyer_annuel_init"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Loyer annuel initial
            </FormSearchLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="loyer_annuel_cours"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Loyer annuel en cours
            </FormSearchLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="paiement_trim_av"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Paiement trimestriel d'avance
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
        name="tva"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>TVA</FormSearchLabel>
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
        name="clause_index"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Clause d'indexation
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
        name="date_index"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Date d'indexation
            </FormSearchLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="period_index"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Périodicité d'indexation
            </FormSearchLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="indice_insee"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Indice INSEE</FormSearchLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="premiere_index"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Première indexation
            </FormSearchLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="index_suivantes"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Indexations suivantes
            </FormSearchLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="indice_comparaison"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Indice de comparaison
            </FormSearchLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Options d'indexation</h4>
        <FormField
          control={form.control}
          name="indice_base_fixe"
          render={({ field }) => (
            <SimpleCheckbox
              label="Indice de base fixe"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="index_hausse_uniqmt"
          render={({ field }) => (
            <SimpleCheckbox
              label="Indexation à la hausse uniquement"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="plafond_plancher"
          render={({ field }) => (
            <SimpleCheckbox
              label="Plafond/Plancher"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="risque_distorsion"
          render={({ field }) => (
            <SimpleCheckbox
              label="Risque de distorsion"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="divisibilite_clause_index"
          render={({ field }) => (
            <SimpleCheckbox
              label="Divisibilité de la clause d'indexation"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="augment_comp_dern_loyer"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Augmentation complémentaire dernier loyer
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
        name="clause_loyer_bail_renouv"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Clause loyer bail renouvellement
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
