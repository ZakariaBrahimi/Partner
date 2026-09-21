"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { CalendarDays } from "lucide-react";
import { UIPopoverRoot, UIPopoverTrigger, UIPopoverContent } from "../../ui/popover";
import { cn } from "@/design-system/utils/cn";

/** Single-date picker: a Mizaniya-styled trigger showing a human-readable
 * date ("31 Aug 2026"), backed by the browser's native date input inside a
 * popover for reliable, accessible picking. */
export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
}: {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <UIPopoverRoot open={open} onOpenChange={setOpen}>
      <UIPopoverTrigger
        render={
          <button
            type="button"
            className={cn(
              "flex h-10 items-center gap-2 rounded-input border border-border bg-surface px-3 text-sm text-text-primary transition-colors",
              "hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
              className,
            )}
          />
        }
      >
        <CalendarDays className="size-4 text-text-muted" aria-hidden="true" />
        {value ? format(value, "d MMM yyyy") : <span className="text-text-muted">{placeholder}</span>}
      </UIPopoverTrigger>
      <UIPopoverContent align="start" style={{ width: "auto" }}>
        <div className="p-3">
          <input
            type="date"
            autoFocus
            value={value ? format(value, "yyyy-MM-dd") : ""}
            onChange={(e) => {
              onChange(e.target.value ? parseISO(e.target.value) : null);
              setOpen(false);
            }}
            className="h-10 rounded-input border border-border bg-surface px-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          />
        </div>
      </UIPopoverContent>
    </UIPopoverRoot>
  );
}
