"use client";

import { animate } from "framer-motion";
import { useEffect, useState } from "react";
import { DORZA_EASE } from "./Reveal";

export function useCountUp(
  target: number,
  trigger: boolean,
  { duration = 1.5, from = 0 }: { duration?: number; from?: number } = {}
) {
  const [value, setValue] = useState(trigger ? target : from);

  useEffect(() => {
    if (!trigger) {
      setValue(from);
      return;
    }
    const controls = animate(from, target, {
      duration,
      ease: DORZA_EASE,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [target, trigger, duration, from]);

  return value;
}
