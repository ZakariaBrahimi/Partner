"use client";

import { useState } from "react";
import {
  startOfDay,
  endOfDay,
  subDays,
  startOfMonth,
  startOfYear,
  format,
  parseISO,
} from "date-fns";
import { Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/design-system/utils/cn";
import { UIPopoverRoot, UIPopoverTrigger, UIPopoverContent } from "../../ui/popover";
import { Button } from "../core/button";
import { Input } from "./input";

export type DateRangePreset = "today" | "yesterday" | "7d" | "30d" | "90d" | "month" | "year" | "custom";

export interface DateRange {
  preset: DateRangePreset;
  from: Date;
  to: Date;
}

const PRESET_LABELS: Record<DateRangePreset, string> = {
  today: "Today",
  yesterday: "Yesterday",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  month: "This month",
  year: "This year",
  custom: "Custom range",
};

const PRESET_ORDER: DateRangePreset[] = ["today", "yesterday", "7d", "30d", "90d", "month", "year"];

export function computeDateRange(preset: DateRangePreset, now: Date = new Date(), custom?: { from: Date; to: Date }): DateRange {
  const today = startOfDay(now);
  switch (preset) {
    case "today":
      return { preset, from: today, to: endOfDay(now) };
    case "yesterday": {
      const y = subDays(today, 1);
      return { preset, from: y, to: endOfDay(y) };
    }
    case "7d":
      return { preset, from: subDays(today, 6), to: endOfDay(now) };
    case "30d":
      return { preset, from: subDays(today, 29), to: endOfDay(now) };
    case "90d":
      return { preset, from: subDays(today, 89), to: endOfDay(now) };
    case "month":
      return { preset, from: startOfMonth(now), to: endOfDay(now) };
    case "year":
      return { preset, from: startOfYear(now), to: endOfDay(now) };
    case "custom":
      return { preset, from: custom?.from ?? today, to: custom?.to ?? endOfDay(now) };
  }
}

export function formatDateRangeLabel(range: DateRange) {
  if (range.preset !== "custom") return PRESET_LABELS[range.preset];
  return `${format(range.from, "d MMM yyyy")} – ${format(range.to, "d MMM yyyy")}`;
}

/** Global date-range control: presets (Today, Yesterday, Last 7/30/90 days,
 * This month, This year) plus a custom range — built for reuse by any page
 * that needs to scope data to a time window. */
export function DateRangePicker({ value, onChange }: { value: DateRange; onChange: (range: DateRange) => void }) {
  const [open, setOpen] = useState(false);
  const [customFrom, setCustomFrom] = useState(format(value.from, "yyyy-MM-dd"));
  const [customTo, setCustomTo] = useState(format(value.to, "yyyy-MM-dd"));

  return (
    <UIPopoverRoot open={open} onOpenChange={setOpen}>
      <UIPopoverTrigger
        render={
          <button
            type="button"
            className={cn(
              "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-button border border-border bg-surface px-4 text-sm font-semibold text-text-primary transition-colors",
              "hover:bg-background hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            )}
          />
        }
      >
        <Calendar className="size-4" aria-hidden="true" />
        {formatDateRangeLabel(value)}
        <ChevronDown className="size-4" aria-hidden="true" />
      </UIPopoverTrigger>
      <UIPopoverContent align="end" style={{ width: "260px" }}>
        <div className="flex flex-col gap-0.5 p-2">
          {PRESET_ORDER.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                onChange(computeDateRange(preset));
                setOpen(false);
              }}
              className={cn(
                "rounded-[6px] px-3 py-2 text-left text-sm transition-colors hover:bg-background",
                value.preset === preset ? "bg-primary-soft font-semibold text-primary" : "text-text-primary",
              )}
            >
              {PRESET_LABELS[preset]}
            </button>
          ))}
          <div className="my-1 h-px bg-border" />
          <div className="px-1 py-1.5">
            <p className={cn("mb-2 px-2 text-sm font-medium", value.preset === "custom" ? "text-primary" : "text-text-primary")}>
              Custom range
            </p>
            <div className="flex items-center gap-2 px-2">
              <Input type="date" aria-label="Custom range start" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className="h-9 text-xs" />
              <span className="text-text-muted">–</span>
              <Input type="date" aria-label="Custom range end" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className="h-9 text-xs" />
            </div>
            <div className="mt-2 px-2">
              <Button
                size="compact"
                className="w-full"
                disabled={!customFrom || !customTo}
                onClick={() => {
                  onChange(
                    computeDateRange("custom", undefined, {
                      from: startOfDay(parseISO(customFrom)),
                      to: endOfDay(parseISO(customTo)),
                    }),
                  );
                  setOpen(false);
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </UIPopoverContent>
    </UIPopoverRoot>
  );
}
