"use client";

import type { ReactNode } from "react";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { cn } from "@/design-system/utils/cn";

export function RadioCard({
  value,
  disabled,
  icon,
  title,
  description,
  extra,
  className,
}: {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  title: string;
  description?: string;
  extra?: ReactNode;
  className?: string;
}) {
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
            "data-[checked]:border-primary data-[checked]:bg-primary-soft data-[checked]:hover:bg-primary-soft",
            disabled && "cursor-not-allowed border-border bg-background opacity-60 hover:border-border hover:bg-background",
            className,
          )}
        />
      }
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] border border-border bg-background text-text-secondary group-data-[checked]:border-primary/30 group-data-[checked]:bg-surface group-data-[checked]:text-primary">
            {icon}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-text-primary group-data-[checked]:text-primary">{title}</p>
          {description && <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{description}</p>}
        </div>
        <span
          aria-hidden="true"
          className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 border-border-strong bg-surface transition-colors group-data-[checked]:border-primary"
        >
          <BaseRadio.Indicator className="flex items-center justify-center data-[unchecked]:hidden">
            <span className="size-2 rounded-full bg-primary" />
          </BaseRadio.Indicator>
        </span>
      </div>
      {extra && (
        <div
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {extra}
        </div>
      )}
    </BaseRadio.Root>
  );
}
