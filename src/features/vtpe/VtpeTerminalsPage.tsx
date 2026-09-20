"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, SmartphoneNfc } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/design-system/components/Button";
import { Pagination } from "@/design-system/components/Pagination";
import { MetricCardSkeleton } from "@/design-system/components/MetricCard";
import { useToast } from "@/design-system/components/Toast";
import { MetricsGrid } from "./MetricsGrid";
import { TerminalToolbar } from "./TerminalToolbar";
import type { CategoryFilter, StatusFilter } from "./TerminalToolbar";
import { TerminalTable } from "./TerminalTable";
import { CreateTerminalDrawer } from "./CreateTerminalDrawer";
import { MOCK_BANK_ACCOUNTS, MOCK_TERMINALS } from "./mock-data";
import type { CreateTerminalInput, Terminal } from "./types";

const PAGE_SIZE = 8;

export function VtpeTerminalsPage() {
  const { showToast } = useToast();
  const [terminals, setTerminals] = useState<Terminal[]>(MOCK_TERMINALS);
  const [pageLoading, setPageLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return terminals.filter((t) => {
      if (q && !t.label.toLowerCase().includes(q) && !t.code.toLowerCase().includes(q)) {
        return false;
      }
      if (status !== "all" && t.status !== status) return false;
      if (category !== "all" && t.category !== category) return false;
      return true;
    });
  }, [terminals, search, status, category]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const hasFilters = search.trim() !== "" || status !== "all" || category !== "all";

  function clearFilters() {
    setSearch("");
    setStatus("all");
    setCategory("all");
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }
  function handleStatusChange(value: StatusFilter) {
    setStatus(value);
    setPage(1);
  }
  function handleCategoryChange(value: CategoryFilter) {
    setCategory(value);
    setPage(1);
  }

  async function handleCreate(input: CreateTerminalInput) {
    await new Promise((resolve) => setTimeout(resolve, 900));

    const newStatus = input.settlementType === "new_bank_account" ? "pending" : "active";
    const bankAccount =
      input.settlementType === "existing_bank_account"
        ? terminalBankAccount(input.bankAccountId)
        : undefined;

    const newTerminal: Terminal = {
      id: `t_${Date.now()}`,
      code: `VTPE-${Math.floor(10000 + Math.random() * 89999)}`,
      label: input.label,
      description: input.description,
      category: input.category,
      paymentVolume: 0,
      qrCodeCount: 0,
      settlementType: input.settlementType,
      bankAccount,
      status: newStatus,
      createdAt: new Date().toISOString(),
      lastActivityAt: newStatus === "active" ? "Just now" : undefined,
    };

    setTerminals((prev) => [newTerminal, ...prev]);
    setPage(1);
    showToast({
      tone: "success",
      title: "vTPE terminal created successfully.",
      description: `${newTerminal.label} (${newTerminal.code}) is ready.`,
    });
  }

  function handleToggleStatus(terminal: Terminal) {
    setTerminals((prev) =>
      prev.map((t) =>
        t.id === terminal.id
          ? { ...t, status: t.status === "disabled" ? "active" : "disabled" }
          : t,
      ),
    );
    showToast({
      tone: "info",
      title:
        terminal.status === "disabled"
          ? `${terminal.label} enabled.`
          : `${terminal.label} disabled.`,
    });
  }

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Payments", href: "/payments/overview" },
          { label: "vTPE", href: "/payments/vtpe/terminals" },
          { label: "Terminals" },
        ]}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-card bg-primary-soft text-primary">
            <SmartphoneNfc className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">vTPE Terminals</h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              Manage your payment terminals and monitor their activity.
            </p>
          </div>
        </div>
        <Button
          leadingIcon={<Plus className="size-4" aria-hidden="true" />}
          onClick={() => setDrawerOpen(true)}
          className="shrink-0"
        >
          Create terminal
        </Button>
      </div>

      {pageLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <MetricsGrid terminals={terminals} />
      )}

      <TerminalToolbar
        search={search}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        onCreate={() => setDrawerOpen(true)}
      />

      <TerminalTable
        terminals={paged}
        loading={pageLoading}
        onToggleStatus={handleToggleStatus}
        onClearFilters={clearFilters}
        hasFilters={hasFilters}
      />

      {!pageLoading && filtered.length > 0 && (
        <Pagination
          page={currentPage}
          pageCount={pageCount}
          onPageChange={setPage}
          totalLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(
            currentPage * PAGE_SIZE,
            filtered.length,
          )} of ${filtered.length} terminals`}
        />
      )}

      <CreateTerminalDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

function terminalBankAccount(id?: string) {
  if (!id) return undefined;
  return MOCK_BANK_ACCOUNTS.find((b) => b.id === id);
}
