import { cn } from "@/design-system/utils/cn";

export function MoneyAmount({
  value,
  currency = "DA",
  size = "default",
  muted = false,
  fractionDigits,
  className,
}: {
  value: number;
  currency?: string;
  size?: "default" | "large" | "compact";
  muted?: boolean;
  /** Force a fixed number of decimal places (e.g. 2 for "10,000.00 DA"). Omit to let Intl decide. */
  fractionDigits?: number;
  className?: string;
}) {
  const negative = value < 0;
  const formatted = new Intl.NumberFormat(
    "en-US",
    fractionDigits !== undefined ? { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits } : undefined,
  ).format(Math.abs(value));

  return (
    <span
      className={cn(
        "tabular-nums font-semibold",
        size === "large" ? "text-2xl" : size === "compact" ? "text-xs" : "text-sm",
        negative ? "text-error" : muted ? "text-text-muted" : "text-text-primary",
        className,
      )}
    >
      {negative && "-"}
      {formatted}{" "}
      <span className={cn("font-medium", negative ? "text-error" : muted ? "text-text-muted" : "text-text-secondary")}>
        {currency}
      </span>
    </span>
  );
}
