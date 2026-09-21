import type { HTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/design-system/utils/cn";

export const cardVariants = cva("rounded-card", {
  variants: {
    variant: {
      default: "border border-border bg-surface",
      interactive:
        "border border-border bg-surface transition-colors hover:border-border-strong hover:bg-background cursor-pointer",
      outlined: "border border-border bg-transparent",
      muted: "border border-border bg-surface-muted",
    },
  },
  defaultVariants: { variant: "default" },
});

export function UICard({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
}
