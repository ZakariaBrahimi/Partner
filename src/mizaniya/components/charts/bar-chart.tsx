import { Bar, BarChart as RBarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "./chart-container";
import { ChartTooltip } from "./chart-tooltip";
import { chartColors, chartSeriesOrder } from "./colors";
import type { ChartSeries } from "./line-chart";

export function BarChart<T extends object>({
  data,
  xKey,
  series,
  height = 220,
  stacked = false,
}: {
  data: T[];
  xKey: keyof T & string;
  series: ChartSeries[];
  height?: number;
  stacked?: boolean;
}) {
  return (
    <ChartContainer height={height}>
      <RBarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} vertical={false} />
        <XAxis dataKey={(row: T) => row[xKey]} tick={{ fontSize: 11, fill: chartColors.textMuted }} axisLine={{ stroke: chartColors.border }} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: chartColors.textMuted }} axisLine={false} tickLine={false} width={40} />
        <Tooltip content={ChartTooltip} cursor={{ fill: chartColors.border, opacity: 0.3 }} />
        {series.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            fill={chartColors[s.colorKey ?? chartSeriesOrder[i % chartSeriesOrder.length]]}
            radius={stacked ? [0, 0, 0, 0] : [3, 3, 0, 0]}
            stackId={stacked ? "stack" : undefined}
            maxBarSize={28}
          />
        ))}
      </RBarChart>
    </ChartContainer>
  );
}
