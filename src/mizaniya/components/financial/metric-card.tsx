import type { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/design-system/utils/cn";
import { LoadingSkeleton } from "../data/states";
import { ACCENT_TINTS } from "../core/accent";
import type { AccentKey } from "../core/accent";

export function MetricCard({
  icon,
  title,
  value,
  trend,
  trendDirection = "up",
  comparison,
  accent = "primary",
}: {
  icon: ReactNode;
  title: string;
  value: ReactNode;
  trend?: string;
  trendDirection?: "up" | "down";
  comparison?: string;
  /** Icon chip color. Defaults to the brand primary; pass a vivid accent to
   * give a metric its own visual identity in a row of cards. */
  accent?: AccentKey;
}) {
  const positive = trendDirection === "up";
  const tint = ACCENT_TINTS[accent];
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className={cn("flex size-9 items-center justify-center rounded-[8px]", tint.bg, tint.text)}>{icon}</span>
        {trend && (
          <span className={cn("inline-flex items-center gap-0.5 text-xs font-semibold", positive ? "text-success" : "text-error")}>
            {positive ? <ArrowUp className="size-3" aria-hidden="true" /> : <ArrowDown className="size-3" aria-hidden="true" />}
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-text-secondary">{title}</p>
        <p className="mt-1 text-[26px] font-bold leading-tight tabular-nums text-text-primary">{value}</p>
      </div>
      {comparison && <p className="text-xs text-text-muted">{comparison}</p>}
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <LoadingSkeleton className="size-9 rounded-[8px]" />
        <LoadingSkeleton className="h-4 w-10" />
      </div>
      <div>
        <LoadingSkeleton className="h-3.5 w-24" />
        <LoadingSkeleton className="mt-2 h-7 w-20" />
      </div>
      <LoadingSkeleton className="h-3 w-28" />
    </div>
  );
}
