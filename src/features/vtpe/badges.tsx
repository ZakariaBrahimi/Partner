import type { ReactNode } from "react";
import { CheckCircle2, Clock, Landmark, Wallet, XCircle } from "lucide-react";
import { ACCENT_TINTS, Badge, StatusBadge } from "@/mizaniya";
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
  const tone: BadgeTone = category === "business" ? "violet" : "sky";
  return <Badge tone={tone}>{category === "business" ? "Business" : "Classic"}</Badge>;
}

export function SettlementMethod({ type }: { type: SettlementType }) {
  const isBalance = type === "balance";
  const tint = ACCENT_TINTS[isBalance ? "teal" : "orange"];
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
      <span className={`flex size-5 items-center justify-center rounded-[5px] ${tint.bg} ${tint.text}`}>
        {isBalance ? <Wallet className="size-3" aria-hidden="true" /> : <Landmark className="size-3" aria-hidden="true" />}
      </span>
      {isBalance ? "My Balance" : "Bank Account"}
    </span>
  );
}
