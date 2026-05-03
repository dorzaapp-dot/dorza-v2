"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HTMLAttributes } from "react";
import { DORZA_EASE } from "./Reveal";

interface SlideRevealProps extends HTMLAttributes<HTMLDivElement> {
  from?: "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  as?: "div" | "section" | "article" | "li";
}

export function SlideReveal({
  from = "left",
  delay = 0,
  duration = 0.7,
  distance = 48,
  as = "div",
  className,
  children,
  ...props
}: SlideRevealProps) {
  const shouldReduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  const x = from === "left" ? -distance : distance;

  return (
    <Tag
      initial={shouldReduce ? {} : { opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: DORZA_EASE }}
      className={className}
      {...(props as object)}
    >
      {children}
    </Tag>
  );
}
