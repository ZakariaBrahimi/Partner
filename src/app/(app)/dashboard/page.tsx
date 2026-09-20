import { LayoutDashboard } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      icon={LayoutDashboard}
      title="Dashboard"
      description="A high-level overview of your account performance."
      breadcrumbs={[{ label: "Dashboard" }]}
    />
  );
}
