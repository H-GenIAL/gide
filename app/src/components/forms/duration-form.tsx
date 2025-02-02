import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { YesNoRadioGroup } from "./elements/yes-no-radiogroup";
import { FormSearchLabel } from "./elements/form-search-label";

export function DurationForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="date_sign"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Date de signature
            </FormSearchLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pinel"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Pinel</FormSearchLabel>
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
        name="date_prise_effet"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Date de prise d'effet
            </FormSearchLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="duree_bail"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Durée du bail</FormSearchLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="terme_contrat_bail"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Terme du contrat de bail
            </FormSearchLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="periode_ferme"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Période ferme</FormSearchLabel>
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
        name="pro_fac_sortie"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Prochaine faculté de sortie
            </FormSearchLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preavis_min"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Préavis minimum</FormSearchLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="clause_spe_duree_bail_renouv"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>
              Clause spécifique durée bail renouvellement
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
