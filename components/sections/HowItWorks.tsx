"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    num: "01",
    title: "Tell us about your business",
    desc: "Fill out a quick form — takes about 5 minutes. Tell us what you do, who your customers are, and what you want your digital presence to look like.",
    visual: (
      <div className="mt-4 rounded-[10px] border border-border bg-surface p-4 space-y-3">
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
      <div className="mt-4 rounded-[10px] border border-border bg-surface p-4">
        <div className="space-y-2">
          {[
            { label: "Website", done: true },
            { label: "Google Business", done: true },
            { label: "Social profiles", done: false },
          ].map(({ label, done }) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${done ? "bg-primary" : "bg-border"}`}>
                {done && <span className="text-white text-[10px]">✓</span>}
              </div>
              <span className="text-sm text-text-secondary">{label}</span>
              {!done && <div className="ml-auto h-2 w-12 bg-border rounded-full animate-pulse" />}
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
      <div className="mt-4 rounded-[10px] border border-border bg-white p-4 space-y-3">
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
      <div className="mt-4 rounded-[10px] border border-border bg-surface p-4">
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
          <span className="font-mono text-[10px] text-primary font-semibold">+42% growth</span>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i);
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section id="how-it-works" className="py-20 md:py-[7.5rem] bg-white" ref={sectionRef}>
      <Container>
        <Reveal>
          <div className="mb-16">
            <p className="font-mono text-[13px] uppercase tracking-widest text-primary mb-4">
              {"// How it works"}
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[40px] leading-[1.08] tracking-[-0.02em] text-dark">
              From zero to live in four steps
            </h2>
          </div>
        </Reveal>

        {/* Desktop: sticky step number + content */}
        <div className="hidden md:grid md:grid-cols-12 gap-8">
          {/* Sticky step indicator */}
          <div className="col-span-3 relative">
            <div className="sticky top-28 space-y-6">
              {steps.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  className={`flex items-center gap-3 w-full text-left transition-all duration-[280ms] group ${
                    i === activeStep ? "opacity-100" : "opacity-30 hover:opacity-60"
                  }`}
                >
                  <span
                    className={`font-mono text-[28px] font-bold transition-colors duration-[280ms] ${
                      i === activeStep ? "text-primary" : "text-text-muted"
                    }`}
                  >
                    {s.num}
                  </span>
                  <span
                    className={`font-display font-semibold text-sm leading-tight transition-colors duration-[280ms] ${
                      i === activeStep ? "text-dark" : "text-text-muted"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Steps content */}
          <div className="col-span-9 space-y-24">
            {steps.map((s, i) => (
              <div
                key={s.num}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="max-w-lg"
              >
                <p className="font-mono text-[13px] text-primary uppercase tracking-widest mb-3">
                  {s.num}
                </p>
                <h3 className="font-display font-semibold text-[24px] leading-[1.18] tracking-[-0.01em] text-dark mb-3">
                  {s.title}
                </h3>
                <p className="text-[16px] md:text-[18px] leading-[1.55] text-text-secondary">
                  {s.desc}
                </p>
                {s.visual}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden space-y-10">
          {steps.map((s) => (
            <Reveal key={s.num}>
              <p className="font-mono text-[13px] text-primary uppercase tracking-widest mb-2">
                {s.num}
              </p>
              <h3 className="font-display font-semibold text-[20px] leading-snug text-dark mb-2">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">{s.desc}</p>
              {s.visual}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
