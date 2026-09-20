import { BarChart3 } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      icon={BarChart3}
      title="Payments Overview"
      description="A summary of your payment activity across all channels."
      breadcrumbs={[{ label: "Payments", href: "/payments/overview" }, { label: "Overview" }]}
    />
  );
}
