import { MoneyAmount, PaymentMethodBadge } from "@/design-system/components/Financial";
import type { MethodBreakdownRow } from "./stats";

export function PaymentMethods({ rows }: { rows: MethodBreakdownRow[] }) {
  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <h2 className="text-sm font-semibold text-text-primary">Payment methods</h2>
      <div className="mt-4 flex flex-col divide-y divide-border">
        {rows.map((row) => (
          <div key={row.method} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center justify-between gap-3 sm:w-40 sm:shrink-0">
              <PaymentMethodBadge method={row.method} />
              <span className="text-xs text-text-muted sm:hidden">
                {row.count} txn{row.count === 1 ? "" : "s"} · {row.percentage.toFixed(0)}%
              </span>
            </div>
            <div className="flex-1">
              <div className="h-1.5 w-full overflow-hidden rounded-badge bg-background">
                <div
                  className="h-full rounded-badge bg-primary"
                  style={{ width: `${Math.max(row.percentage, 2)}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 sm:w-44 sm:shrink-0 sm:justify-end">
              <MoneyAmount value={row.volume} size="default" />
              <span className="hidden text-xs text-text-muted sm:inline">
                {row.count} txn{row.count === 1 ? "" : "s"} · {row.percentage.toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
