import type { ReactNode } from "react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "../utils/cn";

export type TerminalStatus = "active" | "pending" | "disabled";
export type TerminalCategory = "classic" | "business";

const statusConfig: Record<
  TerminalStatus,
  { label: string; textClass: string; bgClass: string; icon: ReactNode }
> = {
  active: {
    label: "Active",
    textClass: "text-success",
    bgClass: "bg-success-soft",
    icon: <CheckCircle2 className="size-3" aria-hidden="true" />,
  },
  pending: {
    label: "Pending",
    textClass: "text-warning",
    bgClass: "bg-warning-soft",
    icon: <Clock className="size-3" aria-hidden="true" />,
  },
  disabled: {
    label: "Disabled",
    textClass: "text-error",
    bgClass: "bg-error-soft",
    icon: <XCircle className="size-3" aria-hidden="true" />,
  },
};

export function StatusBadge({ status }: { status: TerminalStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-badge px-2.5 py-1 text-xs font-semibold",
        config.textClass,
        config.bgClass,
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
}

const categoryConfig: Record<TerminalCategory, { label: string; textClass: string; bgClass: string }> = {
  classic: {
    label: "Classic",
    textClass: "text-category-classic",
    bgClass: "bg-category-classic-soft",
  },
  business: {
    label: "Business",
    textClass: "text-category-business",
    bgClass: "bg-category-business-soft",
  },
};

export function CategoryBadge({ category }: { category: TerminalCategory }) {
  const config = categoryConfig[category];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-badge px-2.5 py-1 text-xs font-semibold",
        config.textClass,
        config.bgClass,
      )}
    >
      {config.label}
    </span>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "error" | "info";
}) {
  const tones: Record<string, string> = {
    neutral: "text-text-secondary bg-background border border-border",
    success: "text-success bg-success-soft",
    warning: "text-warning bg-warning-soft",
    error: "text-error bg-error-soft",
    info: "text-info bg-info-soft",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-badge px-2.5 py-1 text-xs font-semibold",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
