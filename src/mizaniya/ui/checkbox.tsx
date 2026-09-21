"use client";

import type { ComponentPropsWithoutRef } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

export interface UICheckboxProps extends ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
  label?: string;
}

export function UICheckbox({ className, id, label, ...props }: UICheckboxProps) {
  const box = (
    <BaseCheckbox.Root
      id={id}
      className={cn(
        "flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-border-strong bg-surface transition-colors",
        "data-[checked]:border-primary data-[checked]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:bg-primary",
        "hover:border-primary/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        "disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-muted",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="text-white data-[unchecked]:hidden" keepMounted={false}>
        {props.indeterminate ? <Minus className="size-3" /> : <Check className="size-3" />}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );

  if (!label) return box;

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 text-sm text-text-primary",
        props.disabled && "cursor-not-allowed text-text-disabled",
      )}
    >
      {box}
      {label}
    </label>
  );
}
