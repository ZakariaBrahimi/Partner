"use client";

import { Toaster as Sonner } from "sonner";

/** Mounted once in the root layout. Styled to match Mizaniya's surface/border
 * tokens rather than Sonner's defaults. */
export function UIToaster() {
  return (
    <Sonner
      position="top-right"
      gap={10}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-[340px] items-start gap-3 rounded-[10px] border border-border bg-surface px-4 py-3.5 shadow-drawer",
          title: "text-sm font-semibold text-text-primary",
          description: "mt-0.5 text-xs text-text-secondary",
          icon: "mt-0.5 shrink-0",
          closeButton:
            "!bg-surface !border-border !text-text-muted hover:!text-text-primary",
          actionButton: "!bg-primary !text-white !rounded-button !text-xs !font-semibold",
        },
      }}
    />
  );
}
