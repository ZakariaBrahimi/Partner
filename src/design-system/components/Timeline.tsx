import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export interface TimelineStep {
  id: string;
  label: string;
  timestamp?: string;
  description?: string;
  tone?: "success" | "warning" | "error" | "info" | "neutral";
  icon?: ReactNode;
}

const toneDot: Record<NonNullable<TimelineStep["tone"]>, string> = {
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-info",
  neutral: "bg-border-strong",
};

/** Generic chronological timeline — used for transaction lifecycles, refund
 * history, or any other ordered sequence of dated events. */
export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const tone = step.tone ?? "neutral";
        return (
          <li key={step.id} className="relative flex gap-3 pb-6 last:pb-0">
            {!isLast && (
              <span className="absolute left-[7px] top-4 h-full w-px bg-border" aria-hidden="true" />
            )}
            <span
              className={cn("relative z-10 mt-1 flex size-[15px] shrink-0 items-center justify-center rounded-full", toneDot[tone])}
            >
              {step.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text-primary">{step.label}</p>
              {step.timestamp && <p className="text-xs text-text-muted">{step.timestamp}</p>}
              {step.description && (
                <p className="mt-0.5 text-xs text-text-secondary">{step.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
