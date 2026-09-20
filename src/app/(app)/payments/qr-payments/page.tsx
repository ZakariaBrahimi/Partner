import { QrCode } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      icon={QrCode}
      title="QR Payments"
      description="Manage QR codes used to accept in-person payments."
      breadcrumbs={[{ label: "Payments", href: "/payments/overview" }, { label: "QR Payments" }]}
    />
  );
}
