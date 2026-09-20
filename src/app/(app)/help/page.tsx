import { HelpCircle } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      icon={HelpCircle}
      title="Help & Support"
      description="Find answers or get in touch with the Mizaniya support team."
      breadcrumbs={[{ label: "Help & Support" }]}
    />
  );
}
