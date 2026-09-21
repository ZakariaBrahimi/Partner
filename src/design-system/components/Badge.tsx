import type { ReactNode } from "react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "../utils/cn";

export type StatusTone = "success" | "warning" | "error" | "info" | "neutral";

const toneClasses: Record<StatusTone, { textClass: string; bgClass: string }> = {
  success: { textClass: "text-success", bgClass: "bg-success-soft" },
  warning: { textClass: "text-warning", bgClass: "bg-warning-soft" },
  error: { textClass: "text-error", bgClass: "bg-error-soft" },
  info: { textClass: "text-info", bgClass: "bg-info-soft" },
  neutral: { textClass: "text-text-secondary", bgClass: "bg-background" },
};

/** Generic status indicator: tone + label + optional icon. Compose domain-specific
 * status badges (terminal status, transaction status, ...) on top of this. */
export function StatusBadge({
  tone,
  label,
  icon,
}: {
  tone: StatusTone;
  label: string;
  icon?: ReactNode;
}) {
  const config = toneClasses[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-badge px-2.5 py-1 text-xs font-semibold",
        config.textClass,
        config.bgClass,
      )}
    >
      {icon}
      {label}
    </span>
  );
}

export type TerminalStatus = "active" | "pending" | "disabled";

const terminalStatusConfig: Record<TerminalStatus, { label: string; tone: StatusTone; icon: ReactNode }> = {
  active: {
    label: "Active",
    tone: "success",
    icon: <CheckCircle2 className="size-3" aria-hidden="true" />,
  },
  pending: {
    label: "Pending",
    tone: "warning",
    icon: <Clock className="size-3" aria-hidden="true" />,
  },
  disabled: {
    label: "Disabled",
    tone: "error",
    icon: <XCircle className="size-3" aria-hidden="true" />,
  },
};

export function TerminalStatusBadge({ status }: { status: TerminalStatus }) {
  const config = terminalStatusConfig[status];
  return <StatusBadge tone={config.tone} label={config.label} icon={config.icon} />;
}

export type TerminalCategory = "classic" | "business";

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
  tone?: StatusTone;
}) {
  const config = toneClasses[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-badge px-2.5 py-1 text-xs font-semibold",
        config.textClass,
        tone === "neutral" ? "border border-border" : config.bgClass,
      )}
    >
      {children}
    </span>
  );
}
