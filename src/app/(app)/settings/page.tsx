import { Settings } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      icon={Settings}
      title="Settings"
      description="Manage your account, team, and platform preferences."
      breadcrumbs={[{ label: "Settings" }]}
    />
  );
}
