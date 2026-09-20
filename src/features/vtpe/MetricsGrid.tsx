import { CircleSlash2, Clock, SmartphoneNfc, Wallet } from "lucide-react";
import { MetricCard } from "@/design-system/components/MetricCard";
import type { Terminal } from "./types";

export function MetricsGrid({ terminals }: { terminals: Terminal[] }) {
  const active = terminals.filter((t) => t.status === "active").length;
  const pending = terminals.filter((t) => t.status === "pending").length;
  const disabled = terminals.filter((t) => t.status === "disabled").length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        icon={<SmartphoneNfc className="size-[18px]" aria-hidden="true" />}
        title="Active terminals"
        value={String(active)}
        trend="12%"
        trendDirection="up"
        comparison="vs last 30 days"
      />
      <MetricCard
        icon={<Clock className="size-[18px]" aria-hidden="true" />}
        title="Pending setup"
        value={String(pending)}
        trend="1"
        trendDirection="up"
        comparison="vs last 30 days"
      />
      <MetricCard
        icon={<CircleSlash2 className="size-[18px]" aria-hidden="true" />}
        title="Disabled"
        value={String(disabled)}
        trend="1"
        trendDirection="up"
        comparison="vs last 30 days"
      />
      <MetricCard
        icon={<Wallet className="size-[18px]" aria-hidden="true" />}
        title="Payment volume today"
        value="2,842,500 DA"
        trend="18%"
        trendDirection="up"
        comparison="vs yesterday"
      />
    </div>
  );
}
