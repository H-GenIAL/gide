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
  const { searchKeyword } = usePdfViewer();
  const searchPluginInstance = searchPlugin({
    onHighlightKeyword: (props) => {
      console.log(props);
      props.highlightEle.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },
  });
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
  });

  useEffect(() => {
    if (searchKeyword) {
      searchPluginInstance.highlight(searchKeyword);
    }
  }, [searchKeyword, searchPluginInstance]);

  return (
    <Viewer
      {...props}
      plugins={[...plugins, searchPluginInstance, defaultLayoutPluginInstance]}
      defaultScale={SpecialZoomLevel.PageFit}
    />
  );
}
