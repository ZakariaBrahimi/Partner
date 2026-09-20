import { Banknote } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      icon={Banknote}
      title="Withdrawals"
      description="Request and track withdrawals from your partner balance."
      breadcrumbs={[{ label: "Withdrawals" }]}
    />
  );
}
