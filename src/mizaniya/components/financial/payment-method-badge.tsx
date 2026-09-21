import type { ReactNode } from "react";
import { CreditCard, HelpCircle, Landmark, Smartphone, Wallet } from "lucide-react";

export type PaymentMethod = "wallet" | "cib" | "edahabia" | "bank_transfer" | "other";

const config: Record<PaymentMethod, { label: string; icon: ReactNode }> = {
  wallet: { label: "Mizaniya Wallet", icon: <Wallet className="size-3.5" aria-hidden="true" /> },
  cib: { label: "CIB", icon: <CreditCard className="size-3.5" aria-hidden="true" /> },
  edahabia: { label: "EDAHABIA", icon: <Smartphone className="size-3.5" aria-hidden="true" /> },
  bank_transfer: { label: "Bank Transfer", icon: <Landmark className="size-3.5" aria-hidden="true" /> },
  other: { label: "Other", icon: <HelpCircle className="size-3.5" aria-hidden="true" /> },
};

export function PaymentMethodBadge({ method }: { method: PaymentMethod }) {
  const c = config[method];
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
      <span className="flex size-6 items-center justify-center rounded-[6px] border border-border bg-background text-text-secondary">
        {c.icon}
      </span>
      {c.label}
    </span>
  );
}
