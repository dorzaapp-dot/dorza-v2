"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HTMLAttributes } from "react";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}

export function Reveal({ delay = 0, as = "div", className, children, ...props }: RevealProps) {
  const shouldReduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.28,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={className}
      {...(props as object)}
    >
      {children}
    </Tag>
  );
}
