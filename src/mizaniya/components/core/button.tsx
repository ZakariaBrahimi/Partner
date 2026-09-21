"use client";

import { forwardRef } from "react";
import type { ReactNode } from "react";
import { UIButton } from "../../ui/button";
import type { UIButtonProps } from "../../ui/button";
import { cn } from "@/design-system/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "destructive" | "link";
export type ButtonSize = "default" | "compact";

export interface ButtonProps extends Omit<UIButtonProps, "variant" | "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Mizaniya's primary action control. Wraps Base UI's Button — feature code
 * should always use this rather than reaching into `mizaniya/ui` directly. */
export const Button = forwardRef<HTMLElement, ButtonProps>(({ variant = "primary", size = "default", ...props }, ref) => {
  return <UIButton ref={ref} variant={variant} size={size} {...props} />;
});
Button.displayName = "Button";

export interface IconButtonProps extends Omit<UIButtonProps, "variant" | "size" | "children"> {
  icon: ReactNode;
  label: string;
  variant?: "ghost" | "outline" | "destructive";
  size?: "default" | "compact";
}

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(
  ({ className, icon, label, variant = "ghost", size = "default", ...props }, ref) => {
    return (
      <UIButton
        ref={ref}
        aria-label={label}
        title={label}
        variant={variant === "outline" ? "secondary" : variant === "destructive" ? "destructive" : "ghost"}
        size="icon"
        className={cn(size === "compact" && "size-8", className)}
        {...props}
      >
        {icon}
      </UIButton>
    );
  },
);
IconButton.displayName = "IconButton";
