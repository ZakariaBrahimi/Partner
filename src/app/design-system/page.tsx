"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Download,
  Filter,
  Plus,
  Search,
  Smartphone,
  SmartphoneNfc,
  Wallet,
} from "lucide-react";
import { Button, IconButton } from "@/design-system/components/Button";
import { TextInput, Textarea } from "@/design-system/components/TextInput";
import { Select } from "@/design-system/components/Select";
import { SearchInput } from "@/design-system/components/SearchInput";
import { RadioCard, RadioGroup } from "@/design-system/components/RadioCard";
import { FormField, CharacterCounter } from "@/design-system/components/FormField";
import { StatusBadge, CategoryBadge, Badge } from "@/design-system/components/Badge";
import { MetricCard, MetricCardSkeleton } from "@/design-system/components/MetricCard";
import { Table, TableHead, Th, TableBody, Tr, Td } from "@/design-system/components/Table";
import { MoneyAmount, SettlementMethod } from "@/design-system/components/Financial";
import { EmptyState } from "@/design-system/components/EmptyState";
import { LoadingSkeleton, TableRowSkeleton } from "@/design-system/components/LoadingSkeleton";
import { Pagination } from "@/design-system/components/Pagination";
import { Drawer } from "@/design-system/components/Drawer";
import { Modal } from "@/design-system/components/Modal";
import { ConfirmationDialog } from "@/design-system/components/ConfirmationDialog";
import { Dropdown } from "@/design-system/components/Dropdown";
import { Tooltip } from "@/design-system/components/Tooltip";
import { Alert } from "@/design-system/components/Alert";
import { useToast } from "@/design-system/components/Toast";
import { ShowcaseSection, ShowcaseRow, SwatchCard } from "./ShowcaseSection";

export default function DesignSystemPage() {
  const { showToast } = useToast();
  const [radioValue, setRadioValue] = useState<"classic" | "business">("classic");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [descValue, setDescValue] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-[1120px] items-center gap-4 px-6 py-4">
          <Link
            href="/payments/vtpe/terminals"
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to app
          </Link>
          <div className="ml-2">
            <p className="text-sm font-bold text-text-primary">Mizaniya Design System</p>
            <p className="text-xs text-text-secondary">Tokens, components, and states used across the Partner Platform.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1120px] px-6 py-10">
        <ShowcaseSection
          title="Color tokens"
          description="Brand, neutral, and semantic colors. All UI colors are pulled from these tokens."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            <SwatchCard name="Primary" variable="--color-primary" hex="#145A78" />
            <SwatchCard name="Primary hover" variable="--color-primary-hover" hex="#104A63" />
            <SwatchCard name="Primary soft" variable="--color-primary-soft" hex="#EAF4F8" />
            <SwatchCard name="Text primary" variable="--color-text-primary" hex="#17212B" />
            <SwatchCard name="Text secondary" variable="--color-text-secondary" hex="#5F6B76" />
            <SwatchCard name="Text muted" variable="--color-text-muted" hex="#8B96A1" />
            <SwatchCard name="Border" variable="--color-border" hex="#E2E7EB" />
            <SwatchCard name="Border strong" variable="--color-border-strong" hex="#C8D0D7" />
            <SwatchCard name="Background" variable="--color-background" hex="#F7F9FA" />
            <SwatchCard name="Surface" variable="--color-surface" hex="#FFFFFF" />
            <SwatchCard name="Success" variable="--color-success" hex="#168A55" />
            <SwatchCard name="Success soft" variable="--color-success-soft" hex="#EAF7F0" />
            <SwatchCard name="Warning" variable="--color-warning" hex="#B66A00" />
            <SwatchCard name="Warning soft" variable="--color-warning-soft" hex="#FFF5E6" />
            <SwatchCard name="Error" variable="--color-error" hex="#C83C3C" />
            <SwatchCard name="Error soft" variable="--color-error-soft" hex="#FDEEEE" />
            <SwatchCard name="Info" variable="--color-info" hex="#2767A5" />
            <SwatchCard name="Info soft" variable="--color-info-soft" hex="#EEF5FC" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Typography" description="Inter, with tabular numerals for financial values.">
          <div className="flex flex-col gap-3">
            <p className="text-[32px] font-bold leading-tight text-text-primary">Display / 32 / 650</p>
            <p className="text-2xl font-bold text-text-primary">Page title / 24 / 650</p>
            <p className="text-lg font-semibold text-text-primary">Section title / 18 / 600</p>
            <p className="text-sm font-semibold text-text-primary">Card title / 14 / 600</p>
            <p className="text-sm text-text-primary">Body / 14 / 400</p>
            <p className="text-sm font-semibold text-text-primary">Body strong / 14 / 600</p>
            <p className="text-xs text-text-muted">Metadata / 12 / 400</p>
            <p className="text-[26px] font-bold tabular-nums text-text-primary">2,842,500 DA — KPI / tabular</p>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Buttons" description="Primary, secondary, tertiary, destructive, and icon buttons — with hover, disabled, and loading states.">
          <ShowcaseRow>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" size="compact">Compact</Button>
            <IconButton icon={<Filter className="size-[18px]" />} label="Filter" variant="outline" />
            <IconButton icon={<Download className="size-[18px]" />} label="Download" />
          </ShowcaseRow>
        </ShowcaseSection>

        <ShowcaseSection title="Form controls" description="Text inputs, textareas, selects, and search — default, focus, filled, and error states.">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Label" required helperText="Helper text supports the field.">
              <TextInput placeholder="e.g. Downtown Store" />
            </FormField>
            <FormField label="With error" required error="Enter a terminal label.">
              <TextInput placeholder="e.g. Downtown Store" error />
            </FormField>
            <FormField label="Select">
              <Select defaultValue="">
                <option value="" disabled>Choose an option</option>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
              </Select>
            </FormField>
            <FormField label="Search">
              <SearchInput placeholder="Search terminals..." shortcut="Ctrl K" />
            </FormField>
            <FormField
              label="Description"
              counter={<CharacterCounter value={descValue.length} max={100} />}
              className="sm:col-span-2"
            >
              <Textarea
                placeholder="e.g. Main terminal at the front desk."
                maxLength={100}
                value={descValue}
                onChange={(e) => setDescValue(e.target.value)}
              />
            </FormField>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Radio cards" description="Large selectable cards used for category and settlement destination.">
          <RadioGroup name="Category" orientation="horizontal">
            <RadioCard
              selected={radioValue === "classic"}
              onSelect={() => setRadioValue("classic")}
              icon={<Smartphone className="size-[18px]" />}
              title="Classic"
              description="Standard terminal for most businesses."
            />
            <RadioCard
              selected={radioValue === "business"}
              onSelect={() => setRadioValue("business")}
              icon={<Briefcase className="size-[18px]" />}
              title="Business"
              description="Advanced features for higher-volume businesses."
            />
          </RadioGroup>
        </ShowcaseSection>

        <ShowcaseSection title="Badges" description="Status, category, and generic badges.">
          <ShowcaseRow>
            <StatusBadge status="active" />
            <StatusBadge status="pending" />
            <StatusBadge status="disabled" />
            <CategoryBadge category="classic" />
            <CategoryBadge category="business" />
            <Badge tone="info">Info</Badge>
            <Badge tone="neutral">Neutral</Badge>
          </ShowcaseRow>
        </ShowcaseSection>

        <ShowcaseSection title="Financial primitives" description="Money amounts and settlement method indicators, tabular-aligned.">
          <ShowcaseRow>
            <MoneyAmount value={2842500} />
            <MoneyAmount value={98400} muted />
            <SettlementMethod type="balance" />
            <SettlementMethod type="existing_bank_account" />
          </ShowcaseRow>
        </ShowcaseSection>

        <ShowcaseSection title="Metric cards" description="KPI cards with icon, trend, and loading skeleton.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              icon={<SmartphoneNfc className="size-[18px]" />}
              title="Active terminals"
              value="18"
              trend="12%"
              comparison="vs last 30 days"
            />
            <MetricCard
              icon={<Wallet className="size-[18px]" />}
              title="Payment volume today"
              value="2,842,500 DA"
              trend="18%"
              comparison="vs yesterday"
            />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Data table" description="Default, loading, and empty states.">
          <div className="flex flex-col gap-6">
            <Table>
              <TableHead>
                <Th>Terminal</Th>
                <Th>Category</Th>
                <Th align="right">Payment volume</Th>
                <Th>Settlement</Th>
                <Th>Status</Th>
              </TableHead>
              <TableBody>
                <Tr>
                  <Td>
                    <p className="font-semibold text-text-primary">Store Downtown</p>
                    <p className="text-xs text-text-muted">VTPE-28491</p>
                  </Td>
                  <Td><CategoryBadge category="classic" /></Td>
                  <Td align="right"><MoneyAmount value={284500} /></Td>
                  <Td><SettlementMethod type="balance" /></Td>
                  <Td><StatusBadge status="active" /></Td>
                </Tr>
                <TableRowSkeleton columns={5} />
              </TableBody>
            </Table>
            <Table>
              <TableHead>
                <Th>Terminal</Th>
                <Th>Category</Th>
                <Th align="right">Payment volume</Th>
                <Th>Settlement</Th>
                <Th>Status</Th>
              </TableHead>
              <tbody>
                <tr>
                  <td colSpan={5}>
                    <EmptyState
                      icon={<SmartphoneNfc className="size-5" />}
                      title="No terminals found"
                      description="Try changing or clearing your filters."
                      action={<Button variant="secondary" size="compact">Clear filters</Button>}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
            <Pagination page={page} pageCount={5} onPageChange={setPage} totalLabel="Showing 1–8 of 40 terminals" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Loading skeletons">
          <ShowcaseRow>
            <LoadingSkeleton className="h-4 w-24" />
            <LoadingSkeleton className="h-9 w-9 rounded-full" />
            <LoadingSkeleton className="h-10 w-40 rounded-input" />
          </ShowcaseRow>
        </ShowcaseSection>

        <ShowcaseSection title="Alerts" description="Inline feedback for informational, success, warning, and error states.">
          <div className="flex flex-col gap-3">
            <Alert tone="info" title="Verification required" description="New bank accounts may require verification before use." />
            <Alert tone="success" title="Terminal created" description="Your terminal is ready to accept payments." />
            <Alert tone="warning" title="Pending setup" description="This terminal has not processed a payment yet." />
            <Alert tone="error" title="Unable to create terminal" description="Please check the information and try again." />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Overlays" description="Drawer, modal, confirmation dialog, dropdown, and tooltip.">
          <ShowcaseRow>
            <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>
            <Button variant="secondary" onClick={() => setModalOpen(true)}>Open modal</Button>
            <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Open confirmation</Button>
            <Dropdown
              trigger={<Button variant="secondary">Row actions</Button>}
              sections={[
                [
                  { label: "View terminal", onSelect: () => {} },
                  { label: "Edit terminal", onSelect: () => {} },
                ],
                [{ label: "Disable terminal", destructive: true, onSelect: () => {} }],
              ]}
            />
            <Tooltip content="Copy terminal ID">
              <IconButton icon={<Search className="size-[18px]" />} label="Search" variant="outline" />
            </Tooltip>
          </ShowcaseRow>
        </ShowcaseSection>

        <ShowcaseSection title="Toasts" description="Success, error, and info notifications.">
          <ShowcaseRow>
            <Button
              variant="secondary"
              onClick={() =>
                showToast({ tone: "success", title: "vTPE terminal created successfully." })
              }
            >
              Trigger success
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                showToast({
                  tone: "error",
                  title: "Unable to create terminal",
                  description: "Please check the information and try again.",
                })
              }
            >
              Trigger error
            </Button>
            <Button
              variant="secondary"
              onClick={() => showToast({ tone: "info", title: "Terminal disabled." })}
            >
              Trigger info
            </Button>
          </ShowcaseRow>
        </ShowcaseSection>

        <ShowcaseSection title="Empty states">
          <div className="rounded-card border border-border bg-surface">
            <EmptyState
              icon={<Plus className="size-5" />}
              title="No vTPE terminals yet"
              description="Create your first payment terminal to start accepting payments."
              action={<Button>Create terminal</Button>}
            />
          </div>
        </ShowcaseSection>
      </main>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Create vTPE Terminal"
        description="Set up a new payment terminal and configure how you want to receive payments."
        footer={
          <>
            <Button variant="secondary" onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button onClick={() => setDrawerOpen(false)}>Create terminal</Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary">
          This is the same Drawer component used by the vTPE Terminals page.
        </p>
      </Drawer>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add bank account"
        description="Request a new bank account to receive payments from this terminal."
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Request account</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField label="Account holder name" required>
            <TextInput placeholder="e.g. Mizaniya Retail SARL" />
          </FormField>
          <FormField label="Bank" required>
            <Select defaultValue="">
              <option value="" disabled>Select a bank</option>
              <option>Al Baraka Bank</option>
              <option>CPA</option>
              <option>BNA</option>
            </Select>
          </FormField>
        </div>
      </Modal>

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
        title="Disable terminal?"
        description="Store Downtown will stop accepting payments until re-enabled."
        confirmLabel="Disable terminal"
        destructive
      />
    </div>
  );
}
