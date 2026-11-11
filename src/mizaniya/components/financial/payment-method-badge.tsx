import type { ReactNode } from "react";
import { CreditCard, HelpCircle, Landmark, Smartphone, Wallet } from "lucide-react";
import { cn } from "@/design-system/utils/cn";
import { ACCENT_TINTS } from "../core/accent";
import type { AccentKey } from "../core/accent";

export type PaymentMethod = "wallet" | "cib" | "edahabia" | "bank_transfer" | "other";

const config: Record<PaymentMethod, { label: string; icon: ReactNode; accent: AccentKey }> = {
  wallet: { label: "Mizaniya Wallet", icon: <Wallet className="size-3.5" aria-hidden="true" />, accent: "violet" },
  cib: { label: "CIB", icon: <CreditCard className="size-3.5" aria-hidden="true" />, accent: "sky" },
  edahabia: { label: "EDAHABIA", icon: <Smartphone className="size-3.5" aria-hidden="true" />, accent: "teal" },
  bank_transfer: { label: "Bank Transfer", icon: <Landmark className="size-3.5" aria-hidden="true" />, accent: "orange" },
  other: { label: "Other", icon: <HelpCircle className="size-3.5" aria-hidden="true" />, accent: "neutral" },
};

/** Lets callers (e.g. a volume bar per method) reuse the same identity color. */
export function paymentMethodAccent(method: PaymentMethod): AccentKey {
  return config[method].accent;
}

export function PaymentMethodBadge({ method }: { method: PaymentMethod }) {
  const c = config[method];
  const tint = ACCENT_TINTS[c.accent];
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
      <span className={cn("flex size-6 items-center justify-center rounded-[6px]", tint.bg, tint.text)}>{c.icon}</span>
      {c.label}
    </span>
  );
}
