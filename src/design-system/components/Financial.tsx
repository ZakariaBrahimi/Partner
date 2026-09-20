import { Landmark, Wallet } from "lucide-react";
import { cn } from "../utils/cn";

export function MoneyAmount({
  value,
  currency = "DA",
  size = "default",
  muted = false,
  className,
}: {
  value: number;
  currency?: string;
  size?: "default" | "large";
  muted?: boolean;
  className?: string;
}) {
  const formatted = new Intl.NumberFormat("en-US").format(value);
  return (
    <span
      className={cn(
        "tabular-nums font-semibold",
        size === "large" ? "text-2xl" : "text-sm",
        muted ? "text-text-muted" : "text-text-primary",
        className,
      )}
    >
      {formatted}{" "}
      <span className={cn("font-medium", muted ? "text-text-muted" : "text-text-secondary")}>
        {currency}
      </span>
    </span>
  );
}

export type SettlementType = "balance" | "existing_bank_account" | "new_bank_account";

export function SettlementMethod({ type }: { type: SettlementType }) {
  const isBalance = type === "balance";
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
      {isBalance ? (
        <Wallet className="size-3.5 text-text-muted" aria-hidden="true" />
      ) : (
        <Landmark className="size-3.5 text-text-muted" aria-hidden="true" />
      )}
      {isBalance ? "My Balance" : "Bank Account"}
    </span>
  );
}
