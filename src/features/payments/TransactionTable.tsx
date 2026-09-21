"use client";

import { Copy, Eye, MoreHorizontal, Receipt, RotateCcw } from "lucide-react";
import {
  Table,
  TableHead,
  Th,
  SortableHeader,
  TableBody,
  Tr,
  Td,
} from "@/design-system/components/Table";
import type { SortDirection } from "@/design-system/components/Table";
import { MoneyAmount } from "@/design-system/components/Financial";
import { PaymentMethodBadge } from "@/design-system/components/Financial";
import { Dropdown } from "@/design-system/components/Dropdown";
import { IconButton, Button } from "@/design-system/components/Button";
import { TableRowSkeleton, LoadingSkeleton } from "@/design-system/components/LoadingSkeleton";
import { EmptyState } from "@/design-system/components/EmptyState";
import { TransactionStatusBadge, SourceLabel } from "./badges";
import { formatDayMonth, formatFullDateTime, formatTime } from "./format";
import type { ColumnId } from "./TransactionToolbar";
import type { Transaction } from "./types";

export type SortKey = "amount" | "date";

function canRefund(transaction: Transaction) {
  return transaction.status === "successful";
}

export function TransactionTable({
  transactions,
  loading,
  columns,
  sortKey,
  sortDirection,
  onSort,
  onView,
  onRefund,
  hasFilters,
  onClearFilters,
}: {
  transactions: Transaction[];
  loading?: boolean;
  columns: ColumnId[];
  sortKey: SortKey | null;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
  onView: (transaction: Transaction) => void;
  onRefund: (transaction: Transaction) => void;
  hasFilters: boolean;
  onClearFilters: () => void;
}) {
  const show = (id: ColumnId) => columns.includes(id);
  const colCount =
    2 + columns.length + 1; // transaction + optional columns + actions (approx, only for empty-state colSpan)

  function copyId(id: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(id).catch(() => {});
    }
  }

  const empty = !loading && transactions.length === 0;

  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHead>
            <Th>Transaction</Th>
            {show("customer") && <Th>Customer</Th>}
            {show("source") && <Th>Source</Th>}
            {show("method") && <Th>Payment method</Th>}
            {show("terminal") && <Th>Terminal</Th>}
            {show("amount") ? (
              <SortableHeader align="right" direction={sortKey === "amount" ? sortDirection : null} onSort={() => onSort("amount")}>
                Amount
              </SortableHeader>
            ) : null}
            {show("fees") && <Th align="right">Fees</Th>}
            {show("status") && <Th>Status</Th>}
            {show("refundStatus") && <Th>Refund status</Th>}
            {show("settlement") && <Th>Settlement</Th>}
            {show("date") ? (
              <SortableHeader direction={sortKey === "date" ? sortDirection : null} onSort={() => onSort("date")}>
                Date
              </SortableHeader>
            ) : null}
            <Th>
              <span className="sr-only">Actions</span>
            </Th>
          </TableHead>
          {empty ? (
            <tbody>
              <tr>
                <td colSpan={colCount}>
                  <EmptyState
                    icon={<Receipt className="size-5" aria-hidden="true" />}
                    title={hasFilters ? "No payments match your filters" : "No payments yet"}
                    description={
                      hasFilters
                        ? "Try removing a filter or changing your search."
                        : "Payments will appear here once your customers complete a transaction."
                    }
                    action={
                      hasFilters ? (
                        <Button variant="secondary" size="compact" onClick={onClearFilters}>
                          Clear filters
                        </Button>
                      ) : undefined
                    }
                  />
                </td>
              </tr>
            </tbody>
          ) : (
            <TableBody>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <TableRowSkeleton key={i} columns={colCount} />)
                : transactions.map((t) => (
                    <Tr key={t.id}>
                      <Td>
                        <p className="font-semibold text-text-primary">{t.id}</p>
                        <p className="text-xs text-text-muted">{formatFullDateTime(t.createdAt)}</p>
                      </Td>
                      {show("customer") && (
                        <Td className={t.customer.isGuest ? "text-text-muted" : undefined}>
                          {t.customer.isGuest ? "Guest customer" : t.customer.name}
                        </Td>
                      )}
                      {show("source") && (
                        <Td>
                          <SourceLabel source={t.source} terminal={t.terminal} />
                        </Td>
                      )}
                      {show("method") && (
                        <Td>
                          <PaymentMethodBadge method={t.paymentMethod} />
                        </Td>
                      )}
                      {show("terminal") && <Td>{t.terminal ?? "—"}</Td>}
                      {show("amount") && (
                        <Td align="right">
                          <MoneyAmount value={t.amount} fractionDigits={2} />
                        </Td>
                      )}
                      {show("fees") && (
                        <Td align="right" className="text-text-secondary">
                          {t.fee !== null ? <MoneyAmount value={t.fee} fractionDigits={2} muted /> : "—"}
                        </Td>
                      )}
                      {show("status") && (
                        <Td>
                          <TransactionStatusBadge status={t.status} />
                        </Td>
                      )}
                      {show("refundStatus") && (
                        <Td className="text-text-secondary">
                          {t.refund.status === "not_refunded" ? "—" : t.refund.status === "processing" ? "Processing" : "Refunded"}
                        </Td>
                      )}
                      {show("settlement") && (
                        <Td className="text-text-secondary">
                          {t.settlement.destination === "balance" ? "My Balance" : "Bank Account"}
                        </Td>
                      )}
                      {show("date") && (
                        <Td className="text-text-secondary">
                          <p>{formatDayMonth(t.createdAt)}</p>
                          <p className="text-xs text-text-muted">{formatTime(t.createdAt)}</p>
                        </Td>
                      )}
                      <Td align="right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <IconButton
                            icon={<Eye className="size-[18px]" aria-hidden="true" />}
                            label={`View ${t.id}`}
                            size="compact"
                            onClick={() => onView(t)}
                          />
                          <Dropdown
                            trigger={
                              <IconButton
                                icon={<MoreHorizontal className="size-[18px]" aria-hidden="true" />}
                                label={`More actions for ${t.id}`}
                                size="compact"
                              />
                            }
                            sections={[
                              [
                                { label: "View transaction", icon: <Eye className="size-4" aria-hidden="true" />, onSelect: () => onView(t) },
                                {
                                  label: "Copy transaction ID",
                                  icon: <Copy className="size-4" aria-hidden="true" />,
                                  onSelect: () => copyId(t.id),
                                },
                              ],
                              canRefund(t)
                                ? [
                                    {
                                      label: "Refund payment",
                                      icon: <RotateCcw className="size-4" aria-hidden="true" />,
                                      onSelect: () => onRefund(t),
                                    },
                                  ]
                                : t.status === "refunded"
                                  ? [
                                      {
                                        label: "View refund",
                                        icon: <RotateCcw className="size-4" aria-hidden="true" />,
                                        onSelect: () => onView(t),
                                      },
                                    ]
                                  : [],
                            ].filter((section) => section.length > 0)}
                          />
                        </div>
                      </Td>
                    </Tr>
                  ))}
            </TableBody>
          )}
        </Table>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {empty ? (
          <div className="rounded-card border border-border bg-surface">
            <EmptyState
              icon={<Receipt className="size-5" aria-hidden="true" />}
              title={hasFilters ? "No payments match your filters" : "No payments yet"}
              description={
                hasFilters
                  ? "Try removing a filter or changing your search."
                  : "Payments will appear here once your customers complete a transaction."
              }
              action={
                hasFilters ? (
                  <Button variant="secondary" size="compact" onClick={onClearFilters}>
                    Clear filters
                  </Button>
                ) : undefined
              }
            />
          </div>
        ) : loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4">
              <LoadingSkeleton className="h-4 w-32" />
              <LoadingSkeleton className="h-3 w-20" />
              <LoadingSkeleton className="h-3 w-full" />
            </div>
          ))
        ) : (
          transactions.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onView(t)}
              className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-text-primary">{t.id}</p>
                  <p className="text-xs text-text-muted">{formatFullDateTime(t.createdAt)}</p>
                </div>
                <TransactionStatusBadge status={t.status} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">
                  {t.customer.isGuest ? "Guest customer" : t.customer.name}
                </span>
                <MoneyAmount value={t.amount} fractionDigits={2} />
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-text-muted">
                <SourceLabel source={t.source} terminal={t.terminal} />
                <PaymentMethodBadge method={t.paymentMethod} />
              </div>
            </button>
          ))
        )}
      </div>
    </>
  );
}
