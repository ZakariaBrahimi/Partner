"use client";

import type { ReactNode } from "react";
import { UIPopoverRoot, UIPopoverTrigger, UIPopoverContent } from "../../ui/popover";

export function Popover({
  open,
  onOpenChange,
  trigger,
  children,
  align = "start",
  width = "320px",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "end";
  width?: string;
}) {
  return (
    <UIPopoverRoot open={open} onOpenChange={onOpenChange}>
      <UIPopoverTrigger render={<span className="inline-block" />}>{trigger}</UIPopoverTrigger>
      <UIPopoverContent align={align} style={{ width }}>
        {children}
      </UIPopoverContent>
    </UIPopoverRoot>
  );
}
