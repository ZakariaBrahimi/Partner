import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "@/design-system/utils/cn";

const fieldBase =
  "w-full rounded-input border bg-surface text-sm text-text-primary placeholder:text-text-muted transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 " +
  "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-disabled";

export interface UIInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const UIInput = forwardRef<HTMLInputElement, UIInputProps>(
  ({ className, error, leadingIcon, trailingIcon, ...props }, ref) => {
    if (leadingIcon || trailingIcon) {
      return (
        <div className="relative">
          {leadingIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              fieldBase,
              "h-10",
              leadingIcon ? "pl-9" : "px-3",
              trailingIcon ? "pr-9" : "px-3",
              error
                ? "border-error focus-visible:ring-error/30"
                : "border-border hover:border-border-strong focus-visible:border-primary",
              className,
            )}
            aria-invalid={error || undefined}
            {...props}
          />
          {trailingIcon && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {trailingIcon}
            </span>
          )}
        </div>
      );
    }
    return (
      <input
        ref={ref}
        className={cn(
          fieldBase,
          "h-10 px-3",
          error
            ? "border-error focus-visible:ring-error/30"
            : "border-border hover:border-border-strong focus-visible:border-primary",
          className,
        )}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  },
);
UIInput.displayName = "UIInput";

export interface UITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const UITextarea = forwardRef<HTMLTextAreaElement, UITextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          fieldBase,
          "min-h-[88px] resize-none px-3 py-2.5",
          error
            ? "border-error focus-visible:ring-error/30"
            : "border-border hover:border-border-strong focus-visible:border-primary",
          className,
        )}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  },
);
UITextarea.displayName = "UITextarea";
