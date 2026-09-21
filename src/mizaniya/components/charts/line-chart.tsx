import { CartesianGrid, Line, LineChart as RLineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "./chart-container";
import { ChartTooltip } from "./chart-tooltip";
import { chartColors, chartSeriesOrder } from "./colors";

export interface ChartSeries {
  key: string;
  label: string;
  colorKey?: keyof typeof chartColors;
}

export function LineChart<T extends object>({
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
      <RLineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} vertical={false} />
        <XAxis dataKey={(row: T) => row[xKey]} tick={{ fontSize: 11, fill: chartColors.textMuted }} axisLine={{ stroke: chartColors.border }} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: chartColors.textMuted }} axisLine={false} tickLine={false} width={40} />
        <Tooltip content={ChartTooltip} />
        {series.map((s, i) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={chartColors[s.colorKey ?? chartSeriesOrder[i % chartSeriesOrder.length]]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </RLineChart>
    </ChartContainer>
  );
}
