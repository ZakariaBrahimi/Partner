import type { ReactNode } from "react";
import { UIBadge } from "../../ui/badge";

export type BadgeTone = "neutral" | "success" | "warning" | "error" | "info" | "violet" | "sky" | "teal" | "orange" | "pink";

export function Badge({ tone = "neutral", icon, children }: { tone?: BadgeTone; icon?: ReactNode; children: ReactNode }) {
  return (
    <UIBadge tone={tone} icon={icon}>
      {children}
    </UIBadge>
  );
}
