export interface BarChartPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

/** Minimal two-series bar chart (a lighter "total" bar with a primary-colored
 * "highlighted" bar layered inside it) — intentionally restrained, no
 * gridlines or decoration. Reusable anywhere a page needs a compact
 * volume-over-time view. */
export function BarChart({
  data,
  valueLabel = "Total",
  secondaryLabel,
  currency = "DA",
  maxLabels = 10,
}: {
  data: BarChartPoint[];
  valueLabel?: string;
  secondaryLabel?: string;
  currency?: string;
  maxLabels?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const labelStep = Math.max(1, Math.ceil(data.length / maxLabels));

  return (
    <div>
      {secondaryLabel && (
        <div className="mb-3 flex items-center gap-4 text-xs text-text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-[2px] bg-border-strong" aria-hidden="true" />
            {valueLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-[2px] bg-primary" aria-hidden="true" />
            {secondaryLabel}
          </span>
        </div>
      )}
      <div className="flex h-36 items-end gap-1" role="img" aria-label={`${valueLabel} by period`}>
        {data.map((d, i) => (
          <div
            key={i}
            className="group relative flex h-full flex-1 items-end"
            title={`${d.label}: ${d.value.toLocaleString("en-US")} ${currency}${
              d.secondaryValue !== undefined
                ? ` (${d.secondaryValue.toLocaleString("en-US")} ${currency} ${secondaryLabel?.toLowerCase()})`
                : ""
            }`}
          >
            <div
              className="relative w-full min-h-[2px] rounded-t-[3px] bg-border-strong transition-colors group-hover:bg-border-strong/80"
              style={{ height: `${Math.max((d.value / max) * 100, 1)}%` }}
            >
              {d.secondaryValue !== undefined && (
                <div
                  className="absolute bottom-0 w-full rounded-t-[3px] bg-primary"
                  style={{ height: `${Math.min((d.secondaryValue / (d.value || 1)) * 100, 100)}%` }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-text-muted">
        {data.map((d, i) =>
          i % labelStep === 0 ? <span key={i}>{d.label}</span> : <span key={i} aria-hidden="true" />,
        )}
      </div>
    </div>
  );
}
