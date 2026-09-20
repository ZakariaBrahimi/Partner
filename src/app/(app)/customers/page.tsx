import { Users } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      icon={Users}
      title="Customers"
      description="View and manage the customers who transact with you."
      breadcrumbs={[{ label: "Customers" }]}
    />
  );
}
