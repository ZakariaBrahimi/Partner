"use client";

import { Copy, Eye, MoreHorizontal, Receipt, RotateCcw } from "lucide-react";
import {
  DataTable,
  MoneyAmount,
  PaymentMethodBadge,
  DropdownMenu,
  IconButton,
  Button,
} from "@/mizaniya";
import type { DataTableColumnDef } from "@/mizaniya";
import type { SortingState, ColumnVisibilityState } from "@tanstack/react-table";
import { TransactionStatusBadge, SourceLabel } from "./badges";
import { formatDayMonth, formatFullDateTime, formatTime } from "./format";
import { ALL_COLUMN_IDS } from "./TransactionToolbar";
import type { ColumnId } from "./TransactionToolbar";
import type { Transaction } from "./types";

export function toColumnVisibilityState(visible: ColumnId[]): ColumnVisibilityState {
  return Object.fromEntries(ALL_COLUMN_IDS.map((id) => [id, visible.includes(id)]));
}

function canRefund(t: Transaction) {
  return t.status === "successful";
}

function buildColumns(onView: (t: Transaction) => void, onRefund: (t: Transaction) => void): DataTableColumnDef<Transaction>[] {
  function copyId(id: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(id).catch(() => {});
  }

  return [
    {
      id: "transaction",
      header: "Transaction",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-text-primary">{row.original.id}</p>
          <p className="text-xs text-text-muted">{formatFullDateTime(row.original.createdAt)}</p>
        </div>
      ),
    },
    {
      id: "customer",
      header: "Customer",
      cell: ({ row }) => (
        <span className={row.original.customer.isGuest ? "text-text-muted" : undefined}>
          {row.original.customer.isGuest ? "Guest customer" : row.original.customer.name}
        </span>
      ),
    },
    {
      id: "source",
      header: "Source",
      cell: ({ row }) => <SourceLabel source={row.original.source} terminal={row.original.terminal} />,
    },
    {
      id: "method",
      header: "Payment method",
      cell: ({ row }) => <PaymentMethodBadge method={row.original.paymentMethod} />,
    },
    {
      id: "terminal",
      header: "Terminal",
      cell: ({ row }) => row.original.terminal ?? "—",
    },
    {
      id: "amount",
      header: "Amount",
      enableSorting: true,
      meta: { align: "right" },
      cell: ({ row }) => <MoneyAmount value={row.original.amount} fractionDigits={2} />,
    },
    {
      id: "fees",
      header: "Fees",
      meta: { align: "right" },
      cell: ({ row }) => (row.original.fee !== null ? <MoneyAmount value={row.original.fee} fractionDigits={2} muted /> : "—"),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => <TransactionStatusBadge status={row.original.status} />,
    },
    {
      id: "refundStatus",
      header: "Refund status",
      cell: ({ row }) => {
        const r = row.original.refund;
        return <span className="text-text-secondary">{r.status === "not_refunded" ? "—" : r.status === "processing" ? "Processing" : "Refunded"}</span>;
      },
    },
    {
      id: "settlement",
      header: "Settlement",
      cell: ({ row }) => <span className="text-text-secondary">{row.original.settlement.destination === "balance" ? "My Balance" : "Bank Account"}</span>,
    },
    {
      id: "date",
      header: "Date",
      enableSorting: true,
      cell: ({ row }) => (
        <div className="text-text-secondary">
          <p>{formatDayMonth(row.original.createdAt)}</p>
          <p className="text-xs text-text-muted">{formatTime(row.original.createdAt)}</p>
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      meta: { align: "right" },
      cell: ({ row }) => {
        const t = row.original;
        return (
          <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
            <IconButton icon={<Eye className="size-[18px]" aria-hidden="true" />} label={`View ${t.id}`} size="compact" onClick={() => onView(t)} />
            <DropdownMenu
              trigger={<IconButton icon={<MoreHorizontal className="size-[18px]" aria-hidden="true" />} label={`More actions for ${t.id}`} size="compact" />}
              sections={[
                [
                  { label: "View transaction", icon: <Eye className="size-4" aria-hidden="true" />, onSelect: () => onView(t) },
                  { label: "Copy transaction ID", icon: <Copy className="size-4" aria-hidden="true" />, onSelect: () => copyId(t.id) },
                ],
                canRefund(t)
                  ? [{ label: "Refund payment", icon: <RotateCcw className="size-4" aria-hidden="true" />, onSelect: () => onRefund(t) }]
                  : t.status === "refunded"
                    ? [{ label: "View refund", icon: <RotateCcw className="size-4" aria-hidden="true" />, onSelect: () => onView(t) }]
                    : [],
              ].filter((section) => section.length > 0)}
            />
          </div>
        );
      },
    },
  ];
}

export function TransactionTable({
  transactions,
  loading,
  columnVisibility,
  sorting,
  onSortingChange,
  onView,
  onRefund,
  hasFilters,
  onClearFilters,
}: {
  transactions: Transaction[];
  loading?: boolean;
  columnVisibility: ColumnVisibilityState;
  sorting: SortingState;
  onSortingChange: (updater: SortingState | ((old: SortingState) => SortingState)) => void;
  onView: (t: Transaction) => void;
  onRefund: (t: Transaction) => void;
  hasFilters: boolean;
  onClearFilters: () => void;
}) {
  const columns = buildColumns(onView, onRefund);

  return (
    <>
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={transactions}
          getRowId={(t) => t.id}
          sorting={sorting}
          onSortingChange={onSortingChange}
          columnVisibility={columnVisibility}
          loading={loading}
          emptyTitle={hasFilters ? "No payments match your filters" : "No payments yet"}
          emptyDescription={
            hasFilters
              ? "Try removing a filter or changing your search."
              : "Payments will appear here once your customers complete a transaction."
          }
          emptyAction={
            hasFilters ? (
              <Button variant="secondary" size="compact" onClick={onClearFilters}>
                Clear filters
              </Button>
            ) : undefined
          }
        />
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {!loading && transactions.length === 0 ? (
          <div className="rounded-card border border-border bg-surface">
            <MobileEmpty hasFilters={hasFilters} onClearFilters={onClearFilters} />
          </div>
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
                <span className="text-text-secondary">{t.customer.isGuest ? "Guest customer" : t.customer.name}</span>
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

function MobileEmpty({ hasFilters, onClearFilters }: { hasFilters: boolean; onClearFilters: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-background text-text-muted">
        <Receipt className="size-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-text-primary">{hasFilters ? "No payments match your filters" : "No payments yet"}</p>
        <p className="mt-1 max-w-sm text-sm text-text-secondary">
          {hasFilters ? "Try removing a filter or changing your search." : "Payments will appear here once your customers complete a transaction."}
        </p>
      </div>
      {hasFilters && (
        <Button variant="secondary" size="compact" onClick={onClearFilters}>
          Clear filters
        </Button>
      )}
    </div>
  );
}
