"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";
import { Modal, Button, MoneyAmount, Input, FormField } from "@/mizaniya";
import { createRefundSchema } from "./refund-schema";
import type { RefundFormValues } from "./refund-schema";
import type { Transaction } from "./types";

export function RefundConfirmationDialog({
  transaction,
  onClose,
  onConfirm,
  submitting,
}: {
  transaction: Transaction | null;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  submitting: boolean;
}) {
  const t = transaction;
  const schema = createRefundSchema(t?.amount ?? 0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RefundFormValues>({
    resolver: zodResolver(schema),
    values: t ? { amount: t.amount } : undefined,
  });

  function handleClose() {
    reset();
    onClose();
  }

  function submit(values: RefundFormValues) {
    onConfirm(values.amount);
  }

  return (
    <Modal
      open={t !== null}
      onClose={submitting ? () => {} : handleClose}
      title="Refund this payment?"
      width="440px"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleSubmit(submit)} loading={submitting}>
            {submitting ? "Refunding..." : "Confirm refund"}
          </Button>
        </>
      }
    >
      {t && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
          <div className="flex items-start gap-3 rounded-card border border-error/20 bg-error-soft p-4">
            <AlertTriangle className="mt-0.5 size-[18px] shrink-0 text-error" aria-hidden="true" />
            <p className="text-sm text-error">
              You&apos;re about to refund <span className="font-semibold">{t.amount.toLocaleString("en-US")} DA</span> to the
              customer. This action cannot be undone.
            </p>
          </div>

          <div className="divide-y divide-border rounded-card border border-border px-4">
            <Row label="Payment" value={<MoneyAmount value={t.amount} fractionDigits={2} />} />
            <Row label="Transaction" value={t.id} />
            <Row label="Customer" value={t.customer.isGuest ? "Guest customer" : t.customer.name} />
            <Row label="Destination" value="Original payment method" />
          </div>

          <FormField
            label="Refund amount"
            required
            htmlFor="refund-amount"
            error={errors.amount?.message}
            helperText={errors.amount ? undefined : "Partial refunds aren't supported yet — the full amount will be refunded."}
          >
            <Input
              id="refund-amount"
              type="number"
              step="0.01"
              disabled
              className="tabular-nums"
              error={Boolean(errors.amount)}
              {...register("amount", { valueAsNumber: true })}
            />
          </FormField>
        </form>
      )}
    </Modal>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
      <span className="text-text-secondary">{label}</span>
      <span className="text-right font-medium text-text-primary">{value}</span>
    </div>
  );
}
