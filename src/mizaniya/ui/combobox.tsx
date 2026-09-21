"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

export interface ComboboxOption {
  value: string;
  label: string;
}

export function UICombobox({
  options,
  value,
  onValueChange,
  placeholder,
  className,
  "aria-label": ariaLabel,
}: {
  options: ComboboxOption[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
}) {
  const byValue = new Map(options.map((o) => [o.value, o.label]));

  return (
    <BaseCombobox.Root
      items={options}
      value={value}
      onValueChange={(v) => onValueChange((v as string) ?? null)}
      itemToStringLabel={(v) => byValue.get(v as string) ?? ""}
    >
      <BaseCombobox.InputGroup
        className={cn(
          "flex h-10 w-full items-center gap-2 rounded-input border border-border bg-surface px-3 transition-colors",
          "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 hover:border-border-strong",
          className,
        )}
      >
        <BaseCombobox.Input
          placeholder={placeholder}
          aria-label={ariaLabel}
          className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        <BaseCombobox.Icon>
          <ChevronDown className="size-4 shrink-0 text-text-muted" aria-hidden="true" />
        </BaseCombobox.Icon>
      </BaseCombobox.InputGroup>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner sideOffset={6} className="z-40">
          <BaseCombobox.Popup className="mz-popover-transition max-h-[280px] w-[--anchor-width] overflow-y-auto rounded-dropdown border border-border bg-surface py-1.5 shadow-dropdown focus:outline-none">
            <BaseCombobox.Empty className="px-3 py-2 text-sm text-text-muted">No results found.</BaseCombobox.Empty>
            <BaseCombobox.List>
              {(option: ComboboxOption) => (
                <BaseCombobox.Item
                  key={option.value}
                  value={option.value}
                  className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm text-text-primary outline-none transition-colors data-[highlighted]:bg-background"
                >
                  {option.label}
                  <BaseCombobox.ItemIndicator>
                    <Check className="size-4 text-primary" aria-hidden="true" />
                  </BaseCombobox.ItemIndicator>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}
