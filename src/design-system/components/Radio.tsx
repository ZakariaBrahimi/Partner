import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const radio = (
      <span className="relative inline-flex size-[18px] shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={id}
          type="radio"
          className={cn(
            "peer size-[18px] shrink-0 appearance-none rounded-full border-2 border-border-strong bg-surface transition-colors",
            "checked:border-primary",
            "hover:border-primary/60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "disabled:cursor-not-allowed disabled:border-border disabled:bg-disabled-background",
            className,
          )}
          {...props}
        />
        <span className="pointer-events-none absolute size-2 scale-0 rounded-full bg-primary transition-transform peer-checked:scale-100" />
      </span>
    );

    if (!label) return radio;

    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 text-sm text-text-primary",
          props.disabled && "cursor-not-allowed text-text-muted",
        )}
      >
        {radio}
        {label}
      </label>
    );
  },
);
Radio.displayName = "Radio";
