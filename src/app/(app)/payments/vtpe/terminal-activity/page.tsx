import { Activity } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      icon={Activity}
      title="Terminal Activity"
      description="A live feed of activity across all your vTPE terminals."
      breadcrumbs={[
        { label: "Payments", href: "/payments/overview" },
        { label: "vTPE", href: "/payments/vtpe/terminals" },
        { label: "Terminal Activity" },
      ]}
    />
  );
}
