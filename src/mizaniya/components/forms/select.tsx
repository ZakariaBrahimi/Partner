"use client";

import { UISelectRoot, UISelectTrigger, UISelectContent, UISelectItem } from "../../ui/select";

export interface SelectOption {
  value: string;
  label: string;
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder,
  error,
  disabled,
  "aria-label": ariaLabel,
  className,
}: {
  value?: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}) {
  return (
    <UISelectRoot
      value={value ?? null}
      onValueChange={(v) => v !== null && onValueChange(String(v))}
      disabled={disabled}
      items={options}
    >
      <UISelectTrigger placeholder={placeholder} error={error} className={className} aria-label={ariaLabel} />
      <UISelectContent>
        {options.map((option) => (
          <UISelectItem key={option.value} value={option.value}>
            {option.label}
          </UISelectItem>
        ))}
      </UISelectContent>
    </UISelectRoot>
  );
}
