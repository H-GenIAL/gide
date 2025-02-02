import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { SimpleCheckbox } from "./elements/checkbox";

export function FeesTaxesForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Parties privatives bailleur</h4>
        <FormField
          control={form.control}
          name="ppb_impots"
          render={({ field }) => (
            <SimpleCheckbox
              label="Impôts"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="ppb_taxe_fonc"
          render={({ field }) => (
            <SimpleCheckbox
              label="Taxe foncière"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="ppb_teom"
          render={({ field }) => (
            <SimpleCheckbox
              label="TEOM"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="ppb_loc_comm"
          render={({ field }) => (
            <SimpleCheckbox
              label="Locaux commerciaux"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Parties privatives preneur</h4>
        <FormField
          control={form.control}
          name="ppp_impots"
          render={({ field }) => (
            <SimpleCheckbox
              label="Impôts"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="ppp_taxe_fonc"
          render={({ field }) => (
            <SimpleCheckbox
              label="Taxe foncière"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="ppp_teom"
          render={({ field }) => (
            <SimpleCheckbox
              label="TEOM"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="ppp_loc_comm"
          render={({ field }) => (
            <SimpleCheckbox
              label="Locaux commerciaux"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Parties privatives</h4>
        <FormField
          control={form.control}
          name="pp_impots"
          render={({ field }) => (
            <SimpleCheckbox
              label="Impôts"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pp_taxe_fonc"
          render={({ field }) => (
            <SimpleCheckbox
              label="Taxe foncière"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pp_teom"
          render={({ field }) => (
            <SimpleCheckbox
              label="TEOM"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pp_loc_comm"
          render={({ field }) => (
            <SimpleCheckbox
              label="Locaux commerciaux"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Parties communes bailleur</h4>
        <FormField
          control={form.control}
          name="pcb_impots"
          render={({ field }) => (
            <SimpleCheckbox
              label="Impôts"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pcb_taxe_fonc"
          render={({ field }) => (
            <SimpleCheckbox
              label="Taxe foncière"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pcb_teom"
          render={({ field }) => (
            <SimpleCheckbox
              label="TEOM"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pcb_loc_comm"
          render={({ field }) => (
            <SimpleCheckbox
              label="Locaux commerciaux"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Parties communes preneur</h4>
        <FormField
          control={form.control}
          name="pcp_impots"
          render={({ field }) => (
            <SimpleCheckbox
              label="Impôts"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pcp_taxe_fonc"
          render={({ field }) => (
            <SimpleCheckbox
              label="Taxe foncière"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pcp_teom"
          render={({ field }) => (
            <SimpleCheckbox
              label="TEOM"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pcp_loc_comm"
          render={({ field }) => (
            <SimpleCheckbox
              label="Locaux commerciaux"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Parties communes</h4>
        <FormField
          control={form.control}
          name="pc_impots"
          render={({ field }) => (
            <SimpleCheckbox
              label="Impôts"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pc_taxe_fonc"
          render={({ field }) => (
            <SimpleCheckbox
              label="Taxe foncière"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pc_teom"
          render={({ field }) => (
            <SimpleCheckbox
              label="TEOM"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pc_loc_comm"
          render={({ field }) => (
            <SimpleCheckbox
              label="Locaux commerciaux"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Honoraires bailleur</h4>
        <FormField
          control={form.control}
          name="hb_gest_tech"
          render={({ field }) => (
            <SimpleCheckbox
              label="Gestion technique"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="hb_gest_loc"
          render={({ field }) => (
            <SimpleCheckbox
              label="Gestion locative"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="hb_gest_loyers"
          render={({ field }) => (
            <SimpleCheckbox
              label="Gestion des loyers"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="hb_gest_synd"
          render={({ field }) => (
            <SimpleCheckbox
              label="Gestion syndic"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Honoraires preneur</h4>
        <FormField
          control={form.control}
          name="hp_gest_tech"
          render={({ field }) => (
            <SimpleCheckbox
              label="Gestion technique"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="hp_gest_loc"
          render={({ field }) => (
            <SimpleCheckbox
              label="Gestion locative"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="hp_gest_loyers"
          render={({ field }) => (
            <SimpleCheckbox
              label="Gestion des loyers"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="hp_gest_synd"
          render={({ field }) => (
            <SimpleCheckbox
              label="Gestion syndic"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Honoraires non précisés</h4>
        <FormField
          control={form.control}
          name="hnp_gest_tech"
          render={({ field }) => (
            <SimpleCheckbox
              label="Gestion technique"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="hnp_gest_loc"
          render={({ field }) => (
            <SimpleCheckbox
              label="Gestion locative"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="hnp_gest_loyers"
          render={({ field }) => (
            <SimpleCheckbox
              label="Gestion des loyers"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="hnp_gest_synd"
          render={({ field }) => (
            <SimpleCheckbox
              label="Gestion syndic"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Assurance bailleur</h4>
        <FormField
          control={form.control}
          name="assu_b_b"
          render={({ field }) => (
            <SimpleCheckbox
              label="Bailleur"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="assu_b_p"
          render={({ field }) => (
            <SimpleCheckbox
              label="Preneur"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="assu_b_np"
          render={({ field }) => (
            <SimpleCheckbox
              label="Non précisé"
              defaultChecked={field.value}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="fonds_marktg"
        render={({ field }) => (
          <SimpleCheckbox
            label="Fonds marketing"
            defaultChecked={field.value}
            onChange={(checked) => field.onChange(checked.toString())}
          />
        )}
      />
    </div>
  );
}
