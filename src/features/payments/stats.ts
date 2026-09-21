import type { PaymentMethod } from "@/mizaniya/components/financial/payment-method-badge";
import type { Transaction, TransactionStatus } from "./types";

export interface DateWindow {
  from: Date;
  to: Date;
}

export function inWindow(iso: string, window: DateWindow) {
  const t = new Date(iso).getTime();
  return t >= window.from.getTime() && t <= window.to.getTime();
}

export function previousWindow(window: DateWindow): DateWindow {
  const span = window.to.getTime() - window.from.getTime();
  return { from: new Date(window.from.getTime() - span - 1), to: new Date(window.from.getTime() - 1) };
}

/** Percentage change, or null when the previous period had no data (avoids
 * a fabricated or divide-by-zero percentage). */
export function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? null : null;
  return ((current - previous) / previous) * 100;
}

export interface PaymentMetrics {
  totalVolume: number;
  totalCount: number;
  successfulCount: number;
  successfulVolume: number;
  successRate: number | null;
  failedCount: number;
  failedVolume: number;
  pendingCount: number;
  pendingVolume: number;
  refundedCount: number;
  refundedVolume: number;
  avgValue: number | null;
}

export function computeMetrics(transactions: Transaction[]): PaymentMetrics {
  let totalVolume = 0;
  let successfulCount = 0;
  let successfulVolume = 0;
  let failedCount = 0;
  let failedVolume = 0;
  let pendingCount = 0;
  let pendingVolume = 0;
  let refundedCount = 0;
  let refundedVolume = 0;

  for (const t of transactions) {
    totalVolume += t.amount;
    if (t.status === "successful") {
      successfulCount += 1;
      successfulVolume += t.amount;
    } else if (t.status === "failed") {
      failedCount += 1;
      failedVolume += t.amount;
    } else if (t.status === "pending") {
      pendingCount += 1;
      pendingVolume += t.amount;
    } else if (t.status === "refunded") {
      refundedCount += 1;
      refundedVolume += t.refund.amount ?? t.amount;
    }
  }

  const totalCount = transactions.length;

  return {
    totalVolume,
    totalCount,
    successfulCount,
    successfulVolume,
    successRate: totalCount > 0 ? (successfulCount / totalCount) * 100 : null,
    failedCount,
    failedVolume,
    pendingCount,
    pendingVolume,
    refundedCount,
    refundedVolume,
    avgValue: successfulCount > 0 ? successfulVolume / successfulCount : null,
  };
}

export interface OutcomeBreakdownRow {
  status: TransactionStatus;
  label: string;
  count: number;
  percentage: number;
}

const OUTCOME_ORDER: { status: TransactionStatus; label: string }[] = [
  { status: "successful", label: "Successful" },
  { status: "pending", label: "Pending" },
  { status: "failed", label: "Failed" },
  { status: "refunded", label: "Refunded" },
];

export function buildOutcomeBreakdown(transactions: Transaction[]): OutcomeBreakdownRow[] {
  const total = transactions.length || 1;
  return OUTCOME_ORDER.map(({ status, label }) => {
    const count = transactions.filter((t) => t.status === status).length;
    return { status, label, count, percentage: (count / total) * 100 };
  });
}

export interface MethodBreakdownRow {
  method: PaymentMethod;
  count: number;
  volume: number;
  percentage: number;
}

const METHOD_ORDER: PaymentMethod[] = ["wallet", "cib", "edahabia", "bank_transfer", "other"];

export function buildMethodBreakdown(transactions: Transaction[]): MethodBreakdownRow[] {
  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0) || 1;
  return METHOD_ORDER.map((method) => {
    const rows = transactions.filter((t) => t.paymentMethod === method);
    const volume = rows.reduce((sum, t) => sum + t.amount, 0);
    return { method, count: rows.length, volume, percentage: (volume / totalVolume) * 100 };
  }).filter((row) => row.count > 0);
}

export interface VolumePoint {
  label: string;
  total: number;
  successful: number;
}

export type ChartGranularity = "daily" | "weekly" | "monthly";

function bucketKey(date: Date, granularity: ChartGranularity): string {
  if (granularity === "monthly") {
    return `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
  }
  if (granularity === "weekly") {
    const onejan = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const week = Math.ceil(((date.getTime() - onejan.getTime()) / 86400000 + onejan.getUTCDay() + 1) / 7);
    return `${date.getUTCFullYear()}-W${week}`;
  }
  return date.toISOString().slice(0, 10);
}

function bucketLabel(date: Date, granularity: ChartGranularity): string {
  if (granularity === "monthly") {
    return date.toLocaleDateString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" });
  }
  if (granularity === "weekly") {
    return `Wk of ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })}`;
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

export function buildVolumeSeries(
  transactions: Transaction[],
  window: DateWindow,
  granularity: ChartGranularity,
): VolumePoint[] {
  const buckets = new Map<string, { date: Date; total: number; successful: number }>();

  const cursor = new Date(window.from);
  const stepDays = granularity === "monthly" ? 30 : granularity === "weekly" ? 7 : 1;
  while (cursor <= window.to) {
    const key = bucketKey(cursor, granularity);
    if (!buckets.has(key)) buckets.set(key, { date: new Date(cursor), total: 0, successful: 0 });
    cursor.setUTCDate(cursor.getUTCDate() + stepDays);
  }
  // Ensure the final bucket (covering `to`) exists.
  const lastKey = bucketKey(window.to, granularity);
  if (!buckets.has(lastKey)) buckets.set(lastKey, { date: new Date(window.to), total: 0, successful: 0 });

  for (const t of transactions) {
    const date = new Date(t.createdAt);
    const key = bucketKey(date, granularity);
    const bucket = buckets.get(key);
    if (!bucket) continue;
    bucket.total += t.amount;
    if (t.status === "successful") bucket.successful += t.amount;
  }

  return Array.from(buckets.values())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((b) => ({ label: bucketLabel(b.date, granularity), total: b.total, successful: b.successful }));
}
