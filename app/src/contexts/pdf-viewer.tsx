import { createContext, useContext } from "react";

interface PdfViewerContextType {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

export const PdfViewerContext = createContext<PdfViewerContextType>({
  searchKeyword: "",
  setSearchKeyword: () => {},
});

export function usePdfViewer() {
  const context = useContext(PdfViewerContext);

  if (!context) {
    throw new Error("usePdfViewer must be used within a PdfViewerProvider");
  }

  return context;
}
