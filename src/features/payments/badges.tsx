import type { ReactNode } from "react";
import { CheckCircle2, Clock, Globe, Link2, QrCode, RefreshCw, SmartphoneNfc, Undo2, XCircle } from "lucide-react";
import { StatusBadge } from "@/mizaniya";
import type { BadgeTone } from "@/mizaniya/components/core/badge";
import type { TransactionSource, TransactionStatus } from "./types";

const statusConfig: Record<
  TransactionStatus,
  { label: string; tone: BadgeTone; icon: ReactNode }
> = {
  successful: {
    label: "Successful",
    tone: "success",
    icon: <CheckCircle2 className="size-3" aria-hidden="true" />,
  },
  pending: {
    label: "Pending",
    tone: "warning",
    icon: <Clock className="size-3" aria-hidden="true" />,
  },
  failed: {
    label: "Failed",
    tone: "error",
    icon: <XCircle className="size-3" aria-hidden="true" />,
  },
  refund_processing: {
    label: "Refund processing",
    tone: "info",
    icon: <RefreshCw className="size-3" aria-hidden="true" />,
  },
  refunded: {
    label: "Refunded",
    tone: "neutral",
    icon: <Undo2 className="size-3" aria-hidden="true" />,
  },
};

export function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  const config = statusConfig[status];
  return <StatusBadge tone={config.tone} label={config.label} icon={config.icon} />;
}

const sourceConfig: Record<TransactionSource, { label: string; icon: ReactNode }> = {
  vtpe: { label: "vTPE", icon: <SmartphoneNfc className="size-3.5" aria-hidden="true" /> },
  qr: { label: "QR Code", icon: <QrCode className="size-3.5" aria-hidden="true" /> },
  payment_link: { label: "Payment Link", icon: <Link2 className="size-3.5" aria-hidden="true" /> },
  api: { label: "API", icon: <Globe className="size-3.5" aria-hidden="true" /> },
};

export function SourceLabel({ source, terminal }: { source: TransactionSource; terminal: string | null }) {
  const config = sourceConfig[source];
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
      <span className="flex size-6 items-center justify-center rounded-[6px] border border-border bg-background text-text-secondary">
        {config.icon}
      </span>
      {source === "vtpe" && terminal ? `vTPE / ${terminal}` : config.label}
    </span>
  );
}

export function sourceLabelText(source: TransactionSource, terminal: string | null) {
  return source === "vtpe" && terminal ? `vTPE / ${terminal}` : sourceConfig[source].label;
}
