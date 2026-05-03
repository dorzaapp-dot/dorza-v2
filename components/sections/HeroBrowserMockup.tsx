"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DORZA_EASE } from "@/components/motion/Reveal";

type Site = {
  key: string;
  name: string;
  url: string;
  tagline: string;
  cta: string;
  bg: string;
  hero: string;
  accent: string;
  textOnHero: string;
  chip: string;
};

const SITES: Site[] = [
  {
    key: "cafe",
    name: "Cremorne Coffee Co.",
    url: "cremornecoffee.com.au",
    tagline: "Single-origin roasts, made next door.",
    cta: "Order online",
    bg: "#FBF6EE",
    hero: "linear-gradient(135deg, #5C3D2E 0%, #8C6B4F 60%, #D9B68C 100%)",
    accent: "#7A9E7E",
    textOnHero: "#FFF7EC",
    chip: "#E9DCC4",
  },
  {
    key: "tradie",
    name: "Sydney Trade Co.",
    url: "sydneytrade.com.au",
    tagline: "Licensed sparkies. On-site in 2 hours.",
    cta: "Get a free quote",
    bg: "#F2F4F8",
    hero: "linear-gradient(135deg, #1B2A4A 0%, #2C3E66 60%, #E8742A 100%)",
    accent: "#E8742A",
    textOnHero: "#FFFFFF",
    chip: "#D9DEE8",
  },
  {
    key: "salon",
    name: "Bondi Hair Studio",
    url: "bondihair.com.au",
    tagline: "Cuts, colour and balayage by the beach.",
    cta: "Book now",
    bg: "#FBF1F2",
    hero: "linear-gradient(135deg, #E8B4B8 0%, #D89AA0 50%, #C4A35A 100%)",
    accent: "#C4A35A",
    textOnHero: "#FFFFFF",
    chip: "#F1D9DC",
  },
];

const CYCLE_MS = 4500;

export default function HeroBrowserMockup() {
  const shouldReduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const site = SITES[index];

  // Cycle through sites
  useEffect(() => {
    if (shouldReduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SITES.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [shouldReduce]);

  // Mouse parallax
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 16, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 80, damping: 16, mass: 0.4 });
  const rotateY = useTransform(sx, [-1, 1], [-11, -5]);
  const rotateX = useTransform(sy, [-1, 1], [5, 1]);

  useEffect(() => {
    if (shouldReduce) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      mx.set(Math.max(-1, Math.min(1, dx)));
      my.set(Math.max(-1, Math.min(1, dy)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, shouldReduce]);

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? {} : { opacity: 0, x: 40, rotateY: -20 }}
      animate={{ opacity: 1, x: 0, rotateY: shouldReduce ? 0 : -8 }}
      transition={{ duration: 0.8, delay: 0.3, ease: DORZA_EASE }}
      className="relative"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      aria-hidden="true"
    >
      <motion.div
        style={
          shouldReduce
            ? undefined
            : { rotateY, rotateX, transformStyle: "preserve-3d" }
        }
        className="rounded-card border border-border overflow-hidden bg-white shadow-card will-change-transform"
      >
        <BrowserChrome url={site.url} />

        <div className="relative h-[340px] sm:h-[360px]" style={{ background: site.bg }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={site.key}
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: DORZA_EASE }}
              className="absolute inset-0 flex flex-col"
            >
              {/* Mini nav */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: site.accent }}
                  />
                  <span className="font-body font-semibold text-[13px] tracking-[-0.01em] text-dark/90">
                    {site.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-7 rounded-full" style={{ background: site.chip }} />
                  <span className="h-1.5 w-7 rounded-full" style={{ background: site.chip }} />
                  <span className="h-1.5 w-7 rounded-full" style={{ background: site.chip }} />
                </div>
              </div>

              {/* Hero block */}
              <div
                className="relative flex-1 flex flex-col justify-end p-5"
                style={{ backgroundImage: site.hero }}
              >
                <div className="space-y-2">
                  <p
                    className="font-body font-semibold text-[18px] leading-tight tracking-[-0.01em] max-w-[80%]"
                    style={{ color: site.textOnHero }}
                  >
                    {site.tagline}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span
                      className="inline-flex items-center h-7 px-3 rounded-full text-[11px] font-semibold"
                      style={{ background: site.accent, color: "#fff" }}
                    >
                      {site.cta}
                    </span>
                    <span
                      className="inline-flex items-center h-7 px-3 rounded-full text-[11px] font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        color: site.textOnHero,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      Learn more
                    </span>
                  </div>
                </div>
              </div>

              {/* Cards row */}
              <div className="grid grid-cols-3 gap-2 p-3" style={{ background: site.bg }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-md"
                    style={{
                      background: site.chip,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating "Live in 24h" badge */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.0, ease: DORZA_EASE }}
        className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-primary text-white rounded-card px-4 py-3 shadow-medium"
      >
        <p className="font-mono text-[10px] text-white/70 uppercase tracking-widest leading-none">
          Live in
        </p>
        <p className="font-body font-bold text-[24px] leading-none mt-1 tracking-[-0.02em]">24h</p>
      </motion.div>
    </motion.div>
  );
}

function BrowserChrome({ url }: { url: string }) {
  const [typed, setTyped] = useState(url);

  useEffect(() => {
    let cancelled = false;
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      if (cancelled) return;
      i += 1;
      setTyped(url.slice(0, i));
      if (i >= url.length) clearInterval(id);
    }, 35);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [url]);

  return (
    <div className="bg-surface border-b border-border px-3 py-2.5 flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      <div className="flex-1 mx-3 h-6 bg-white border border-border rounded-full px-3 flex items-center">
        <span className="font-mono text-[11px] text-text-muted truncate">
          {typed}
          <span className="inline-block w-px h-3 bg-text-muted/60 align-middle ml-px animate-pulse-subtle" />
        </span>
      </div>
    </div>
  );
}
