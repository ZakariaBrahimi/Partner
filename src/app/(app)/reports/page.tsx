import { FileBarChart } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      icon={FileBarChart}
      title="Reports"
      description="Generate and export detailed reports on your account activity."
      breadcrumbs={[{ label: "Reports" }]}
    />
  );
}
