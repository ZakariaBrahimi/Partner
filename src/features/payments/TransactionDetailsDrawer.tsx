"use client";

import type { ReactNode } from "react";
import { Drawer, DrawerSection } from "@/design-system/components/Drawer";
import { Button } from "@/design-system/components/Button";
import { MoneyAmount, PaymentMethodBadge, FeeBreakdown } from "@/design-system/components/Financial";
import { Timeline } from "@/design-system/components/Timeline";
import { TransactionStatusBadge, SourceLabel } from "./badges";
import { formatFullDateTime } from "./format";
import { buildTransactionTimeline } from "./timeline";
import type { Transaction } from "./types";

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 text-sm">
      <span className="text-text-secondary">{label}</span>
      <span className="text-right font-medium text-text-primary">{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      <div className="mt-2 divide-y divide-border rounded-card border border-border px-4">{children}</div>
    </div>
  );
}

export function TransactionDetailsDrawer({
  transaction,
  onClose,
  onRefund,
}: {
  transaction: Transaction | null;
  onClose: () => void;
  onRefund: (transaction: Transaction) => void;
}) {
  const open = transaction !== null;
  const t = transaction;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Transaction details"
      description={t ? t.id : undefined}
      width="560px"
      footer={
        t && t.status === "successful" ? (
          <>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="destructive" onClick={() => onRefund(t)}>
              Refund payment
            </Button>
          </>
        ) : (
          <div className="flex w-full justify-end">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        )
      }
    >
      {t && (
        <DrawerSection>
          <div className="flex items-center justify-between rounded-card border border-border bg-background p-4">
            <div>
              <p className="text-xs text-text-muted">Amount</p>
              <MoneyAmount value={t.amount} size="large" fractionDigits={2} />
            </div>
            <TransactionStatusBadge status={t.status} />
          </div>

          <Section title="Payment summary">
            <Field label="Transaction ID" value={t.id} />
            <Field label="Created at" value={formatFullDateTime(t.createdAt)} />
            <Field label="Completed at" value={t.completedAt ? formatFullDateTime(t.completedAt) : "—"} />
            <Field label="Source" value={<SourceLabel source={t.source} terminal={t.terminal} />} />
          </Section>

          <Section title="Customer">
            <Field label="Name" value={t.customer.isGuest ? "Guest customer" : t.customer.name} />
            <Field label="Phone" value={t.customer.phone ?? "—"} />
          </Section>

          <Section title="Payment method">
            <Field label="Method" value={<PaymentMethodBadge method={t.paymentMethod} />} />
          </Section>

          <div>
            <h3 className="text-sm font-semibold text-text-primary">Fees</h3>
            <div className="mt-2">
              <FeeBreakdown
                rows={[
                  { label: "Payment amount", value: t.amount },
                  { label: "Processing fee", value: t.fee },
                  { label: "Net amount", value: t.netAmount, strong: true },
                ]}
              />
            </div>
          </div>

          {t.refund.status !== "not_refunded" && (
            <Section title="Refund information">
              <Field label="Original amount" value={<MoneyAmount value={t.amount} fractionDigits={2} />} />
              <Field
                label="Refunded amount"
                value={t.refund.amount !== undefined ? <MoneyAmount value={t.refund.amount} fractionDigits={2} /> : "—"}
              />
              <Field
                label="Refund status"
                value={t.refund.status === "processing" ? "Processing" : "Refunded"}
              />
              {t.refund.reference && <Field label="Refund reference" value={t.refund.reference} />}
              {t.refund.completedAt && (
                <Field label="Refund date" value={formatFullDateTime(t.refund.completedAt)} />
              )}
            </Section>
          )}

          <div>
            <h3 className="text-sm font-semibold text-text-primary">Timeline</h3>
            <div className="mt-3">
              <Timeline steps={buildTransactionTimeline(t)} />
            </div>
          </div>

          {t.status === "successful" && (
            <Section title="Settlement">
              <Field label="Destination" value={t.settlement.destination === "balance" ? "My Balance" : "Bank Account"} />
              <Field label="Status" value={t.settlement.status === "settled" ? "Settled" : "Pending"} />
              <Field
                label="Amount"
                value={t.settlement.amount !== undefined ? <MoneyAmount value={t.settlement.amount} fractionDigits={2} /> : "—"}
              />
              {t.settlement.settledAt && (
                <Field label="Settled at" value={formatFullDateTime(t.settlement.settledAt)} />
              )}
            </Section>
          )}
        </DrawerSection>
      )}
    </Drawer>
  );
}
