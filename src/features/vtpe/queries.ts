"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MOCK_BANK_ACCOUNTS, MOCK_TERMINALS } from "./mock-data";
import type { BankAccountRequestFormValues } from "./bank-account-schema";
import type { CreateTerminalInput, Terminal } from "./types";

export const TERMINALS_QUERY_KEY = ["vtpe", "terminals"] as const;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let terminalsStore: Terminal[] = MOCK_TERMINALS.map((t) => ({ ...t }));

async function fetchTerminals(): Promise<Terminal[]> {
  await delay(500);
  return terminalsStore;
}

export function useTerminalsQuery() {
  return useQuery({ queryKey: TERMINALS_QUERY_KEY, queryFn: fetchTerminals });
}

function bankAccountById(id?: string) {
  if (!id) return undefined;
  return MOCK_BANK_ACCOUNTS.find((b) => b.id === id);
}

async function createTerminal(input: CreateTerminalInput): Promise<Terminal> {
  await delay(900);
  const status = input.settlementType === "new_bank_account" ? "pending" : "active";
  const terminal: Terminal = {
    id: `t_${Date.now()}`,
    code: `VTPE-${Math.floor(10000 + Math.random() * 89999)}`,
    label: input.label,
    description: input.description,
    category: input.category,
    paymentVolume: 0,
    qrCodeCount: 0,
    settlementType: input.settlementType,
    bankAccount: input.settlementType === "existing_bank_account" ? bankAccountById(input.bankAccountId) : undefined,
    status,
    createdAt: new Date().toISOString(),
    lastActivityAt: status === "active" ? "Just now" : undefined,
  };
  terminalsStore = [terminal, ...terminalsStore];
  return terminal;
}

/** Explicit, named mutation — never hidden inside a generic UI component. */
export function useCreateTerminalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTerminalInput) => createTerminal(input),
    onSuccess: (terminal) => {
      queryClient.setQueryData<Terminal[]>(TERMINALS_QUERY_KEY, (old) => (old ? [terminal, ...old] : [terminal]));
    },
  });
}

async function toggleTerminalStatus(terminalId: string): Promise<Terminal> {
  await delay(400);
  const target = terminalsStore.find((t) => t.id === terminalId);
  if (!target) throw new Error("Terminal not found.");
  const updated: Terminal = { ...target, status: target.status === "disabled" ? "active" : "disabled" };
  terminalsStore = terminalsStore.map((t) => (t.id === terminalId ? updated : t));
  return updated;
}

export function useToggleTerminalStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (terminalId: string) => toggleTerminalStatus(terminalId),
    onSuccess: (updated) => {
      queryClient.setQueryData<Terminal[]>(TERMINALS_QUERY_KEY, (old) => old?.map((t) => (t.id === updated.id ? updated : t)) ?? old);
    },
  });
}

async function requestBankAccount(input: BankAccountRequestFormValues): Promise<void> {
  void input;
  await delay(700);
}

/** Explicit, named mutation for the "request a new bank account" flow. */
export function useRequestBankAccountMutation() {
  return useMutation({ mutationFn: (input: BankAccountRequestFormValues) => requestBankAccount(input) });
}
