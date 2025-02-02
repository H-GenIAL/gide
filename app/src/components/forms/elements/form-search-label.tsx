import { SearchIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "@/components/ui/form";
import { usePdfViewer } from "@/contexts/pdf-viewer";

interface FormSearchLabelProps {
  name: string;
  children: React.ReactNode;
}

export function FormSearchLabel({ name, children }: FormSearchLabelProps) {
  const form = useFormContext();
  const { setSearchKeyword } = usePdfViewer();

  const handleSearch = () => {
    const value = form.getValues(name);
    setSearchKeyword("602.909.805");
  };

  return (
    <FormLabel className="flex w-full items-center justify-between">
      {children}
      <button
        type="button"
        className="text-muted-foreground hover:text-secondary"
        onClick={handleSearch}
      >
        <SearchIcon className="h-4 w-4" />
      </button>
    </FormLabel>
  );
}
