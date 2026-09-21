"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";

/** Subtly tweens between numeric values on change (Motion) — used for KPI
 * counts where a jump would otherwise be jarring on filter/date changes. */
export function AnimatedNumber({
  value,
  formatter,
  className,
}: {
  value: number;
  formatter?: (n: number) => string;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    const controls = animate(prevValue.current, value, {
      duration: 0.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    prevValue.current = value;
    return () => controls.stop();
  }, [value]);

  return <span className={className}>{formatter ? formatter(display) : Math.round(display).toLocaleString("en-US")}</span>;
}
