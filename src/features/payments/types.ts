import type { PaymentMethod } from "@/design-system/components/Financial";

export type TransactionStatus = "successful" | "pending" | "failed" | "refund_processing" | "refunded";
export type TransactionSource = "vtpe" | "qr" | "payment_link" | "api";
export type SettlementDestination = "balance" | "bank_account";
export type SettlementStatus = "pending" | "settled" | "not_applicable";
export type RefundStatus = "not_refunded" | "processing" | "refunded" | "failed";

export interface Customer {
  name: string;
  phone?: string;
  email?: string;
  isGuest: boolean;
}

export interface Refund {
  status: RefundStatus;
  amount?: number;
  requestedAt?: string;
  completedAt?: string;
  reference?: string;
}

export interface Settlement {
  destination: SettlementDestination;
  status: SettlementStatus;
  amount?: number;
  settledAt?: string;
}

export interface Transaction {
  id: string;
  customer: Customer;
  source: TransactionSource;
  /** vTPE terminal label, when source is "vtpe". */
  terminal: string | null;
  paymentMethod: PaymentMethod;
  amount: number;
  currency: string;
  fee: number | null;
  netAmount: number | null;
  status: TransactionStatus;
  createdAt: string;
  completedAt: string | null;
  settlement: Settlement;
  refund: Refund;
}
