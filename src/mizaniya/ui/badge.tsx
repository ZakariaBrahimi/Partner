import type { ReactNode } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/design-system/utils/cn";

export const badgeVariants = cva("inline-flex items-center gap-1.5 rounded-badge px-2.5 py-1 text-xs font-semibold", {
  variants: {
    tone: {
      neutral: "text-text-secondary bg-background border border-border",
      success: "text-success bg-success-soft",
      warning: "text-warning bg-warning-soft",
      error: "text-error bg-error-soft",
      info: "text-info bg-info-soft",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export function UIBadge({
  className,
  tone,
  icon,
  children,
}: VariantProps<typeof badgeVariants> & { className?: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <span className={cn(badgeVariants({ tone }), className)}>
      {icon}
      {children}
    </span>
  );
}
