"use client";

import { Ban, CheckCircle2, Copy, Eye, MoreHorizontal, Pencil, Activity, SmartphoneNfc } from "lucide-react";
import { DataTable, DropdownMenu, IconButton, MoneyAmount, Button } from "@/mizaniya";
import type { DataTableColumnDef, DropdownMenuSection } from "@/mizaniya";
import { CategoryBadge, SettlementMethod, TerminalStatusBadge } from "./badges";
import type { Terminal } from "./types";

function rowActions(terminal: Terminal, onToggleStatus: (terminal: Terminal) => void): DropdownMenuSection[] {
  return [
    [
      { label: "View terminal", icon: <Eye className="size-4" aria-hidden="true" />, onSelect: () => {} },
      { label: "Edit terminal", icon: <Pencil className="size-4" aria-hidden="true" />, onSelect: () => {} },
      { label: "View activity", icon: <Activity className="size-4" aria-hidden="true" />, onSelect: () => {} },
      {
        label: "Copy terminal ID",
        icon: <Copy className="size-4" aria-hidden="true" />,
        onSelect: () => {
          if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(terminal.code).catch(() => {});
          }
        },
      },
    ],
    [
      terminal.status === "disabled"
        ? { label: "Enable terminal", icon: <CheckCircle2 className="size-4" aria-hidden="true" />, onSelect: () => onToggleStatus(terminal) }
        : {
            label: "Disable terminal",
            icon: <Ban className="size-4" aria-hidden="true" />,
            destructive: true,
            onSelect: () => onToggleStatus(terminal),
          },
    ],
  ];
}

function buildColumns(onToggleStatus: (terminal: Terminal) => void): DataTableColumnDef<Terminal>[] {
  return [
    {
      id: "terminal",
      header: "Terminal",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-text-primary">{row.original.label}</p>
          <p className="text-xs text-text-muted">{row.original.code}</p>
        </div>
      ),
    },
    { id: "category", header: "Category", cell: ({ row }) => <CategoryBadge category={row.original.category} /> },
    {
      id: "volume",
      header: "Payment volume",
      meta: { align: "right" },
      cell: ({ row }) => <MoneyAmount value={row.original.paymentVolume} />,
    },
    {
      id: "qr",
      header: "QR codes",
      meta: { align: "right" },
      cell: ({ row }) => <span className="tabular-nums">{row.original.qrCodeCount}</span>,
    },
    { id: "settlement", header: "Settlement", cell: ({ row }) => <SettlementMethod type={row.original.settlementType} /> },
    { id: "status", header: "Status", cell: ({ row }) => <TerminalStatusBadge status={row.original.status} /> },
    {
      id: "activity",
      header: "Last activity",
      cell: ({ row }) => <span className="text-text-secondary">{row.original.lastActivityAt ?? "—"}</span>,
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      meta: { align: "right" },
      cell: ({ row }) => {
        const terminal = row.original;
        return (
          <div className="flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu
              trigger={
                <IconButton icon={<MoreHorizontal className="size-[18px]" aria-hidden="true" />} label={`Actions for ${terminal.label}`} size="compact" />
              }
              sections={rowActions(terminal, onToggleStatus)}
            />
          </div>
        );
      },
    },
  ];
}

export function TerminalTable({
  terminals,
  loading,
  onToggleStatus,
  onClearFilters,
  hasFilters,
}: {
  terminals: Terminal[];
  loading?: boolean;
  onToggleStatus: (terminal: Terminal) => void;
  onClearFilters: () => void;
  hasFilters: boolean;
}) {
  const columns = buildColumns(onToggleStatus);

  return (
    <>
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={terminals}
          getRowId={(t) => t.id}
          loading={loading}
          emptyTitle={hasFilters ? "No terminals found" : "No vTPE terminals yet"}
          emptyDescription={
            hasFilters ? "Try changing or clearing your filters." : "Create your first payment terminal to start accepting payments."
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
        {!loading && terminals.length === 0 ? (
          <div className="rounded-card border border-border bg-surface">
            <MobileEmpty hasFilters={hasFilters} onClearFilters={onClearFilters} />
          </div>
        ) : (
          terminals.map((terminal) => (
            <div key={terminal.id} className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-text-primary">{terminal.label}</p>
                  <p className="text-xs text-text-muted">{terminal.code}</p>
                </div>
                <DropdownMenu
                  trigger={
                    <IconButton icon={<MoreHorizontal className="size-[18px]" aria-hidden="true" />} label={`Actions for ${terminal.label}`} size="compact" />
                  }
                  sections={rowActions(terminal, onToggleStatus)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge category={terminal.category} />
                <TerminalStatusBadge status={terminal.status} />
              </div>
              <div className="grid grid-cols-2 gap-3 border-t border-border pt-3 text-sm">
                <div>
                  <p className="text-xs text-text-muted">Payment volume</p>
                  <MoneyAmount value={terminal.paymentVolume} />
                </div>
                <div>
                  <p className="text-xs text-text-muted">QR codes</p>
                  <p className="tabular-nums font-semibold text-text-primary">{terminal.qrCodeCount}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Settlement</p>
                  <SettlementMethod type={terminal.settlementType} />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Last activity</p>
                  <p className="text-text-secondary">{terminal.lastActivityAt ?? "—"}</p>
                </div>
              </div>
            </div>
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
        <SmartphoneNfc className="size-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-text-primary">{hasFilters ? "No terminals found" : "No vTPE terminals yet"}</p>
        <p className="mt-1 max-w-sm text-sm text-text-secondary">
          {hasFilters ? "Try changing or clearing your filters." : "Create your first payment terminal to start accepting payments."}
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
