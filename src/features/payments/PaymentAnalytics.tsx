"use client";

import { useState } from "react";
import { cn } from "@/mizaniya";
import { AreaChart, DonutChart } from "@/mizaniya";
import type { ChartGranularity, DateWindow, OutcomeBreakdownRow } from "./stats";
import { buildVolumeSeries } from "./stats";
import type { Transaction } from "./types";

const GRANULARITY_OPTIONS: { value: ChartGranularity; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const outcomeToneClasses: Record<OutcomeBreakdownRow["status"], string> = {
  successful: "bg-success",
  pending: "bg-warning",
  failed: "bg-error",
  refund_processing: "bg-info",
  refunded: "bg-text-muted",
};

const outcomeChartColorKey: Record<OutcomeBreakdownRow["status"], "success" | "warning" | "error" | "info" | "neutral"> = {
  successful: "success",
  pending: "warning",
  failed: "error",
  refund_processing: "info",
  refunded: "neutral",
};

export function PaymentAnalytics({
  transactions,
  window,
  outcomes,
}: {
  transactions: Transaction[];
  window: DateWindow;
  outcomes: OutcomeBreakdownRow[];
}) {
  const [granularity, setGranularity] = useState<ChartGranularity>("daily");
  const series = buildVolumeSeries(transactions, window, granularity);
  const donutData = outcomes
    .filter((row) => row.count > 0)
    .map((row) => ({ label: row.label, value: row.count, colorKey: outcomeChartColorKey[row.status] }));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
      <div className="rounded-card border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text-primary">Payment volume</h2>
          <div className="flex items-center gap-0.5 rounded-[8px] border border-border bg-background p-0.5">
            {GRANULARITY_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setGranularity(option.value)}
                className={cn(
                  "rounded-[6px] px-2.5 py-1 text-xs font-medium transition-colors",
                  granularity === option.value ? "bg-surface text-text-primary shadow-xs" : "text-text-secondary hover:text-text-primary",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <AreaChart
            data={series}
            xKey="label"
            series={[
              { key: "total", label: "Total volume", colorKey: "neutral" },
              { key: "successful", label: "Successful", colorKey: "primary" },
            ]}
          />
        </div>
      </div>

      <div className="rounded-card border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold text-text-primary">Payment outcomes</h2>
        {donutData.length > 0 && (
          <div className="mt-2 flex justify-center">
            <DonutChart data={donutData} height={140} />
          </div>
        )}
        <div className="mt-4 flex flex-col gap-4">
          {outcomes.map((row) => (
            <div key={row.status}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-text-primary">{row.label}</span>
                <span className="tabular-nums text-text-secondary">
                  {row.count.toLocaleString("en-US")}
                  <span className="ml-1.5 text-text-muted">{row.percentage.toFixed(1)}%</span>
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-badge bg-background">
                <div className={cn("h-full rounded-badge", outcomeToneClasses[row.status])} style={{ width: `${Math.max(row.percentage, row.count > 0 ? 2 : 0)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
