import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { SimpleCheckbox } from "./elements/checkbox";

export function WorksRepairsForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Parties privatives - Bailleur</h4>
        <FormField
          control={form.control}
          name="pp_b_rep"
          render={({ field }) => (
            <SimpleCheckbox
              label="Réparations"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pp_b_confo"
          render={({ field }) => (
            <SimpleCheckbox
              label="Mise en conformité"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pp_b_vetus"
          render={({ field }) => (
            <SimpleCheckbox
              label="Vétusté"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pp_b_equip"
          render={({ field }) => (
            <SimpleCheckbox
              label="Équipements"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Parties privatives - Preneur</h4>
        <FormField
          control={form.control}
          name="pp_p_rep"
          render={({ field }) => (
            <SimpleCheckbox
              label="Réparations"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pp_p_confo"
          render={({ field }) => (
            <SimpleCheckbox
              label="Mise en conformité"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pp_p_vetus"
          render={({ field }) => (
            <SimpleCheckbox
              label="Vétusté"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pp_p_equip"
          render={({ field }) => (
            <SimpleCheckbox
              label="Équipements"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Parties privatives - Non précisé</h4>
        <FormField
          control={form.control}
          name="pp_np_rep"
          render={({ field }) => (
            <SimpleCheckbox
              label="Réparations"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pp_np_confo"
          render={({ field }) => (
            <SimpleCheckbox
              label="Mise en conformité"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pp_np_vetus"
          render={({ field }) => (
            <SimpleCheckbox
              label="Vétusté"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pp_np_equip"
          render={({ field }) => (
            <SimpleCheckbox
              label="Équipements"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Parties communes - Bailleur</h4>
        <FormField
          control={form.control}
          name="pc_b_rep"
          render={({ field }) => (
            <SimpleCheckbox
              label="Réparations"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pc_b_confo"
          render={({ field }) => (
            <SimpleCheckbox
              label="Mise en conformité"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pc_b_vetus"
          render={({ field }) => (
            <SimpleCheckbox
              label="Vétusté"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pc_b_equip"
          render={({ field }) => (
            <SimpleCheckbox
              label="Équipements"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Parties communes - Preneur</h4>
        <FormField
          control={form.control}
          name="pc_p_rep"
          render={({ field }) => (
            <SimpleCheckbox
              label="Réparations"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pc_p_confo"
          render={({ field }) => (
            <SimpleCheckbox
              label="Mise en conformité"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pc_p_vetus"
          render={({ field }) => (
            <SimpleCheckbox
              label="Vétusté"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pc_p_equip"
          render={({ field }) => (
            <SimpleCheckbox
              label="Équipements"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Parties communes - Non précisé</h4>
        <FormField
          control={form.control}
          name="pc_np_rep"
          render={({ field }) => (
            <SimpleCheckbox
              label="Réparations"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pc_np_confo"
          render={({ field }) => (
            <SimpleCheckbox
              label="Mise en conformité"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pc_np_vetus"
          render={({ field }) => (
            <SimpleCheckbox
              label="Vétusté"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
        <FormField
          control={form.control}
          name="pc_np_equip"
          render={({ field }) => (
            <SimpleCheckbox
              label="Équipements"
              defaultChecked={field.value === "true"}
              onChange={(checked) => field.onChange(checked.toString())}
            />
          )}
        />
      </div>
    </div>
  );
}
