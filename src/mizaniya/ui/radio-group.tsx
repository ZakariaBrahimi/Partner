"use client";

import type { ComponentPropsWithoutRef } from "react";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { cn } from "@/design-system/utils/cn";

export const UIRadioGroup = BaseRadioGroup;

export interface UIRadioProps extends ComponentPropsWithoutRef<typeof BaseRadio.Root> {
  label?: string;
  id?: string;
}

export function UIRadio({ className, id, label, ...props }: UIRadioProps) {
  const radio = (
    <BaseRadio.Root
      id={id}
      className={cn(
        "flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 border-border-strong bg-surface transition-colors",
        "data-[checked]:border-primary",
        "hover:border-primary/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        "disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-muted",
        className,
      )}
      {...props}
    >
      <BaseRadio.Indicator className="flex items-center justify-center data-[unchecked]:hidden">
        <span className="size-2 rounded-full bg-primary" />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  );

  if (!label) return radio;

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 text-sm text-text-primary",
        props.disabled && "cursor-not-allowed text-text-disabled",
      )}
    >
      {radio}
      {label}
    </label>
  );
}
