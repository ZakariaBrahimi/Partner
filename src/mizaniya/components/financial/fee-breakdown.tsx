import { cn } from "@/design-system/utils/cn";
import { MoneyAmount } from "./money-amount";

export interface FeeBreakdownRow {
  label: string;
  value: number | null;
  strong?: boolean;
}

/** Amount → fees → net amount breakdown. Pass `null` for a row whose value
 * isn't available rather than fabricating a number. */
export function FeeBreakdown({ rows, currency = "DA" }: { rows: FeeBreakdownRow[]; currency?: string }) {
  return (
    <div className="flex flex-col rounded-card border border-border">
      {rows.map((row, i) => (
        <div key={row.label} className={cn("flex items-center justify-between px-4 py-3", i > 0 && "border-t border-border", row.strong && "bg-background")}>
          <span className={cn("text-sm", row.strong ? "font-semibold text-text-primary" : "text-text-secondary")}>{row.label}</span>
          {row.value === null ? (
            <span className="text-sm text-text-muted">Not available</span>
          ) : (
            <MoneyAmount value={row.value} currency={currency} fractionDigits={2} className={row.strong ? undefined : "font-medium"} />
          )}
        </div>
      ))}
    </div>
  );
}
