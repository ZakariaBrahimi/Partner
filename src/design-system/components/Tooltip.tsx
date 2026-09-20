"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export function Tooltip({
  content,
  children,
  side = "top",
}: {
  content: string;
  children: ReactNode;
  side?: "top" | "bottom";
}) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span aria-describedby={visible ? id : undefined}>{children}</span>
      {visible && (
        <span
          role="tooltip"
          id={id}
          className={cn(
            "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-[6px] bg-[#17212B] px-2 py-1 text-xs font-medium text-white",
            side === "top" ? "bottom-full mb-2" : "top-full mt-2",
          )}
          style={{ animation: "ds-fade-in 150ms ease-out" }}
        >
          {content}
        </span>
      )}
    </span>
  );
}
