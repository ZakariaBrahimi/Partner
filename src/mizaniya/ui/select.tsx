"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

export const UISelectRoot = BaseSelect.Root;

export function UISelectTrigger({
  className,
  placeholder,
  error,
  ...props
}: ComponentPropsWithoutRef<typeof BaseSelect.Trigger> & {
  placeholder?: string;
  error?: boolean;
}) {
  return (
    <BaseSelect.Trigger
      className={cn(
        "flex h-10 w-full items-center justify-between gap-2 rounded-input border bg-surface px-3 text-sm text-text-primary transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-disabled",
        error
          ? "border-error focus-visible:ring-error/30"
          : "border-border hover:border-border-strong focus-visible:border-primary",
        className,
      )}
      {...props}
    >
      <BaseSelect.Value placeholder={placeholder} className="truncate text-left" />
      <BaseSelect.Icon>
        <ChevronDown className="size-4 shrink-0 text-text-muted" aria-hidden="true" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

export function UISelectContent({ children }: { children: ReactNode }) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={6} className="z-40">
        <BaseSelect.Popup className="mz-popover-transition max-h-[280px] overflow-y-auto rounded-dropdown border border-border bg-surface py-1.5 shadow-dropdown focus:outline-none">
          <BaseSelect.List>{children}</BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export function UISelectItem({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      className={cn(
        "flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm text-text-primary outline-none transition-colors",
        "data-[highlighted]:bg-background data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40",
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator>
        <Check className="size-4 text-primary" aria-hidden="true" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}
