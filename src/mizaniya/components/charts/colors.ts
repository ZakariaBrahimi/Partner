/**
 * Chart color palette. Recharts needs literal color strings (SVG fill/stroke
 * can't resolve CSS custom properties reliably across the library's
 * internals), so these mirror the hex values in `design-system/tokens.css`
 * exactly — keep the two in sync if the palette changes.
 */
export const chartColors = {
  primary: "#145A78",
  success: "#168A55",
  warning: "#B66A00",
  error: "#C83C3C",
  info: "#2767A5",
  neutral: "#8B96A1",
  border: "#E2E7EB",
  textMuted: "#5F6B76",
  violet: "#7C3AED",
  sky: "#0EA5E9",
  teal: "#0D9488",
  orange: "#F97316",
  pink: "#EC4899",
} as const;

export type ChartColorKey = keyof typeof chartColors;

export const chartSeriesOrder: ChartColorKey[] = ["teal", "violet", "sky", "orange", "pink", "primary", "success", "warning", "error", "neutral"];
