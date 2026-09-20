"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { IconButton } from "./Button";
import { useFocusTrap } from "../utils/useFocusTrap";
import { useBodyScrollLock } from "../utils/useBodyScrollLock";

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
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = "modal-title";

  useFocusTrap(panelRef, open, onClose);
  useBodyScrollLock(open);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#17212B]/40"
        style={{ animation: "ds-fade-in 180ms ease-out" }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[90vh] w-full flex-col rounded-modal bg-surface shadow-drawer"
        style={{ width, maxWidth: "100%", animation: "ds-scale-in 200ms var(--ease-standard)" }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <h2 id={titleId} className="text-base font-semibold text-text-primary">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm text-text-secondary">{description}</p>
            )}
          </div>
          <IconButton
            icon={<X className="size-5" aria-hidden="true" />}
            label="Close"
            onClick={onClose}
            className="shrink-0"
          />
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
