interface ChartTooltipPayloadEntry {
  color?: string;
  name?: string | number;
  value?: unknown;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: readonly ChartTooltipPayloadEntry[];
  label?: string | number;
}

/** Shared tooltip content for every Mizaniya chart — surface/border tokens
 * instead of Recharts' default styling, tabular numerals for values. */
export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-[8px] border border-border bg-surface px-3 py-2 shadow-dropdown">
      {label !== undefined && <p className="mb-1 text-xs font-medium text-text-muted">{label}</p>}
      <div className="flex flex-col gap-0.5">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="size-2 rounded-full" style={{ backgroundColor: entry.color }} aria-hidden="true" />
            <span className="text-text-secondary">{entry.name}</span>
            <span className="ml-auto font-semibold tabular-nums text-text-primary">
              {typeof entry.value === "number" ? entry.value.toLocaleString("en-US") : String(entry.value ?? "")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
