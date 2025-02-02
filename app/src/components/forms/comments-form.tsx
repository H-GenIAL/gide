import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FormSearchLabel } from "./elements/form-search-label";

export function CommentsForm() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="commentaires"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Commentaires</FormSearchLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="index_audites"
        render={({ field }) => (
          <FormItem>
            <FormSearchLabel name={field.name}>Index audités</FormSearchLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
