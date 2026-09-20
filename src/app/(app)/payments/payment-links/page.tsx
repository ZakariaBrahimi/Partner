import { Link2 } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      icon={Link2}
      title="Payment Links"
      description="Create shareable links to collect payments without a terminal."
      breadcrumbs={[{ label: "Payments", href: "/payments/overview" }, { label: "Payment Links" }]}
    />
  );
}
