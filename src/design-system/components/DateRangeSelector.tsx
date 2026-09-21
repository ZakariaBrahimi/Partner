"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";
import { Popover } from "./Popover";
import { Button } from "./Button";
import { TextInput } from "./TextInput";

export type DateRangePreset = "today" | "yesterday" | "7d" | "30d" | "90d" | "year" | "custom";

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
  year: "This year",
  custom: "Custom range",
};

const PRESET_ORDER: DateRangePreset[] = ["today", "yesterday", "7d", "30d", "90d", "year"];

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

export function computeRange(
  preset: DateRangePreset,
  now: Date = new Date(),
  custom?: { from: Date; to: Date },
): DateRange {
  const today = startOfDay(now);
  switch (preset) {
    case "today":
      return { preset, from: today, to: endOfDay(now) };
    case "yesterday": {
      const y = new Date(today);
      y.setDate(y.getDate() - 1);
      return { preset, from: y, to: endOfDay(y) };
    }
    case "7d": {
      const from = new Date(today);
      from.setDate(from.getDate() - 6);
      return { preset, from, to: endOfDay(now) };
    }
    case "30d": {
      const from = new Date(today);
      from.setDate(from.getDate() - 29);
      return { preset, from, to: endOfDay(now) };
    }
    case "90d": {
      const from = new Date(today);
      from.setDate(from.getDate() - 89);
      return { preset, from, to: endOfDay(now) };
    }
    case "year": {
      const from = new Date(today.getFullYear(), 0, 1);
      return { preset, from, to: endOfDay(now) };
    }
    case "custom":
      return { preset, from: custom?.from ?? today, to: custom?.to ?? endOfDay(now) };
  }
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatRangeLabel(range: DateRange) {
  if (range.preset !== "custom") return PRESET_LABELS[range.preset];
  return `${formatDate(range.from)} – ${formatDate(range.to)}`;
}

function toInputValue(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Generic global date-range control: presets + a custom range. Reusable
 * anywhere a page needs to scope its data to a time window. */
export function DateRangeSelector({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (range: DateRange) => void;
}) {
  const [open, setOpen] = useState(false);
  const [customFrom, setCustomFrom] = useState(toInputValue(value.from));
  const [customTo, setCustomTo] = useState(toInputValue(value.to));

  return (
    <Popover
      open={open}
      onClose={() => setOpen(false)}
      align="end"
      width="260px"
      trigger={
        <Button
          variant="secondary"
          leadingIcon={<Calendar className="size-4" aria-hidden="true" />}
          trailingIcon={<ChevronDown className="size-4" aria-hidden="true" />}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          {formatRangeLabel(value)}
        </Button>
      }
    >
      <div className="flex flex-col gap-0.5 p-2">
        {PRESET_ORDER.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              onChange(computeRange(preset));
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
          <p
            className={cn(
              "mb-2 px-2 text-sm font-medium",
              value.preset === "custom" ? "text-primary" : "text-text-primary",
            )}
          >
            Custom range
          </p>
          <div className="flex items-center gap-2 px-2">
            <TextInput
              type="date"
              aria-label="Custom range start"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="h-9 text-xs"
            />
            <span className="text-text-muted">–</span>
            <TextInput
              type="date"
              aria-label="Custom range end"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="h-9 text-xs"
            />
          </div>
          <div className="mt-2 px-2">
            <Button
              size="compact"
              className="w-full"
              disabled={!customFrom || !customTo}
              onClick={() => {
                onChange(
                  computeRange("custom", undefined, {
                    from: startOfDay(new Date(customFrom)),
                    to: endOfDay(new Date(customTo)),
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
    </Popover>
  );
}
