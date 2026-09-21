import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { ChartContainer } from "./chart-container";
import { ChartTooltip } from "./chart-tooltip";
import { chartColors, chartSeriesOrder } from "./colors";

export interface DonutSlice {
  label: string;
  value: number;
  colorKey?: keyof typeof chartColors;
}

export function DonutChart({ data, height = 220 }: { data: DonutSlice[]; height?: number }) {
  return (
    <ChartContainer height={height}>
      <PieChart>
        <Tooltip content={ChartTooltip} />
        <Pie data={data} dataKey="value" nameKey="label" innerRadius="65%" outerRadius="90%" paddingAngle={2} strokeWidth={0}>
          {data.map((slice, i) => (
            <Cell key={slice.label} fill={chartColors[slice.colorKey ?? chartSeriesOrder[i % chartSeriesOrder.length]]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
