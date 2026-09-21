import { formatFullDateTime } from "./format";
import { sourceLabelText } from "./badges";
import type { Transaction } from "./types";

const METHOD_LABELS: Record<Transaction["paymentMethod"], string> = {
  wallet: "Mizaniya Wallet",
  cib: "CIB",
  edahabia: "EDAHABIA",
  bank_transfer: "Bank Transfer",
  other: "Other",
};

const STATUS_LABELS: Record<Transaction["status"], string> = {
  successful: "Successful",
  pending: "Pending",
  failed: "Failed",
  refund_processing: "Refund processing",
  refunded: "Refunded",
};

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function transactionsToCsv(transactions: Transaction[]): string {
  const headers = [
    "Transaction ID",
    "Customer",
    "Source",
    "Payment method",
    "Amount (DA)",
    "Status",
    "Date",
  ];
  const rows = transactions.map((t) => [
    t.id,
    t.customer.isGuest ? "Guest customer" : t.customer.name,
    sourceLabelText(t.source, t.terminal),
    METHOD_LABELS[t.paymentMethod],
    t.amount.toFixed(2),
    STATUS_LABELS[t.status],
    formatFullDateTime(t.createdAt),
  ]);
  return [headers, ...rows].map((row) => row.map((cell) => csvEscape(String(cell))).join(",")).join("\n");
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
