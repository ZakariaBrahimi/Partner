import type { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "../utils/cn";

export function MetricCard({
  icon,
  title,
  value,
  trend,
  trendDirection = "up",
  comparison,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  trend?: string;
  trendDirection?: "up" | "down";
  comparison?: string;
}) {
  const positive = trendDirection === "up";
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="flex size-9 items-center justify-center rounded-[8px] bg-primary-soft text-primary">
          {icon}
        </span>
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold",
              positive ? "text-success" : "text-error",
            )}
          >
            {positive ? (
              <ArrowUp className="size-3" aria-hidden="true" />
            ) : (
              <ArrowDown className="size-3" aria-hidden="true" />
            )}
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-text-secondary">{title}</p>
        <p className="mt-1 text-[26px] font-bold leading-tight tabular-nums text-text-primary">
          {value}
        </p>
      </div>
      {comparison && <p className="text-xs text-text-muted">{comparison}</p>}
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <div className="size-9 animate-pulse rounded-[8px] bg-background" />
        <div className="h-4 w-10 animate-pulse rounded bg-background" />
      </div>
      <div>
        <div className="h-3.5 w-24 animate-pulse rounded bg-background" />
        <div className="mt-2 h-7 w-20 animate-pulse rounded bg-background" />
      </div>
      <div className="h-3 w-28 animate-pulse rounded bg-background" />
    </div>
  );
}
