"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  Command as CommandIcon,
  CreditCard,
  Download,
  Plus,
  Receipt,
  Search,
  Smartphone,
  SmartphoneNfc,
  Wallet,
} from "lucide-react";
import {
  Button,
  IconButton,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Textarea,
  SearchInput,
  Select,
  Combobox,
  Checkbox,
  Radio,
  RadioGroup,
  RadioCard,
  DatePicker,
  DateRangePicker,
  computeDateRange,
  FormField,
  CharacterCounter,
  Badge,
  StatusBadge,
  MoneyAmount,
  PaymentMethodBadge,
  FeeBreakdown,
  MetricCard,
  MetricCardSkeleton,
  AnimatedNumber,
  DataTable,
  Pagination,
  EmptyState,
  ErrorState,
  LoadingSkeleton,
  Alert,
  useToast,
  Drawer,
  DrawerSection,
  Modal,
  ConfirmationDialog,
  Popover,
  DropdownMenu,
  Tooltip,
  TooltipProvider,
  Timeline,
  LineChart,
  AreaChart,
  BarChart,
  DonutChart,
  FilterPopover,
  ActiveFilters,
  CommandPalette,
} from "@/mizaniya";
import type { DataTableColumnDef, DateRange, FilterGroup, FilterValues } from "@/mizaniya";
import { ShowcaseSection, ShowcaseRow, SwatchCard } from "./ShowcaseSection";

interface DemoRow {
  id: string;
  terminal: string;
  category: "classic" | "business";
  volume: number;
  status: "active" | "pending" | "disabled";
}

const DEMO_ROWS: DemoRow[] = [
  { id: "VTPE-28491", terminal: "Store Downtown", category: "classic", volume: 284500, status: "active" },
  { id: "VTPE-19042", terminal: "Warehouse North", category: "business", volume: 512300, status: "active" },
  { id: "VTPE-77213", terminal: "Kiosk Airport", category: "classic", volume: 96200, status: "pending" },
];

const demoColumns: DataTableColumnDef<DemoRow>[] = [
  {
    id: "terminal",
    header: "Terminal",
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-text-primary">{row.original.terminal}</p>
        <p className="text-xs text-text-muted">{row.original.id}</p>
      </div>
    ),
  },
  {
    id: "category",
    header: "Category",
    cell: ({ row }) => <Badge tone={row.original.category === "business" ? "info" : "neutral"}>{row.original.category === "business" ? "Business" : "Classic"}</Badge>,
  },
  {
    id: "volume",
    header: "Volume",
    enableSorting: true,
    meta: { align: "right" },
    cell: ({ row }) => <MoneyAmount value={row.original.volume} />,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const tone = row.original.status === "active" ? "success" : row.original.status === "pending" ? "warning" : "neutral";
      const label = row.original.status === "active" ? "Active" : row.original.status === "pending" ? "Pending" : "Disabled";
      return <StatusBadge tone={tone} label={label} />;
    },
  },
];

const demoFilterGroups: FilterGroup[] = [
  {
    id: "status",
    label: "Status",
    type: "multi",
    options: [
      { value: "successful", label: "Successful" },
      { value: "pending", label: "Pending" },
      { value: "failed", label: "Failed" },
    ],
  },
  {
    id: "method",
    label: "Payment method",
    type: "single",
    options: [
      { value: "wallet", label: "Mizaniya Wallet" },
      { value: "cib", label: "CIB" },
    ],
  },
];

const chartData = [
  { label: "Mon", total: 42000, successful: 38000 },
  { label: "Tue", total: 51000, successful: 47000 },
  { label: "Wed", total: 33000, successful: 30000 },
  { label: "Thu", total: 61000, successful: 52000 },
  { label: "Fri", total: 58000, successful: 55000 },
  { label: "Sat", total: 24000, successful: 22000 },
  { label: "Sun", total: 19000, successful: 18000 },
];

const donutData = [
  { label: "Successful", value: 72, colorKey: "success" as const },
  { label: "Pending", value: 12, colorKey: "warning" as const },
  { label: "Failed", value: 16, colorKey: "error" as const },
];

export default function DesignSystemPage() {
  const { showToast } = useToast();

  const [radioCardValue, setRadioCardValue] = useState<"classic" | "business">("classic");
  const [radioOption, setRadioOption] = useState("a");
  const [checkedA, setCheckedA] = useState(true);
  const [checkedB, setCheckedB] = useState(false);
  const [descValue, setDescValue] = useState("");
  const [comboValue, setComboValue] = useState<string | null>(null);
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>(() => computeDateRange("30d"));
  const [filterValues, setFilterValues] = useState<FilterValues>({ status: ["successful"] });

  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(2842500);

  return (
    <TooltipProvider delay={300}>
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
            <Image src="/mizaniya-mark.png" alt="" width={28} height={28} className="ml-2 rounded-[6px]" />
            <div>
              <p className="text-sm font-bold text-text-primary">Mizaniya Design System</p>
              <p className="text-xs text-text-secondary">
                Tokens and components built on shadcn-style primitives (Base UI), Tailwind, TanStack, Recharts, and Motion — the
                single foundation every Partner Platform feature consumes.
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1120px] px-6 py-10">
          <ShowcaseSection title="Color tokens" description="Brand, neutral, and semantic colors. All UI colors are pulled from these tokens.">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              <SwatchCard name="Primary" variable="--color-primary" hex="#145A78" />
              <SwatchCard name="Primary hover" variable="--color-primary-hover" hex="#104A63" />
              <SwatchCard name="Primary active" variable="--color-primary-active" hex="#0D3E54" />
              <SwatchCard name="Primary soft" variable="--color-primary-soft" hex="#EAF4F8" />
              <SwatchCard name="Text primary" variable="--color-text-primary" hex="#17212B" />
              <SwatchCard name="Text secondary" variable="--color-text-secondary" hex="#5F6B76" />
              <SwatchCard name="Text muted" variable="--color-text-muted" hex="#8B96A1" />
              <SwatchCard name="Text disabled" variable="--color-text-disabled" hex="#AEB6BD" />
              <SwatchCard name="Border" variable="--color-border" hex="#E2E7EB" />
              <SwatchCard name="Border strong" variable="--color-border-strong" hex="#C8D0D7" />
              <SwatchCard name="Background" variable="--color-background" hex="#F7F9FA" />
              <SwatchCard name="Surface" variable="--color-surface" hex="#FFFFFF" />
              <SwatchCard name="Surface muted" variable="--color-surface-muted" hex="#F1F3F5" />
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

          <ShowcaseSection title="Spacing & radius" description="Card, input, button, and modal radii, plus the base spacing scale.">
            <ShowcaseRow>
              {[1, 2, 3, 4, 6, 8, 10, 12].map((n) => (
                <div key={n} className="flex flex-col items-center gap-1.5">
                  <div className="bg-primary-soft" style={{ width: n * 4, height: n * 4 }} />
                  <span className="text-[11px] text-text-muted">{n * 4}px</span>
                </div>
              ))}
            </ShowcaseRow>
            <ShowcaseRow className="mt-4">
              <div className="flex flex-col items-center gap-1.5">
                <div className="size-14 rounded-input border border-border-strong bg-surface" />
                <span className="text-[11px] text-text-muted">rounded-input</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="size-14 rounded-button border border-border-strong bg-surface" />
                <span className="text-[11px] text-text-muted">rounded-button</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="size-14 rounded-card border border-border-strong bg-surface" />
                <span className="text-[11px] text-text-muted">rounded-card</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="size-14 rounded-modal border border-border-strong bg-surface" />
                <span className="text-[11px] text-text-muted">rounded-modal</span>
              </div>
            </ShowcaseRow>
          </ShowcaseSection>

          <ShowcaseSection title="Buttons" description="Primary, secondary, tertiary, ghost, destructive, link, and icon buttons — with hover, disabled, and loading states.">
            <ShowcaseRow>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" size="compact">Compact</Button>
              <IconButton icon={<Search className="size-[18px]" aria-hidden="true" />} label="Search" variant="outline" />
              <IconButton icon={<Download className="size-[18px]" aria-hidden="true" />} label="Download" />
            </ShowcaseRow>
          </ShowcaseSection>

          <ShowcaseSection title="Cards" description="Default, interactive, outlined, and muted surfaces.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader title="Default card" description="Standard surface." />
                <CardBody>
                  <p className="text-sm text-text-secondary">Used for most content blocks.</p>
                </CardBody>
              </Card>
              <Card variant="interactive">
                <CardHeader title="Interactive card" description="Hoverable, clickable." />
                <CardBody>
                  <p className="text-sm text-text-secondary">Hover to see the elevation change.</p>
                </CardBody>
              </Card>
              <Card variant="muted">
                <CardHeader title="Muted card" description="De-emphasized surface." />
                <CardBody>
                  <p className="text-sm text-text-secondary">Used for secondary content.</p>
                </CardBody>
              </Card>
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="Inputs & selects" description="Text inputs, textareas, selects, combobox, and search — default, focus, and error states.">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="Label" required htmlFor="ds-input" helperText="Helper text supports the field.">
                <Input id="ds-input" placeholder="e.g. Downtown Store" />
              </FormField>
              <FormField label="With error" required htmlFor="ds-input-error" error="Enter a terminal label.">
                <Input id="ds-input-error" placeholder="e.g. Downtown Store" error />
              </FormField>
              <FormField label="Select" htmlFor="ds-select">
                <Select
                  value={undefined}
                  onValueChange={() => {}}
                  placeholder="Choose an option"
                  options={[
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B" },
                  ]}
                />
              </FormField>
              <FormField label="Combobox" htmlFor="ds-combobox">
                <Combobox
                  options={[
                    { value: "cib", label: "CIB" },
                    { value: "edahabia", label: "EDAHABIA" },
                    { value: "bna", label: "BNA" },
                  ]}
                  value={comboValue}
                  onValueChange={setComboValue}
                  placeholder="Search a bank..."
                />
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
            <div className="mt-2 flex flex-wrap items-center gap-6">
              <Checkbox id="ds-check-a" label="Checked" checked={checkedA} onCheckedChange={(v) => setCheckedA(v === true)} />
              <Checkbox id="ds-check-b" label="Unchecked" checked={checkedB} onCheckedChange={(v) => setCheckedB(v === true)} />
              <Checkbox id="ds-check-disabled" label="Disabled" disabled />
              <RadioGroup name="ds-radio" value={radioOption} onValueChange={setRadioOption} orientation="horizontal">
                <Radio id="ds-radio-a" value="a" label="Option A" />
                <Radio id="ds-radio-b" value="b" label="Option B" />
              </RadioGroup>
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="Radio cards" description="Large selectable cards used for category and settlement destination.">
            <RadioGroup name="Category" value={radioCardValue} onValueChange={(v) => setRadioCardValue(v as "classic" | "business")} orientation="horizontal">
              <RadioCard
                value="classic"
                icon={<Smartphone className="size-[18px]" aria-hidden="true" />}
                title="Classic"
                description="Standard terminal for most businesses."
              />
              <RadioCard
                value="business"
                icon={<Briefcase className="size-[18px]" aria-hidden="true" />}
                title="Business"
                description="Advanced features for higher-volume businesses."
              />
            </RadioGroup>
          </ShowcaseSection>

          <ShowcaseSection title="Date pickers" description="Single-date picker and the global date-range control (presets + custom range).">
            <ShowcaseRow>
              <DatePicker value={singleDate} onChange={setSingleDate} />
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            </ShowcaseRow>
          </ShowcaseSection>

          <ShowcaseSection
            title="Badges"
            description="StatusBadge is a generic tone + label + icon primitive. Domain badges (transaction status, payment method) compose it rather than duplicating it."
          >
            <ShowcaseRow>
              <StatusBadge tone="success" label="Successful" />
              <StatusBadge tone="warning" label="Pending" />
              <StatusBadge tone="error" label="Failed" />
              <StatusBadge tone="info" label="Refund processing" />
              <StatusBadge tone="neutral" label="Refunded" />
              <Badge tone="info">Info</Badge>
              <Badge tone="neutral">Neutral</Badge>
            </ShowcaseRow>
          </ShowcaseSection>

          <ShowcaseSection title="Financial primitives" description="Money amounts, payment-method indicators, and fee breakdowns — tabular-aligned and reused by every money-handling feature.">
            <ShowcaseRow>
              <MoneyAmount value={2842500} />
              <MoneyAmount value={10000} fractionDigits={2} />
              <MoneyAmount value={98400} muted />
              <MoneyAmount value={-1500} fractionDigits={2} />
            </ShowcaseRow>
            <ShowcaseRow className="mt-3">
              <PaymentMethodBadge method="wallet" />
              <PaymentMethodBadge method="cib" />
              <PaymentMethodBadge method="edahabia" />
              <PaymentMethodBadge method="bank_transfer" />
              <PaymentMethodBadge method="other" />
            </ShowcaseRow>
            <div className="mt-4 max-w-sm">
              <FeeBreakdown
                rows={[
                  { label: "Payment amount", value: 10000 },
                  { label: "Processing fee", value: 200 },
                  { label: "Net amount", value: 9800, strong: true },
                ]}
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="Metric cards" description="KPI cards with icon, trend, animated value tweening, and a loading skeleton.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                icon={<SmartphoneNfc className="size-[18px]" aria-hidden="true" />}
                title="Active terminals"
                value="18"
                trend="12%"
                comparison="vs last 30 days"
              />
              <MetricCard
                icon={<Wallet className="size-[18px]" aria-hidden="true" />}
                title="Payment volume today"
                value={<AnimatedNumber value={animatedValue} formatter={(n) => `${Math.round(n).toLocaleString("en-US")} DA`} />}
                trend="18%"
                comparison="vs yesterday"
              />
              <MetricCardSkeleton />
              <MetricCardSkeleton />
            </div>
            <div className="mt-3">
              <Button variant="secondary" size="compact" onClick={() => setAnimatedValue((v) => (v === 2842500 ? 3190800 : 2842500))}>
                Animate value
              </Button>
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="Charts" description="Line, area, bar, and donut charts built on Recharts — colors pulled from the same token palette.">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader title="Line chart" />
                <CardBody>
                  <LineChart data={chartData} xKey="label" series={[{ key: "total", label: "Total volume", colorKey: "primary" }, { key: "successful", label: "Successful", colorKey: "success" }]} height={200} />
                </CardBody>
              </Card>
              <Card>
                <CardHeader title="Area chart" />
                <CardBody>
                  <AreaChart data={chartData} xKey="label" series={[{ key: "total", label: "Total volume", colorKey: "neutral" }, { key: "successful", label: "Successful", colorKey: "primary" }]} height={200} />
                </CardBody>
              </Card>
              <Card>
                <CardHeader title="Bar chart" />
                <CardBody>
                  <BarChart data={chartData} xKey="label" series={[{ key: "total", label: "Total volume", colorKey: "primary" }]} height={200} />
                </CardBody>
              </Card>
              <Card>
                <CardHeader title="Donut chart" />
                <CardBody>
                  <DonutChart data={donutData} height={200} />
                </CardBody>
              </Card>
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="Data table" description="TanStack Table-backed, with sortable headers, loading skeleton, and empty state.">
            <div className="flex flex-col gap-6">
              <DataTable
                columns={demoColumns}
                data={DEMO_ROWS}
                getRowId={(r) => r.id}
                emptyTitle="No terminals found"
              />
              <DataTable columns={demoColumns} data={[]} loading loadingRowCount={3} emptyTitle="No terminals found" />
              <DataTable
                columns={demoColumns}
                data={[]}
                emptyTitle="No terminals found"
                emptyDescription="Try changing or clearing your filters."
                emptyAction={<Button variant="secondary" size="compact">Clear filters</Button>}
              />
              <Pagination page={page} pageCount={5} onPageChange={setPage} totalLabel="Showing 1–8 of 40 terminals" />
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="Filters" description="Generic single/multi-select filter groups in a popover, plus removable active-filter chips.">
            <div className="flex flex-col gap-3">
              <FilterPopover groups={demoFilterGroups} values={filterValues} onApply={setFilterValues} />
              <ActiveFilters
                groups={demoFilterGroups}
                values={filterValues}
                onRemove={(groupId, value) =>
                  setFilterValues((prev) => ({ ...prev, [groupId]: (prev[groupId] ?? []).filter((v) => v !== value) }))
                }
                onClearAll={() => setFilterValues({})}
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="Loading skeletons">
            <ShowcaseRow>
              <LoadingSkeleton className="h-4 w-24" />
              <LoadingSkeleton className="h-9 w-9 rounded-full" />
              <LoadingSkeleton className="h-10 w-40 rounded-input" />
            </ShowcaseRow>
          </ShowcaseSection>

          <ShowcaseSection title="Empty & error states">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-card border border-border bg-surface">
                <EmptyState
                  icon={<Plus className="size-5" aria-hidden="true" />}
                  title="No vTPE terminals yet"
                  description="Create your first payment terminal to start accepting payments."
                  action={<Button>Create terminal</Button>}
                />
              </div>
              <div className="rounded-card border border-border bg-surface">
                <ErrorState
                  title="Unable to load terminals"
                  description="Something went wrong while loading your terminals."
                  onRetry={() => {}}
                />
              </div>
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="Alerts" description="Inline feedback for informational, success, warning, and error states.">
            <div className="flex flex-col gap-3">
              <Alert tone="info" title="Verification required" description="New bank accounts may require verification before use." />
              <Alert tone="success" title="Terminal created" description="Your terminal is ready to accept payments." />
              <Alert tone="warning" title="Pending setup" description="This terminal has not processed a payment yet." />
              <Alert tone="error" title="Unable to create terminal" description="Please check the information and try again." />
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="Toasts" description="Success, error, warning, and info notifications — powered by Sonner internally.">
            <ShowcaseRow>
              <Button variant="secondary" onClick={() => showToast({ tone: "success", title: "vTPE terminal created successfully." })}>
                Trigger success
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  showToast({ tone: "error", title: "Unable to create terminal", description: "Please check the information and try again." })
                }
              >
                Trigger error
              </Button>
              <Button variant="secondary" onClick={() => showToast({ tone: "warning", title: "This terminal is pending setup." })}>
                Trigger warning
              </Button>
              <Button variant="secondary" onClick={() => showToast({ tone: "info", title: "Terminal disabled." })}>
                Trigger info
              </Button>
            </ShowcaseRow>
          </ShowcaseSection>

          <ShowcaseSection title="Overlays" description="Drawer, modal, confirmation dialog, popover, dropdown menu, and tooltip.">
            <ShowcaseRow>
              <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>
              <Button variant="secondary" onClick={() => setModalOpen(true)}>Open modal</Button>
              <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Open confirmation</Button>
              <Popover
                open={popoverOpen}
                onOpenChange={setPopoverOpen}
                trigger={<Button variant="secondary">Open popover</Button>}
              >
                <div className="p-3 text-sm text-text-secondary">A generic popover panel.</div>
              </Popover>
              <DropdownMenu
                trigger={<Button variant="secondary">Row actions</Button>}
                sections={[
                  [
                    { label: "View terminal", icon: <Receipt className="size-4" aria-hidden="true" />, onSelect: () => {} },
                    { label: "Edit terminal", onSelect: () => {} },
                  ],
                  [{ label: "Disable terminal", destructive: true, onSelect: () => {} }],
                ]}
              />
              <Tooltip content="Copy terminal ID">
                <IconButton icon={<CreditCard className="size-[18px]" aria-hidden="true" />} label="Copy" variant="outline" />
              </Tooltip>
              <Button variant="secondary" leadingIcon={<CommandIcon className="size-4" aria-hidden="true" />} onClick={() => setPaletteOpen(true)}>
                Command palette (⌘K)
              </Button>
            </ShowcaseRow>
          </ShowcaseSection>

          <ShowcaseSection title="Timeline" description="Chronological event list — used for transaction and refund lifecycles.">
            <div className="max-w-md">
              <Timeline
                steps={[
                  { id: "1", label: "Payment initiated", timestamp: "31 Aug 2026, 22:58", tone: "info" },
                  { id: "2", label: "Payment completed", timestamp: "31 Aug 2026, 22:59", tone: "success" },
                  {
                    id: "3",
                    label: "Refund requested",
                    timestamp: "1 Sep 2026, 09:12",
                    description: "The refund is being processed.",
                    tone: "info",
                  },
                  { id: "4", label: "Refund completed", timestamp: "1 Sep 2026, 09:40", tone: "neutral" },
                ]}
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
          <DrawerSection>
            <p className="text-sm text-text-secondary">This is the same Drawer component used across the Partner Platform.</p>
            <FormField label="Terminal label" required>
              <Input placeholder="e.g. Downtown Store" />
            </FormField>
          </DrawerSection>
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
              <Input placeholder="e.g. Mizaniya Retail SARL" />
            </FormField>
            <FormField label="Bank" required>
              <Select
                value={undefined}
                onValueChange={() => {}}
                placeholder="Select a bank"
                options={[
                  { value: "albaraka", label: "Al Baraka Bank" },
                  { value: "cpa", label: "CPA" },
                  { value: "bna", label: "BNA" },
                ]}
              />
            </FormField>
            <Divider />
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Banknote className="size-4" aria-hidden="true" />
              New bank accounts may require verification before use.
            </div>
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

        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          groups={[
            {
              heading: "Navigate",
              items: [
                { id: "payments", label: "Go to Payments", icon: <CreditCard className="size-4" aria-hidden="true" />, onSelect: () => {} },
                { id: "terminals", label: "Go to vTPE Terminals", icon: <SmartphoneNfc className="size-4" aria-hidden="true" />, onSelect: () => {} },
              ],
            },
          ]}
        />
      </div>
    </TooltipProvider>
  );
}
