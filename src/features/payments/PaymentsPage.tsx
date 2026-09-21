"use client";

import { useMemo, useState } from "react";
import { CreditCard } from "lucide-react";
import type { SortingState } from "@tanstack/react-table";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Pagination, MetricCardSkeleton, Alert, Button, useToast, DateRangePicker, computeDateRange } from "@/mizaniya";
import type { DateRange, FilterValues } from "@/mizaniya";

import { PaymentMetrics } from "./PaymentMetrics";
import { PaymentAnalytics } from "./PaymentAnalytics";
import { PaymentMethods } from "./PaymentMethods";
import { TransactionToolbar, DEFAULT_COLUMNS } from "./TransactionToolbar";
import type { ColumnId } from "./TransactionToolbar";
import { ActiveFilters } from "@/mizaniya";
import { TransactionTable, toColumnVisibilityState } from "./TransactionTable";
import { TransactionDetailsDrawer } from "./TransactionDetailsDrawer";
import { RefundConfirmationDialog } from "./RefundConfirmationDialog";
import { useTransactionsQuery, useRefundPaymentMutation } from "./queries";
import { buildFilterGroups, matchesFilters } from "./filters";
import { computeMetrics, buildOutcomeBreakdown, buildMethodBreakdown, inWindow, previousWindow } from "./stats";
import { transactionsToCsv, downloadCsv } from "./export";
import { sourceLabelText } from "./badges";
import type { Transaction } from "./types";

const PAGE_SIZE = 10;

export default function PaymentsPage() {
  const { showToast } = useToast();
  const { data: transactions, isPending, isError, refetch } = useTransactionsQuery();
  const refundMutation = useRefundPaymentMutation();

  const [dateRange, setDateRange] = useState<DateRange>(() => computeDateRange("30d"));
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [columns, setColumns] = useState<ColumnId[]>(DEFAULT_COLUMNS);
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([{ id: "date", desc: true }]);

  const [viewingTransaction, setViewingTransaction] = useState<Transaction | null>(null);
  const [refundingTransaction, setRefundingTransaction] = useState<Transaction | null>(null);

  const allTransactions = useMemo(() => transactions ?? [], [transactions]);

  const window_ = useMemo(() => ({ from: dateRange.from, to: dateRange.to }), [dateRange]);
  const previousWindow_ = useMemo(() => previousWindow(window_), [window_]);

  const inRangeTransactions = useMemo(() => allTransactions.filter((t) => inWindow(t.createdAt, window_)), [allTransactions, window_]);
  const previousRangeTransactions = useMemo(
    () => allTransactions.filter((t) => inWindow(t.createdAt, previousWindow_)),
    [allTransactions, previousWindow_],
  );

  const currentMetrics = useMemo(() => computeMetrics(inRangeTransactions), [inRangeTransactions]);
  const previousMetrics = useMemo(() => computeMetrics(previousRangeTransactions), [previousRangeTransactions]);
  const outcomes = useMemo(() => buildOutcomeBreakdown(inRangeTransactions), [inRangeTransactions]);
  const methodBreakdown = useMemo(() => buildMethodBreakdown(inRangeTransactions), [inRangeTransactions]);

  const terminals = useMemo(
    () => Array.from(new Set(allTransactions.flatMap((t) => (t.terminal ? [t.terminal] : [])))).sort(),
    [allTransactions],
  );
  const filterGroups = useMemo(() => buildFilterGroups(terminals), [terminals]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inRangeTransactions.filter((t) => {
      if (q) {
        const haystack = `${t.id} ${t.customer.isGuest ? "guest customer" : t.customer.name} ${sourceLabelText(t.source, t.terminal)}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return matchesFilters(t, filterValues);
    });
  }, [inRangeTransactions, search, filterValues]);

  const sorted = useMemo(() => {
    const rule = sorting[0];
    if (!rule) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const diff = rule.id === "amount" ? a.amount - b.amount : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return rule.desc ? -diff : diff;
    });
    return copy;
  }, [filtered, sorting]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const hasFilters = search.trim() !== "" || Object.values(filterValues).some((v) => v.length > 0);

  function resetPage() {
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    resetPage();
  }
  function handleFilterApply(values: FilterValues) {
    setFilterValues(values);
    resetPage();
  }
  function handleRemoveFilter(groupId: string, value: string) {
    setFilterValues((prev) => ({ ...prev, [groupId]: (prev[groupId] ?? []).filter((v) => v !== value) }));
    resetPage();
  }
  function handleClearFilters() {
    setSearch("");
    setFilterValues({});
    resetPage();
  }

  function handleExport() {
    const csv = transactionsToCsv(sorted);
    downloadCsv(`mizaniya-payments-${new Date().toISOString().slice(0, 10)}.csv`, csv);
    showToast({ tone: "success", title: "Export ready", description: `${sorted.length} transactions exported to CSV.` });
  }

  function handleRefund(target: Transaction) {
    setRefundingTransaction(null);
    setViewingTransaction(null);
    showToast({
      tone: "info",
      title: "Refund request submitted.",
      description: "The refund is being processed. We'll update the transaction once it's completed.",
    });

    refundMutation.mutate(target.id, {
      onSuccess: () => {
        showToast({
          tone: "success",
          title: "Payment refunded successfully.",
          description: `${target.amount.toLocaleString("en-US")} DA has been refunded to the customer.`,
        });
      },
      onError: () => {
        showToast({
          tone: "error",
          title: "Refund could not be completed.",
          description: "Please try again or contact support if the issue continues.",
        });
      },
    });
  }

  if (isError) {
    return (
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
        <Breadcrumbs items={[{ label: "Payments", href: "/payments/overview" }, { label: "Transactions" }]} />
        <Alert
          tone="error"
          title="Unable to load payments"
          description="Something went wrong while loading your payments. Please try again."
          action={
            <Button variant="secondary" size="compact" onClick={() => refetch()}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
      <Breadcrumbs items={[{ label: "Payments", href: "/payments/overview" }, { label: "Transactions" }]} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-card bg-primary-soft text-primary">
            <CreditCard className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Payments</h1>
            <p className="mt-0.5 text-sm text-text-secondary">Monitor payments, track transaction activity, and manage refunds.</p>
          </div>
        </div>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <PaymentMetrics current={currentMetrics} previous={previousMetrics} />
      )}

      {!isPending && (
        <>
          <PaymentAnalytics transactions={inRangeTransactions} window={window_} outcomes={outcomes} />
          <PaymentMethods rows={methodBreakdown} />
        </>
      )}

      <div>
        <h2 className="mb-1 text-lg font-semibold text-text-primary">Transactions</h2>
        <p className="mb-4 text-sm text-text-secondary">View and manage individual payment transactions.</p>

        <div className="flex flex-col gap-4">
          <TransactionToolbar
            search={search}
            onSearchChange={handleSearchChange}
            filterGroups={filterGroups}
            filterValues={filterValues}
            onFilterApply={handleFilterApply}
            columns={columns}
            onColumnsChange={setColumns}
            onExport={handleExport}
          />

          <ActiveFilters groups={filterGroups} values={filterValues} onRemove={handleRemoveFilter} onClearAll={handleClearFilters} />

          <TransactionTable
            transactions={paged}
            loading={isPending}
            columnVisibility={toColumnVisibilityState(columns)}
            sorting={sorting}
            onSortingChange={setSorting}
            onView={setViewingTransaction}
            onRefund={setRefundingTransaction}
            hasFilters={hasFilters}
            onClearFilters={handleClearFilters}
          />

          {!isPending && sorted.length > 0 && (
            <Pagination
              page={currentPage}
              pageCount={pageCount}
              onPageChange={setPage}
              totalLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, sorted.length)} of ${sorted.length} transactions`}
            />
          )}
        </div>
      </div>

      <TransactionDetailsDrawer transaction={viewingTransaction} onClose={() => setViewingTransaction(null)} onRefund={setRefundingTransaction} />

      <RefundConfirmationDialog
        transaction={refundingTransaction}
        onClose={() => setRefundingTransaction(null)}
        onConfirm={() => refundingTransaction && handleRefund(refundingTransaction)}
        submitting={refundMutation.isPending}
      />
    </div>
  );
}
