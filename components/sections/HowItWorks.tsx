"use client";

import { ReactNode, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

type Step = { num: string; title: string; desc: string; visual: ReactNode };

const steps: Step[] = [
  {
    num: "01",
    title: "Tell us about your business",
    desc: "Fill out a quick form — takes about 5 minutes. Tell us what you do, who your customers are, and what you want your digital presence to look like.",
    visual: (
      <div className="rounded-[10px] border border-border bg-surface p-4 space-y-3">
        {["Business name", "Your suburb", "What you do"].map((label) => (
          <div key={label}>
            <div className="h-2.5 bg-border rounded-full w-24 mb-1.5" />
            <div className="h-8 bg-white border border-border rounded-full w-full" />
          </div>
        ))}
        <div className="h-8 bg-primary rounded-full w-full mt-2" />
      </div>
    ),
  },
  {
    num: "02",
    title: "We build everything",
    desc: "Our team — backed by AI — builds your website, sets up Google Business, and prepares your social profiles. Done in 24–48 hours, no back-and-forth.",
    visual: (
      <div className="rounded-[10px] border border-border bg-surface p-4">
        <div className="space-y-2">
          {[
            { label: "Website", done: true },
            { label: "Google Business", done: true },
            { label: "Social profiles", done: false },
          ].map(({ label, done }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  done ? "bg-primary" : "bg-border"
                }`}
              >
                {done && <span className="text-white text-[10px]">✓</span>}
              </div>
              <span className="text-sm text-text-secondary">{label}</span>
              {!done && (
                <div className="ml-auto h-2 w-12 bg-border rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "03",
    title: "You review and approve",
    desc: "We send you a link to preview everything. You ask for changes, we make them — usually same day. When you're happy, you say go.",
    visual: (
      <div className="rounded-[10px] border border-border bg-white p-4 space-y-3">
        <div className="h-20 bg-surface rounded-sm" />
        <div className="flex gap-2">
          <div className="h-8 flex-1 bg-primary rounded-full" />
          <div className="h-8 flex-1 bg-border rounded-full" />
        </div>
      </div>
    ),
  },
  {
    num: "04",
    title: "Sit back, we run it",
    desc: "Posts go out on schedule. Enquiries get answered. Your Google ranking improves. You get a monthly report. You just run your business.",
    visual: (
      <div className="rounded-[10px] border border-border bg-surface p-4">
        <svg viewBox="0 0 160 60" className="w-full h-12">
          <polyline
            points="0,50 25,40 50,42 75,28 100,18 125,12 160,4"
            fill="none"
            stroke="#E8742A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="160" cy="4" r="4" fill="#E8742A" />
        </svg>
        <div className="flex justify-between mt-2">
          <span className="font-mono text-[10px] text-text-muted">Day 1</span>
          <span className="font-mono text-[10px] text-primary font-semibold">
            +42% growth
          </span>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white">
      <DesktopTimeline />
      <MobileTimeline />
    </section>
  );
}

function DesktopTimeline() {
  const shouldReduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Translate horizontally so the last step lands flush with the right edge.
  // For N panels each 100vw wide, total width = N*100vw, max translate = (N-1)*100vw,
  // expressed as percent of the inner: -(N-1)/N * 100%.
  const maxPct = -((steps.length - 1) / steps.length) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${maxPct}%`]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Container height: one viewport per step. First viewport "settles in", rest scrub the translate.
  const totalVh = steps.length * 100;

  return (
    <div
      ref={trackRef}
      className="hidden md:block relative"
      style={{ height: `${totalVh}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header + progress bar */}
        <div className="pt-28 pb-6 shrink-0">
          <Container>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary mb-3">
                {"// How it works"}
              </p>
              <h2 className="font-display font-bold text-[36px] lg:text-[44px] leading-[1.05] tracking-[-0.03em] text-dark">
                From zero to live in four steps
              </h2>
            </Reveal>

            <div className="mt-8 relative h-px w-full bg-border overflow-hidden">
              <motion.div
                style={{
                  scaleX: shouldReduce ? 1 : progressScale,
                  transformOrigin: "left",
                }}
                className="absolute inset-0 bg-primary"
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              {steps.map((s) => (
                <span
                  key={s.num}
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted"
                >
                  {s.num}
                </span>
              ))}
            </div>
          </Container>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 min-h-0 relative">
          <motion.div
            style={{
              x: shouldReduce ? "0%" : x,
              width: `${steps.length * 100}vw`,
              willChange: "transform",
            }}
            className="flex h-full"
          >
            {steps.map((s, i) => (
              <StepPanel key={s.num} step={s} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StepPanel({ step, index }: { step: Step; index: number }) {
  return (
    <div className="w-screen h-full shrink-0 flex items-center">
      <Container>
        <div className="grid grid-cols-12 gap-10 items-center">
          {/* Watermark step number */}
          <div className="col-span-7 relative">
            <div
              aria-hidden="true"
              className="font-display font-bold text-[180px] lg:text-[220px] leading-none tracking-[-0.04em] text-dark/[0.06] select-none pointer-events-none"
            >
              {step.num}
            </div>
            <div className="relative -mt-32 lg:-mt-40 max-w-lg">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary mb-3">
                Step {index + 1} of {steps.length}
              </p>
              <h3 className="font-display font-semibold text-[32px] lg:text-[40px] leading-[1.08] tracking-[-0.03em] text-dark mb-4">
                {step.title}
              </h3>
              <p className="text-[17px] lg:text-[18px] leading-relaxed tracking-[-0.01em] text-text-secondary">
                {step.desc}
              </p>
            </div>
          </div>

          {/* Visual */}
          <div className="col-span-5">
            <div className="max-w-sm ml-auto">{step.visual}</div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function MobileTimeline() {
  return (
    <div className="md:hidden py-16">
      <Container>
        <Reveal>
          <div className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary mb-3">
              {"// How it works"}
            </p>
            <h2 className="font-display font-bold text-[28px] leading-[1.08] tracking-[-0.02em] text-dark">
              From zero to live in four steps
            </h2>
          </div>
        </Reveal>

        <div className="space-y-10">
          {steps.map((s) => (
            <Reveal key={s.num}>
              <p className="font-mono text-[11px] text-primary uppercase tracking-[0.18em] mb-2">
                {s.num}
              </p>
              <h3 className="font-display font-semibold text-[20px] leading-snug text-dark mb-2">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary mb-4">
                {s.desc}
              </p>
              {s.visual}
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
