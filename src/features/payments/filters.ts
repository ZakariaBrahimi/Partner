import type { FilterGroup, FilterValues } from "@/design-system/components/FilterPopover";
import type { Transaction } from "./types";

const AMOUNT_BUCKETS: Record<string, (amount: number) => boolean> = {
  under_1000: (a) => a < 1000,
  "1000_5000": (a) => a >= 1000 && a <= 5000,
  "5000_10000": (a) => a > 5000 && a <= 10000,
  above_10000: (a) => a > 10000,
};

export function buildFilterGroups(terminals: string[]): FilterGroup[] {
  return [
    {
      id: "status",
      label: "Status",
      type: "multi",
      options: [
        { value: "successful", label: "Successful" },
        { value: "pending", label: "Pending" },
        { value: "failed", label: "Failed" },
        { value: "refund_processing", label: "Refund processing" },
        { value: "refunded", label: "Refunded" },
      ],
    },
    {
      id: "method",
      label: "Payment method",
      type: "multi",
      options: [
        { value: "wallet", label: "Mizaniya Wallet" },
        { value: "cib", label: "CIB" },
        { value: "edahabia", label: "EDAHABIA" },
        { value: "bank_transfer", label: "Bank Transfer" },
        { value: "other", label: "Other" },
      ],
    },
    {
      id: "source",
      label: "Source",
      type: "multi",
      options: [
        { value: "vtpe", label: "vTPE" },
        { value: "qr", label: "QR Code" },
        { value: "payment_link", label: "Payment Link" },
        { value: "api", label: "API" },
      ],
    },
    {
      id: "terminal",
      label: "Terminal / vTPE",
      type: "multi",
      options: terminals.map((t) => ({ value: t, label: t })),
    },
    {
      id: "amount",
      label: "Amount",
      type: "single",
      options: [
        { value: "under_1000", label: "Under 1,000 DA" },
        { value: "1000_5000", label: "1,000–5,000 DA" },
        { value: "5000_10000", label: "5,000–10,000 DA" },
        { value: "above_10000", label: "Above 10,000 DA" },
      ],
    },
    {
      id: "refund",
      label: "Refund status",
      type: "single",
      options: [
        { value: "not_refunded", label: "Not refunded" },
        { value: "processing", label: "Refund processing" },
        { value: "refunded", label: "Refunded" },
      ],
    },
  ];
}

export function matchesFilters(transaction: Transaction, values: FilterValues): boolean {
  const status = values.status ?? [];
  if (status.length > 0 && !status.includes(transaction.status)) return false;

  const method = values.method ?? [];
  if (method.length > 0 && !method.includes(transaction.paymentMethod)) return false;

  const source = values.source ?? [];
  if (source.length > 0 && !source.includes(transaction.source)) return false;

  const terminal = values.terminal ?? [];
  if (terminal.length > 0 && !(transaction.terminal && terminal.includes(transaction.terminal))) {
    return false;
  }

  const amount = values.amount?.[0];
  if (amount && !AMOUNT_BUCKETS[amount]?.(transaction.amount)) return false;

  const refund = values.refund?.[0];
  if (refund && transaction.refund.status !== refund) return false;

  return true;
}

export function filterChips(groups: FilterGroup[], values: FilterValues): { groupId: string; value: string; label: string }[] {
  const chips: { groupId: string; value: string; label: string }[] = [];
  for (const group of groups) {
    for (const value of values[group.id] ?? []) {
      const option = group.options.find((o) => o.value === value);
      if (option) chips.push({ groupId: group.id, value, label: `${group.label}: ${option.label}` });
    }
  }
  return chips;
}
