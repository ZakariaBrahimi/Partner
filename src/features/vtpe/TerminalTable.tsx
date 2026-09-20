"use client";

import {
  Ban,
  Copy,
  Eye,
  MoreHorizontal,
  Pencil,
  Activity,
  CheckCircle2,
  SmartphoneNfc,
} from "lucide-react";
import { Table, TableHead, Th, TableBody, Tr, Td } from "@/design-system/components/Table";
import { StatusBadge, CategoryBadge } from "@/design-system/components/Badge";
import { MoneyAmount, SettlementMethod } from "@/design-system/components/Financial";
import { Dropdown } from "@/design-system/components/Dropdown";
import { IconButton, Button } from "@/design-system/components/Button";
import { TableRowSkeleton, LoadingSkeleton } from "@/design-system/components/LoadingSkeleton";
import { EmptyState } from "@/design-system/components/EmptyState";
import type { DropdownSection } from "@/design-system/components/Dropdown";
import type { Terminal } from "./types";

function rowActions(
  terminal: Terminal,
  onToggleStatus: (terminal: Terminal) => void,
): DropdownSection[] {
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
        ? {
            label: "Enable terminal",
            icon: <CheckCircle2 className="size-4" aria-hidden="true" />,
            onSelect: () => onToggleStatus(terminal),
          }
        : {
            label: "Disable terminal",
            icon: <Ban className="size-4" aria-hidden="true" />,
            destructive: true,
            onSelect: () => onToggleStatus(terminal),
          },
    ],
  ];
}

function EmptyTerminals({
  hasFilters,
  onClearFilters,
}: {
  hasFilters: boolean;
  onClearFilters: () => void;
}) {
  return (
    <EmptyState
      icon={<SmartphoneNfc className="size-5" aria-hidden="true" />}
      title={hasFilters ? "No terminals found" : "No vTPE terminals yet"}
      description={
        hasFilters
          ? "Try changing or clearing your filters."
          : "Create your first payment terminal to start accepting payments."
      }
      action={
        hasFilters ? (
          <Button variant="secondary" size="compact" onClick={onClearFilters}>
            Clear filters
          </Button>
        ) : undefined
      }
    />
  );
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
  const empty = !loading && terminals.length === 0;

  return (
    <>
      {/* Desktop / tablet: data table */}
      <div className="hidden md:block">
        <Table>
          <TableHead>
            <Th>Terminal</Th>
            <Th>Category</Th>
            <Th align="right">Payment volume</Th>
            <Th align="right">QR codes</Th>
            <Th>Settlement</Th>
            <Th>Status</Th>
            <Th>Last activity</Th>
            <Th>
              <span className="sr-only">Actions</span>
            </Th>
          </TableHead>
          {empty ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <EmptyTerminals hasFilters={hasFilters} onClearFilters={onClearFilters} />
                </td>
              </tr>
            </tbody>
          ) : (
            <TableBody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <TableRowSkeleton key={i} columns={8} />)
                : terminals.map((terminal) => (
                    <Tr key={terminal.id}>
                      <Td>
                        <p className="font-semibold text-text-primary">{terminal.label}</p>
                        <p className="text-xs text-text-muted">{terminal.code}</p>
                      </Td>
                      <Td>
                        <CategoryBadge category={terminal.category} />
                      </Td>
                      <Td align="right">
                        <MoneyAmount value={terminal.paymentVolume} />
                      </Td>
                      <Td align="right" className="tabular-nums">
                        {terminal.qrCodeCount}
                      </Td>
                      <Td>
                        <SettlementMethod type={terminal.settlementType} />
                      </Td>
                      <Td>
                        <StatusBadge status={terminal.status} />
                      </Td>
                      <Td className="text-text-secondary">{terminal.lastActivityAt ?? "—"}</Td>
                      <Td align="right" onClick={(e) => e.stopPropagation()}>
                        <Dropdown
                          trigger={
                            <IconButton
                              icon={<MoreHorizontal className="size-[18px]" aria-hidden="true" />}
                              label={`Actions for ${terminal.label}`}
                              size="compact"
                            />
                          }
                          sections={rowActions(terminal, onToggleStatus)}
                        />
                      </Td>
                    </Tr>
                  ))}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Mobile: card list */}
      <div className="flex flex-col gap-3 md:hidden">
        {empty ? (
          <div className="rounded-card border border-border bg-surface">
            <EmptyTerminals hasFilters={hasFilters} onClearFilters={onClearFilters} />
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
          terminals.map((terminal) => (
            <div key={terminal.id} className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-text-primary">{terminal.label}</p>
                  <p className="text-xs text-text-muted">{terminal.code}</p>
                </div>
                <Dropdown
                  trigger={
                    <IconButton
                      icon={<MoreHorizontal className="size-[18px]" aria-hidden="true" />}
                      label={`Actions for ${terminal.label}`}
                      size="compact"
                    />
                  }
                  sections={rowActions(terminal, onToggleStatus)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge category={terminal.category} />
                <StatusBadge status={terminal.status} />
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
