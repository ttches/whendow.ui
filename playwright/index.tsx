/// <reference types="vite/client" />
import "../src/index.css";
import "../src/App.css";
import { beforeMount } from "@playwright/experimental-ct-react/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

export type HooksConfig = {
  route?: string;
};

beforeMount<HooksConfig>(async ({ App, hooksConfig }) => {
  const queryClient = new QueryClient();

  return (
    <MemoryRouter initialEntries={[hooksConfig?.route ?? "/"]}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MemoryRouter>
  );
});
