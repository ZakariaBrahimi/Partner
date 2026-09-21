import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

export type AlertTone = "info" | "success" | "warning" | "error";

const toneConfig: Record<AlertTone, { icon: ReactNode; textClass: string; bgClass: string; borderClass: string }> = {
  info: { icon: <Info className="size-[18px]" aria-hidden="true" />, textClass: "text-info", bgClass: "bg-info-soft", borderClass: "border-info/20" },
  success: { icon: <CheckCircle2 className="size-[18px]" aria-hidden="true" />, textClass: "text-success", bgClass: "bg-success-soft", borderClass: "border-success/20" },
  warning: { icon: <AlertTriangle className="size-[18px]" aria-hidden="true" />, textClass: "text-warning", bgClass: "bg-warning-soft", borderClass: "border-warning/20" },
  error: { icon: <XCircle className="size-[18px]" aria-hidden="true" />, textClass: "text-error", bgClass: "bg-error-soft", borderClass: "border-error/20" },
};

export function Alert({
  tone = "info",
  title,
  description,
  action,
}: {
  tone?: AlertTone;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  const config = toneConfig[tone];
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cn("flex items-start gap-3 rounded-card border p-4", config.bgClass, config.borderClass)}>
      <span className={cn("mt-0.5 shrink-0", config.textClass)}>{config.icon}</span>
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm font-semibold", config.textClass)}>{title}</p>
        {description && <p className="mt-0.5 text-sm text-text-secondary">{description}</p>}
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}
