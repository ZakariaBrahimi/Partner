import { Receipt } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      icon={Receipt}
      title="Transactions"
      description="Search and review every transaction processed on your account."
      breadcrumbs={[{ label: "Payments", href: "/payments/overview" }, { label: "Transactions" }]}
    />
  );
}
