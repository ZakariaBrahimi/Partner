import type { ReactNode } from "react";
import { CheckCircle2, Clock, Landmark, Wallet, XCircle } from "lucide-react";
import { Badge, StatusBadge } from "@/mizaniya";
import type { BadgeTone } from "@/mizaniya";
import type { SettlementType, TerminalCategory, TerminalStatus } from "./types";

const terminalStatusConfig: Record<TerminalStatus, { label: string; tone: BadgeTone; icon: ReactNode }> = {
  active: { label: "Active", tone: "success", icon: <CheckCircle2 className="size-3" aria-hidden="true" /> },
  pending: { label: "Pending", tone: "warning", icon: <Clock className="size-3" aria-hidden="true" /> },
  disabled: { label: "Disabled", tone: "error", icon: <XCircle className="size-3" aria-hidden="true" /> },
};

export function TerminalStatusBadge({ status }: { status: TerminalStatus }) {
  const config = terminalStatusConfig[status];
  return <StatusBadge tone={config.tone} label={config.label} icon={config.icon} />;
}

export function CategoryBadge({ category }: { category: TerminalCategory }) {
  return <Badge tone={category === "business" ? "info" : "neutral"}>{category === "business" ? "Business" : "Classic"}</Badge>;
}

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
