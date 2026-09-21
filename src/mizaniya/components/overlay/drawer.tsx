"use client";

import type { ReactNode } from "react";
import { UISheetRoot, UISheetPortal, UISheetPopup, UISheetHeader } from "../../ui/sheet";

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = "520px",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}) {
  return (
    <UISheetRoot open={open} onOpenChange={(next) => !next && onClose()}>
      <UISheetPortal>
        <UISheetPopup width={width}>
          <UISheetHeader title={title} description={description} />
          <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
          {footer && <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">{footer}</div>}
        </UISheetPopup>
      </UISheetPortal>
    </UISheetRoot>
  );
}

export function DrawerSection({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={`flex flex-col gap-6 ${className ?? ""}`}>{children}</div>;
}
