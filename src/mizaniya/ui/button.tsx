"use client";

import { forwardRef } from "react";
import type { ReactNode } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

/**
 * Styled Base UI Button — the shadcn-equivalent primitive layer.
 * Feature code should not import this directly; use Mizaniya's Button
 * from `@/mizaniya` instead (see components/core/button.tsx).
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-button font-semibold transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface " +
    "disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white border border-primary hover:bg-primary-hover hover:border-primary-hover active:bg-primary-active active:border-primary-active disabled:bg-border-strong disabled:border-border-strong disabled:text-white",
        secondary:
          "bg-surface text-text-primary border border-border hover:bg-background hover:border-border-strong active:bg-surface-muted disabled:text-text-disabled disabled:bg-surface",
        tertiary:
          "bg-transparent text-primary border border-transparent hover:bg-primary-soft active:bg-primary-soft disabled:text-text-disabled",
        ghost:
          "bg-transparent text-text-secondary border border-transparent hover:bg-background hover:text-text-primary active:bg-surface-muted disabled:text-text-disabled",
        destructive:
          "bg-surface text-error border border-border hover:bg-error-soft hover:border-error active:bg-error-soft disabled:text-text-disabled disabled:bg-surface",
        link: "bg-transparent text-primary border-none underline-offset-4 hover:underline disabled:text-text-disabled p-0 h-auto",
      },
      size: {
        default: "h-10 px-4 text-sm gap-2",
        compact: "h-8 px-3 text-[13px] gap-1.5",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface UIButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const UIButton = forwardRef<HTMLElement, UIButtonProps>(
  ({ className, variant, size, loading, disabled, leadingIcon, trailingIcon, children, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        disabled={disabled || loading}
        focusableWhenDisabled={loading}
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : leadingIcon}
        {children}
        {!loading && trailingIcon}
      </BaseButton>
    );
  },
);
UIButton.displayName = "UIButton";
