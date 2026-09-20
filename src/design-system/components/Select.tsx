import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "h-10 w-full appearance-none rounded-input border bg-surface pl-3 pr-9 text-sm text-text-primary transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
            "disabled:cursor-not-allowed disabled:bg-background disabled:text-text-muted",
            error
              ? "border-error focus-visible:ring-error/30"
              : "border-border hover:border-border-strong focus-visible:border-primary",
            className,
          )}
          aria-invalid={error || undefined}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
      </div>
    );
  },
);
Select.displayName = "Select";
