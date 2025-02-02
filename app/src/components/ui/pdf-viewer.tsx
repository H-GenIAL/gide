import { useEffect, useState } from "react";
import { SpecialZoomLevel, Viewer, ViewerProps } from "@react-pdf-viewer/core";
import { searchPlugin } from "@react-pdf-viewer/search";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { PdfViewerContext, usePdfViewer } from "@/contexts/pdf-viewer";

export function PdfViewerProvider({ children }: { children: React.ReactNode }) {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <PdfViewerContext.Provider value={{ searchKeyword, setSearchKeyword }}>
      {children}
    </PdfViewerContext.Provider>
  );
}

export function PdfViewer({ plugins = [], ...props }: ViewerProps) {
  const { searchKeyword, setSearchKeyword } = usePdfViewer();
  const searchPluginInstance = searchPlugin({
    onHighlightKeyword: (props) => {
      console.log(props);
      props.highlightEle.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setSearchKeyword("");
    },
  });
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
  });

  useEffect(() => {
    console.log("searchKeyword", searchKeyword);
    if (searchKeyword.trim() !== "") {
      searchPluginInstance.highlight(searchKeyword);
    }
  }, [searchKeyword]);

  return (
    <Viewer
      {...props}
      plugins={[...plugins, searchPluginInstance, defaultLayoutPluginInstance]}
      defaultScale={SpecialZoomLevel.PageFit}
    />
  );
}
