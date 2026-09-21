"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive";
export type ButtonSize = "default" | "compact";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white border border-primary hover:bg-primary-hover hover:border-primary-hover active:bg-primary-active active:border-primary-active disabled:bg-border-strong disabled:border-border-strong disabled:text-white",
  secondary:
    "bg-surface text-text-primary border border-border hover:bg-background hover:border-border-strong active:bg-disabled-background disabled:text-text-muted disabled:bg-surface",
  tertiary:
    "bg-transparent text-primary border border-transparent hover:bg-primary-soft active:bg-primary-soft disabled:text-text-muted",
  destructive:
    "bg-surface text-error border border-border hover:bg-error-soft hover:border-error active:bg-error-soft disabled:text-text-muted disabled:bg-surface",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 text-sm gap-2",
  compact: "h-8 px-3 text-[13px] gap-1.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      loading = false,
      disabled,
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-button font-semibold transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "disabled:cursor-not-allowed",
          "duration-[120ms]",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          leadingIcon
        )}
        {children}
        {!loading && trailingIcon}
      </button>
    );
  },
);
Button.displayName = "Button";

export const IconButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: ReactNode;
    label: string;
    variant?: "ghost" | "outline";
    size?: "default" | "compact";
  }
>(({ className, icon, label, variant = "ghost", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-button transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        "disabled:cursor-not-allowed disabled:opacity-40",
        size === "default" ? "size-10" : "size-8",
        variant === "ghost"
          ? "text-text-secondary hover:bg-background hover:text-text-primary"
          : "text-text-secondary border border-border bg-surface hover:bg-background hover:text-text-primary",
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
});
IconButton.displayName = "IconButton";
