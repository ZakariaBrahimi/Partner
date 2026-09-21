import type { ReactNode } from "react";
import { CheckCircle2, Clock, RefreshCw, Undo2, XCircle } from "lucide-react";
import { UIBadge } from "../../ui/badge";
import type { BadgeTone } from "../core/badge";

/** Generic status indicator: tone + label + optional icon. Every domain
 * status (payment, refund, terminal, ...) composes this rather than
 * duplicating a styled badge. */
export function StatusBadge({ tone, label, icon }: { tone: BadgeTone; label: string; icon?: ReactNode }) {
  return (
    <UIBadge tone={tone} icon={icon}>
      {label}
    </UIBadge>
  );
}

export type PaymentStatus = "successful" | "pending" | "failed" | "processing" | "refunded";

const paymentStatusConfig: Record<PaymentStatus, { label: string; tone: BadgeTone; icon: ReactNode }> = {
  successful: { label: "Successful", tone: "success", icon: <CheckCircle2 className="size-3" aria-hidden="true" /> },
  pending: { label: "Pending", tone: "warning", icon: <Clock className="size-3" aria-hidden="true" /> },
  failed: { label: "Failed", tone: "error", icon: <XCircle className="size-3" aria-hidden="true" /> },
  processing: { label: "Refund processing", tone: "info", icon: <RefreshCw className="size-3" aria-hidden="true" /> },
  refunded: { label: "Refunded", tone: "neutral", icon: <Undo2 className="size-3" aria-hidden="true" /> },
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const config = paymentStatusConfig[status];
  return <StatusBadge tone={config.tone} label={config.label} icon={config.icon} />;
}
