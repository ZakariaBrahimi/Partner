import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "../utils/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkbox = (
      <span className="relative inline-flex size-[18px] shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={cn(
            "peer size-[18px] shrink-0 appearance-none rounded-[5px] border border-border-strong bg-surface transition-colors",
            "checked:border-primary checked:bg-primary",
            "hover:border-primary/60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "disabled:cursor-not-allowed disabled:border-border disabled:bg-disabled-background",
            className,
          )}
          {...props}
        />
        <Check
          className="pointer-events-none absolute size-3 text-white opacity-0 peer-checked:opacity-100"
          aria-hidden="true"
        />
      </span>
    );

    if (!label) return checkbox;

    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 text-sm text-text-primary",
          props.disabled && "cursor-not-allowed text-text-muted",
        )}
      >
        {checkbox}
        {label}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
