import type { ReactElement } from "react";
import { ResponsiveContainer } from "recharts";

export function ChartContainer({ height = 220, children }: { height?: number; children: ReactElement }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      {children}
    </ResponsiveContainer>
  );
}
