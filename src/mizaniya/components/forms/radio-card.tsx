"use client";

import type { ReactNode } from "react";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { cn } from "@/design-system/utils/cn";
import { ACCENT_TINTS } from "../core/accent";
import type { AccentKey } from "../core/accent";

/**
 * Checked-state treatment per accent. Tailwind needs each `data-[checked]:`
 * class spelled out literally (it can't detect a variant prefix glued onto a
 * class name at runtime), so this can't be derived from ACCENT_TINTS by
 * string concatenation — it's its own small, explicit map.
 */
const RADIO_CHECKED_CLASSES: Record<AccentKey, string> = {
  primary: "data-[checked]:border-primary data-[checked]:bg-primary-soft data-[checked]:hover:bg-primary-soft",
  success: "data-[checked]:border-success data-[checked]:bg-success-soft data-[checked]:hover:bg-success-soft",
  warning: "data-[checked]:border-warning data-[checked]:bg-warning-soft data-[checked]:hover:bg-warning-soft",
  error: "data-[checked]:border-error data-[checked]:bg-error-soft data-[checked]:hover:bg-error-soft",
  info: "data-[checked]:border-info data-[checked]:bg-info-soft data-[checked]:hover:bg-info-soft",
  violet: "data-[checked]:border-accent-violet data-[checked]:bg-accent-violet-soft data-[checked]:hover:bg-accent-violet-soft",
  sky: "data-[checked]:border-accent-sky data-[checked]:bg-accent-sky-soft data-[checked]:hover:bg-accent-sky-soft",
  teal: "data-[checked]:border-accent-teal data-[checked]:bg-accent-teal-soft data-[checked]:hover:bg-accent-teal-soft",
  orange: "data-[checked]:border-accent-orange data-[checked]:bg-accent-orange-soft data-[checked]:hover:bg-accent-orange-soft",
  pink: "data-[checked]:border-accent-pink data-[checked]:bg-accent-pink-soft data-[checked]:hover:bg-accent-pink-soft",
  neutral: "data-[checked]:border-primary data-[checked]:bg-primary-soft data-[checked]:hover:bg-primary-soft",
};

const RADIO_CHECKED_TITLE_CLASSES: Record<AccentKey, string> = {
  primary: "group-data-[checked]:text-primary",
  success: "group-data-[checked]:text-success",
  warning: "group-data-[checked]:text-warning",
  error: "group-data-[checked]:text-error",
  info: "group-data-[checked]:text-info",
  violet: "group-data-[checked]:text-accent-violet",
  sky: "group-data-[checked]:text-accent-sky",
  teal: "group-data-[checked]:text-accent-teal",
  orange: "group-data-[checked]:text-accent-orange",
  pink: "group-data-[checked]:text-accent-pink",
  neutral: "group-data-[checked]:text-primary",
};

const RADIO_CHECKED_RING_CLASSES: Record<AccentKey, string> = {
  primary: "group-data-[checked]:border-primary",
  success: "group-data-[checked]:border-success",
  warning: "group-data-[checked]:border-warning",
  error: "group-data-[checked]:border-error",
  info: "group-data-[checked]:border-info",
  violet: "group-data-[checked]:border-accent-violet",
  sky: "group-data-[checked]:border-accent-sky",
  teal: "group-data-[checked]:border-accent-teal",
  orange: "group-data-[checked]:border-accent-orange",
  pink: "group-data-[checked]:border-accent-pink",
  neutral: "group-data-[checked]:border-primary",
};

export function RadioCard({
  value,
  disabled,
  icon,
  title,
  description,
  extra,
  className,
  accent = "neutral",
}: {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  title: string;
  description?: string;
  extra?: ReactNode;
  className?: string;
  /** Tints the icon chip at rest and the selection ring when checked.
   * Defaults to "neutral" (the original muted look) so existing call sites
   * are unaffected unless they opt into a vivid identity color. */
  accent?: AccentKey;
}) {
  const tint = ACCENT_TINTS[accent];

  return (
    <BaseRadio.Root
      value={value}
      disabled={disabled}
      render={
        <div
          className={cn(
            "group flex w-full cursor-pointer flex-col gap-3 rounded-card border p-4 text-left transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "border-border bg-surface hover:border-border-strong hover:bg-background",
            RADIO_CHECKED_CLASSES[accent],
            disabled && "cursor-not-allowed border-border bg-background opacity-60 hover:border-border hover:bg-background",
            className,
          )}
        />
      }
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-[8px]",
              tint.bg,
              tint.text,
              accent === "neutral" && "border border-border",
            )}
          >
            {icon}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className={cn("text-sm font-semibold text-text-primary", RADIO_CHECKED_TITLE_CLASSES[accent])}>{title}</p>
          {description && <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{description}</p>}
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 border-border-strong bg-surface transition-colors",
            RADIO_CHECKED_RING_CLASSES[accent],
          )}
        >
          <BaseRadio.Indicator className="flex items-center justify-center data-[unchecked]:hidden">
            <span className={cn("size-2 rounded-full", tint.solid)} />
          </BaseRadio.Indicator>
        </span>
      </div>
      {extra && (
        <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          {extra}
        </div>
      )}
    </BaseRadio.Root>
  );
}
