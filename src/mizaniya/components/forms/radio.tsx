import type { ReactNode } from "react";
import { UIRadioGroup, UIRadio } from "../../ui/radio-group";

export const Radio = UIRadio;

export function RadioGroup({
  value,
  onValueChange,
  name,
  children,
  className,
  orientation = "vertical",
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  name: string;
  children: ReactNode;
  className?: string;
  orientation?: "vertical" | "horizontal";
}) {
  return (
    <UIRadioGroup
      value={value}
      onValueChange={(v) => onValueChange?.(String(v))}
      aria-label={name}
      className={`grid gap-3 ${orientation === "horizontal" ? "grid-cols-2" : "grid-cols-1"} ${className ?? ""}`}
    >
      {children}
    </UIRadioGroup>
  );
}
