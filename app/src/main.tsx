import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Worker } from "@react-pdf-viewer/core";
import { queryClient } from "@/lib/query";
import packageJson from "../package.json";
import "@react-pdf-viewer/search/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
      >
        <RouterProvider router={router} />
      </Worker>
    </QueryClientProvider>
  </StrictMode>,
);
