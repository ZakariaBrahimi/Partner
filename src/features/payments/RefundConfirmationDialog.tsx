"use client";

import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "@/design-system/components/Modal";
import { Button } from "@/design-system/components/Button";
import { MoneyAmount } from "@/design-system/components/Financial";
import type { Transaction } from "./types";

export function RefundConfirmationDialog({
  transaction,
  onClose,
  onConfirm,
  submitting,
}: {
  transaction: Transaction | null;
  onClose: () => void;
  onConfirm: () => void;
  submitting: boolean;
}) {
  const t = transaction;

  return (
    <Modal
      open={t !== null}
      onClose={submitting ? () => {} : onClose}
      title="Refund this payment?"
      width="440px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} loading={submitting}>
            {submitting ? "Refunding..." : "Confirm refund"}
          </Button>
        </>
      }
    >
      {t && (
        <div className="flex flex-col gap-4">
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
            <Row label="Refund amount" value={<MoneyAmount value={t.amount} fractionDigits={2} />} />
            <Row label="Destination" value="Original payment method" />
          </div>
        </div>
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
