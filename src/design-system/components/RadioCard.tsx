"use client";

import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export function RadioGroup({
  name,
  children,
  className,
  orientation = "vertical",
}: {
  name: string;
  children: ReactNode;
  className?: string;
  orientation?: "vertical" | "horizontal";
}) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={cn(
        "grid gap-3",
        orientation === "horizontal" ? "grid-cols-2" : "grid-cols-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function RadioCard({
  selected,
  disabled,
  onSelect,
  icon,
  title,
  description,
  extra,
  className,
}: {
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
  icon?: ReactNode;
  title: string;
  description?: string;
  extra?: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "group flex w-full flex-col gap-3 rounded-card border p-4 text-left transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        disabled
          ? "cursor-not-allowed border-border bg-background opacity-60"
          : selected
            ? "border-primary bg-primary-soft"
            : "border-border bg-surface hover:border-border-strong hover:bg-background",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-[8px] border",
              selected
                ? "border-primary/30 bg-surface text-primary"
                : "border-border bg-background text-text-secondary",
            )}
          >
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-sm font-semibold",
              selected ? "text-primary" : "text-text-primary",
            )}
          >
            {title}
          </p>
          {description && (
            <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
              {description}
            </p>
          )}
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            selected ? "border-primary" : "border-border-strong bg-surface",
          )}
        >
          {selected && <span className="size-2 rounded-full bg-primary" />}
        </span>
      </div>
      {extra && <div onClick={(e) => e.stopPropagation()}>{extra}</div>}
    </button>
  );
}
