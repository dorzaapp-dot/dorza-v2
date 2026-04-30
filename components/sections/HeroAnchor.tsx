"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HeroAnchor() {
  const shouldReduce = useReducedMotion();

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6, ease }}
      className="relative"
      aria-hidden="true"
    >
      <div className="rounded-card border border-border overflow-hidden bg-white shadow-card">
        <div className="bg-surface border-b border-border px-3 py-2.5 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="flex-1 mx-3 h-4 bg-border rounded-full" />
        </div>

        <div className="p-5 space-y-3.5">
          <div className="h-2 w-16 bg-primary/40 rounded-full" />
          <div className="space-y-1.5">
            <div className="h-5 bg-dark rounded-md w-11/12" />
            <div className="h-5 bg-dark rounded-md w-3/4" />
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="h-2 bg-border rounded-full w-full" />
            <div className="h-2 bg-border rounded-full w-5/6" />
          </div>
          <div className="flex gap-2 pt-1">
            <div className="h-8 w-24 bg-primary rounded-full" />
            <div className="h-8 w-20 bg-white border border-border rounded-full" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary-light to-[#FFE0C8] rounded-[10px]" />
            <div className="aspect-[4/3] bg-surface rounded-[10px]" />
            <div className="aspect-[4/3] bg-gradient-to-br from-[#FFF0E5] to-[#FFE5CC] rounded-[10px]" />
          </div>
        </div>
      </div>

      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.0, ease }}
        className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-primary text-white rounded-card px-4 py-3 shadow-medium"
      >
        <p className="font-mono text-[10px] text-white/70 uppercase tracking-widest leading-none">
          Live in
        </p>
        <p className="font-display font-bold text-[26px] leading-none mt-1">24h</p>
      </motion.div>
    </motion.div>
  );
}
