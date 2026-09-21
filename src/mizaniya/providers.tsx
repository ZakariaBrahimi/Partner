"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UITooltipProvider } from "./ui/tooltip";
import { UIToaster } from "./ui/sonner";

export function MizaniyaProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UITooltipProvider delay={300}>
        {children}
        <UIToaster />
      </UITooltipProvider>
    </QueryClientProvider>
  );
}
