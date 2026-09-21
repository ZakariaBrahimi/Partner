"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MOCK_TRANSACTIONS } from "./mock-data";
import type { Transaction } from "./types";

export const TRANSACTIONS_QUERY_KEY = ["payments", "transactions"] as const;

// Simulated backend: an in-memory store so a completed mutation is
// reflected on the next fetch, same as a real API + database would behave.
let transactionsStore: Transaction[] = MOCK_TRANSACTIONS.map((t) => ({ ...t }));

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchTransactions(): Promise<Transaction[]> {
  await delay(500);
  return transactionsStore;
}

export function useTransactionsQuery() {
  return useQuery({ queryKey: TRANSACTIONS_QUERY_KEY, queryFn: fetchTransactions });
}

/** Explicit, named financial mutation — never hidden inside a generic UI
 * component. Rejects (throwing) on a simulated decline so React Query's
 * mutation lifecycle drives the "processing → refunded" vs
 * "processing → reverted" state machine via onMutate/onError/onSuccess. */
async function refundPayment(transactionId: string): Promise<Transaction> {
  await delay(1600);
  const target = transactionsStore.find((t) => t.id === transactionId);
  if (!target) throw new Error("Transaction not found.");

  const succeeded = Math.random() > 0.15;
  if (!succeeded) {
    throw new Error("REFUND_DECLINED");
  }

  const now = new Date().toISOString();
  const updated: Transaction = {
    ...target,
    status: "refunded",
    refund: {
      status: "refunded",
      amount: target.amount,
      requestedAt: target.refund.requestedAt ?? now,
      completedAt: now,
      reference: `RF-${transactionId.replace("TXN-", "")}`,
    },
  };
  transactionsStore = transactionsStore.map((t) => (t.id === transactionId ? updated : t));
  return updated;
}

function patchTransaction(list: Transaction[] | undefined, id: string, patch: Partial<Transaction>) {
  return list?.map((t) => (t.id === id ? { ...t, ...patch } : t));
}

export function useRefundPaymentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transactionId: string) => refundPayment(transactionId),
    onMutate: async (transactionId) => {
      await queryClient.cancelQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
      const previous = queryClient.getQueryData<Transaction[]>(TRANSACTIONS_QUERY_KEY);
      const now = new Date().toISOString();

      queryClient.setQueryData<Transaction[]>(TRANSACTIONS_QUERY_KEY, (old) =>
        patchTransaction(old, transactionId, {
          status: "refund_processing",
          refund: { status: "processing", amount: old?.find((t) => t.id === transactionId)?.amount, requestedAt: now },
        }),
      );

      return { previous };
    },
    onError: (_error, _transactionId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(TRANSACTIONS_QUERY_KEY, context.previous);
      }
    },
    onSuccess: (updated, transactionId) => {
      queryClient.setQueryData<Transaction[]>(TRANSACTIONS_QUERY_KEY, (old) => patchTransaction(old, transactionId, updated));
    },
  });
}
