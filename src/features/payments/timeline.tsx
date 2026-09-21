import type { TimelineStep } from "@/design-system/components/Timeline";
import { CheckCircle2, Clock, RefreshCw, Undo2, XCircle } from "lucide-react";
import { formatFullDateTime } from "./format";
import type { Transaction } from "./types";

export function buildTransactionTimeline(t: Transaction): TimelineStep[] {
  const steps: TimelineStep[] = [
    {
      id: "initiated",
      label: "Payment initiated",
      timestamp: formatFullDateTime(t.createdAt),
      tone: "info",
    },
  ];

  if (t.status === "failed") {
    steps.push({
      id: "failed",
      label: "Payment failed",
      timestamp: t.completedAt ? formatFullDateTime(t.completedAt) : formatFullDateTime(t.createdAt),
      tone: "error",
      icon: <XCircle className="size-2.5 text-white" aria-hidden="true" />,
    });
    return steps;
  }

  if (t.status === "pending") {
    steps.push({
      id: "pending",
      label: "Awaiting confirmation",
      tone: "warning",
      icon: <Clock className="size-2.5 text-white" aria-hidden="true" />,
    });
    return steps;
  }

  steps.push({
    id: "completed",
    label: "Payment completed",
    timestamp: t.completedAt ? formatFullDateTime(t.completedAt) : undefined,
    tone: "success",
    icon: <CheckCircle2 className="size-2.5 text-white" aria-hidden="true" />,
  });

  if (t.status === "refund_processing") {
    steps.push({
      id: "refund_requested",
      label: "Refund requested",
      timestamp: t.refund.requestedAt ? formatFullDateTime(t.refund.requestedAt) : undefined,
      description: "The refund is being processed. We'll update the transaction once it's completed.",
      tone: "info",
      icon: <RefreshCw className="size-2.5 text-white" aria-hidden="true" />,
    });
  }

  if (t.status === "refunded") {
    steps.push({
      id: "refund_requested",
      label: "Refund requested",
      timestamp: t.refund.requestedAt ? formatFullDateTime(t.refund.requestedAt) : undefined,
      tone: "info",
      icon: <RefreshCw className="size-2.5 text-white" aria-hidden="true" />,
    });
    steps.push({
      id: "refund_completed",
      label: "Refund completed",
      timestamp: t.refund.completedAt ? formatFullDateTime(t.refund.completedAt) : undefined,
      tone: "neutral",
      icon: <Undo2 className="size-2.5 text-white" aria-hidden="true" />,
    });
  }

  return steps;
}
