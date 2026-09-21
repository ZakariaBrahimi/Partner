import { Area, AreaChart as RAreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "./chart-container";
import { ChartTooltip } from "./chart-tooltip";
import { chartColors, chartSeriesOrder } from "./colors";
import type { ChartSeries } from "./line-chart";

export function AreaChart<T extends object>({
  data,
  xKey,
  series,
  height = 220,
}: {
  data: T[];
  xKey: keyof T & string;
  series: ChartSeries[];
  height?: number;
}) {
  return (
    <ChartContainer height={height}>
      <RAreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s, i) => {
            const color = chartColors[s.colorKey ?? chartSeriesOrder[i % chartSeriesOrder.length]];
            return (
              <linearGradient key={s.key} id={`mz-area-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            );
          })}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} vertical={false} />
        <XAxis dataKey={(row: T) => row[xKey]} tick={{ fontSize: 11, fill: chartColors.textMuted }} axisLine={{ stroke: chartColors.border }} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: chartColors.textMuted }} axisLine={false} tickLine={false} width={40} />
        <Tooltip content={ChartTooltip} />
        {series.map((s, i) => {
          const color = chartColors[s.colorKey ?? chartSeriesOrder[i % chartSeriesOrder.length]];
          return (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={color}
              strokeWidth={2}
              fill={`url(#mz-area-${s.key})`}
            />
          );
        })}
      </RAreaChart>
    </ChartContainer>
  );
}
