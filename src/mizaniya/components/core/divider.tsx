import { UISeparator } from "../../ui/separator";

export function Divider({ orientation = "horizontal", className }: { orientation?: "horizontal" | "vertical"; className?: string }) {
  return <UISeparator orientation={orientation} className={className} />;
}
