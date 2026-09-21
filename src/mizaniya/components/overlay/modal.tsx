"use client";

import type { ReactNode } from "react";
import { UIDialogRoot, UIDialogPortal, UIDialogPopup, UIDialogHeader } from "../../ui/dialog";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = "460px",
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
    <UIDialogRoot open={open} onOpenChange={(next) => !next && onClose()}>
      <UIDialogPortal>
        <UIDialogPopup style={{ width, maxWidth: "calc(100vw - 32px)" }}>
          <UIDialogHeader title={title} description={description} />
          <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
          {footer && <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">{footer}</div>}
        </UIDialogPopup>
      </UIDialogPortal>
    </UIDialogRoot>
  );
}
