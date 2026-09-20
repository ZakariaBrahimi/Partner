import { Wallet } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      icon={Wallet}
      title="Balance"
      description="Track your available balance and pending settlements."
      breadcrumbs={[{ label: "Balance" }]}
    />
  );
}
