"use client";

import { createContext, useCallback, useContext, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "../utils/cn";

type ToastTone = "success" | "error" | "info";

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastItem, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const noop = () => () => {};

function useHasMounted() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const toneConfig: Record<ToastTone, { icon: ReactNode; iconClass: string }> = {
  success: { icon: <CheckCircle2 className="size-5" aria-hidden="true" />, iconClass: "text-success" },
  error: { icon: <AlertTriangle className="size-5" aria-hidden="true" />, iconClass: "text-error" },
  info: { icon: <Info className="size-5" aria-hidden="true" />, iconClass: "text-info" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const mounted = useHasMounted();

  const showToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted &&
        createPortal(
          <div
            className="pointer-events-none fixed bottom-6 right-6 z-[60] flex flex-col gap-2.5"
            role="region"
            aria-label="Notifications"
          >
            {toasts.map((toast) => {
              const config = toneConfig[toast.tone];
              return (
                <div
                  key={toast.id}
                  role="status"
                  className="pointer-events-auto flex w-[340px] items-start gap-3 rounded-[10px] border border-border bg-surface px-4 py-3.5 shadow-drawer"
                  style={{ animation: "ds-toast-in 180ms var(--ease-standard)" }}
                >
                  <span className={cn("mt-0.5 shrink-0", config.iconClass)}>{config.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary">{toast.title}</p>
                    {toast.description && (
                      <p className="mt-0.5 text-xs text-text-secondary">{toast.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label="Dismiss"
                    onClick={() => dismiss(toast.id)}
                    className="shrink-0 text-text-muted hover:text-text-primary"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
