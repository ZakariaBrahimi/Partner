import { CheckCircle2, TrendingUp, Undo2, Wallet, XCircle } from "lucide-react";
import { MetricCard } from "@/design-system/components/MetricCard";
import { pctChange } from "./stats";
import type { PaymentMetrics as PaymentMetricsData } from "./stats";

function trend(current: number, previous: number) {
  const change = pctChange(current, previous);
  if (change === null) return { trend: undefined, direction: "up" as const };
  return {
    trend: `${Math.abs(change).toFixed(1)}%`,
    direction: (change >= 0 ? "up" : "down") as "up" | "down",
  };
}

export function PaymentMetrics({
  current,
  previous,
}: {
  current: PaymentMetricsData;
  previous: PaymentMetricsData;
}) {
  const volumeTrend = trend(current.totalVolume, previous.totalVolume);
  const avgTrend =
    current.avgValue !== null && previous.avgValue !== null
      ? trend(current.avgValue, previous.avgValue)
      : { trend: undefined, direction: "up" as const };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <MetricCard
        icon={<Wallet className="size-[18px]" aria-hidden="true" />}
        title="Total payment volume"
        value={`${new Intl.NumberFormat("en-US").format(current.totalVolume)} DA`}
        trend={volumeTrend.trend}
        trendDirection={volumeTrend.direction}
        comparison="vs previous period"
      />
      <MetricCard
        icon={<CheckCircle2 className="size-[18px]" aria-hidden="true" />}
        title="Successful payments"
        value={new Intl.NumberFormat("en-US").format(current.successfulCount)}
        comparison={
          current.successRate !== null ? `${current.successRate.toFixed(1)}% success rate` : "No data yet"
        }
      />
      <MetricCard
        icon={<XCircle className="size-[18px]" aria-hidden="true" />}
        title="Failed payments"
        value={new Intl.NumberFormat("en-US").format(current.failedCount)}
        comparison={
          current.totalCount > 0
            ? `${((current.failedCount / current.totalCount) * 100).toFixed(1)}% of transactions`
            : "No data yet"
        }
      />
      <MetricCard
        icon={<Undo2 className="size-[18px]" aria-hidden="true" />}
        title="Refunds"
        value={`${new Intl.NumberFormat("en-US").format(current.refundedVolume)} DA`}
        comparison={`${current.refundedCount} refund${current.refundedCount === 1 ? "" : "s"}`}
      />
      <MetricCard
        icon={<TrendingUp className="size-[18px]" aria-hidden="true" />}
        title="Average payment value"
        value={current.avgValue !== null ? `${new Intl.NumberFormat("en-US").format(Math.round(current.avgValue))} DA` : "—"}
        trend={avgTrend.trend}
        trendDirection={avgTrend.direction}
        comparison="vs previous period"
      />
    </div>
  );
}
