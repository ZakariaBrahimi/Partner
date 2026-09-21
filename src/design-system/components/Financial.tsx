import type { ReactNode } from "react";
import { CreditCard, HelpCircle, Landmark, Smartphone, Wallet } from "lucide-react";
import { cn } from "../utils/cn";

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
  size?: "default" | "large";
  muted?: boolean;
  /** Force a fixed number of decimal places (e.g. 2 for "10,000.00 DA"). Omit to let Intl decide. */
  fractionDigits?: number;
  className?: string;
}) {
  const formatted = new Intl.NumberFormat(
    "en-US",
    fractionDigits !== undefined
      ? { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }
      : undefined,
  ).format(value);
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

export type PaymentMethod = "wallet" | "cib" | "edahabia" | "bank_transfer" | "other";

const paymentMethodConfig: Record<PaymentMethod, { label: string; icon: ReactNode }> = {
  wallet: { label: "Mizaniya Wallet", icon: <Wallet className="size-3.5" aria-hidden="true" /> },
  cib: { label: "CIB", icon: <CreditCard className="size-3.5" aria-hidden="true" /> },
  edahabia: { label: "EDAHABIA", icon: <Smartphone className="size-3.5" aria-hidden="true" /> },
  bank_transfer: { label: "Bank Transfer", icon: <Landmark className="size-3.5" aria-hidden="true" /> },
  other: { label: "Other", icon: <HelpCircle className="size-3.5" aria-hidden="true" /> },
};

/** Icon + label indicator for the payment method used on a transaction. */
export function PaymentMethodBadge({ method }: { method: PaymentMethod }) {
  const config = paymentMethodConfig[method];
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
      <span className="flex size-6 items-center justify-center rounded-[6px] border border-border bg-background text-text-secondary">
        {config.icon}
      </span>
      {config.label}
    </span>
  );
}

export interface FeeBreakdownRow {
  label: string;
  value: number | null;
  strong?: boolean;
}

/** Amount → fees → net amount breakdown. Pass `null` for a row whose value
 * isn't available rather than fabricating a number. */
export function FeeBreakdown({ rows, currency = "DA" }: { rows: FeeBreakdownRow[]; currency?: string }) {
  return (
    <div className="flex flex-col rounded-card border border-border">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={cn(
            "flex items-center justify-between px-4 py-3",
            i > 0 && "border-t border-border",
            row.strong && "bg-background",
          )}
        >
          <span className={cn("text-sm", row.strong ? "font-semibold text-text-primary" : "text-text-secondary")}>
            {row.label}
          </span>
          {row.value === null ? (
            <span className="text-sm text-text-muted">Not available</span>
          ) : (
            <MoneyAmount
              value={row.value}
              currency={currency}
              fractionDigits={2}
              className={row.strong ? undefined : "font-medium"}
            />
          )}
        </div>
      ))}
    </div>
  );
}
