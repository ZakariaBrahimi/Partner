"use client";

import { useMemo, useState } from "react";
import { Plus, SmartphoneNfc } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Alert, Button, MetricCardSkeleton, Pagination, useToast } from "@/mizaniya";
import { MetricsGrid } from "./MetricsGrid";
import { TerminalToolbar } from "./TerminalToolbar";
import type { CategoryFilter, StatusFilter } from "./TerminalToolbar";
import { TerminalTable } from "./TerminalTable";
import { CreateTerminalDrawer } from "./CreateTerminalDrawer";
import { useCreateTerminalMutation, useTerminalsQuery, useToggleTerminalStatusMutation } from "./queries";
import type { CreateTerminalInput, Terminal } from "./types";

const PAGE_SIZE = 8;

export function VtpeTerminalsPage() {
  const { showToast } = useToast();
  const { data: terminals, isPending, isError, refetch } = useTerminalsQuery();
  const createMutation = useCreateTerminalMutation();
  const toggleMutation = useToggleTerminalStatusMutation();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const allTerminals = useMemo(() => terminals ?? [], [terminals]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allTerminals.filter((t) => {
      if (q && !t.label.toLowerCase().includes(q) && !t.code.toLowerCase().includes(q)) return false;
      if (status !== "all" && t.status !== status) return false;
      if (category !== "all" && t.category !== category) return false;
      return true;
    });
  }, [allTerminals, search, status, category]);

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

  function handleCreate(input: CreateTerminalInput) {
    setSubmitError(null);
    createMutation.mutate(input, {
      onSuccess: (terminal) => {
        setPage(1);
        setDrawerOpen(false);
        showToast({
          tone: "success",
          title: "vTPE terminal created successfully.",
          description: `${terminal.label} (${terminal.code}) is ready.`,
        });
      },
      onError: () => {
        setSubmitError("Please check the information and try again.");
      },
    });
  }

  function handleToggleStatus(terminal: Terminal) {
    const willEnable = terminal.status === "disabled";
    toggleMutation.mutate(terminal.id, {
      onSuccess: () => {
        showToast({ tone: "info", title: willEnable ? `${terminal.label} enabled.` : `${terminal.label} disabled.` });
      },
    });
  }

  if (isError) {
    return (
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
        <Breadcrumbs items={[{ label: "Payments", href: "/payments/overview" }, { label: "vTPE", href: "/payments/vtpe/terminals" }, { label: "Terminals" }]} />
        <Alert
          tone="error"
          title="Unable to load terminals"
          description="Something went wrong while loading your terminals. Please try again."
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
            <p className="mt-0.5 text-sm text-text-secondary">Manage your payment terminals and monitor their activity.</p>
          </div>
        </div>
        <Button leadingIcon={<Plus className="size-4" aria-hidden="true" />} onClick={() => setDrawerOpen(true)} className="shrink-0">
          Create terminal
        </Button>
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <MetricsGrid terminals={allTerminals} />
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

      <TerminalTable terminals={paged} loading={isPending} onToggleStatus={handleToggleStatus} onClearFilters={clearFilters} hasFilters={hasFilters} />

      {!isPending && filtered.length > 0 && (
        <Pagination
          page={currentPage}
          pageCount={pageCount}
          onPageChange={setPage}
          totalLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length} terminals`}
        />
      )}

      <CreateTerminalDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCreate={handleCreate}
        submitting={createMutation.isPending}
        submitError={submitError}
      />
    </div>
  );
}
