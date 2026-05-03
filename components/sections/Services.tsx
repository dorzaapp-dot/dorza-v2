"use client";

import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { SlideReveal } from "@/components/motion/SlideReveal";

function BrowserMock() {
  return (
    <div className="mt-4 rounded-[10px] border border-border overflow-hidden bg-white">
      <div className="bg-surface border-b border-border px-3 py-2 flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <div className="flex-1 mx-3 h-4 bg-border rounded-full" />
      </div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-primary/20 rounded-full w-2/3" />
        <div className="h-3 bg-border rounded-full w-full" />
        <div className="h-3 bg-border rounded-full w-5/6" />
        <div className="h-3 bg-border rounded-full w-4/5" />
        <div className="flex gap-2 mt-3">
          <div className="h-8 w-24 bg-primary rounded-full" />
          <div className="h-8 w-20 bg-border rounded-full" />
        </div>
      </div>
    </div>
  );
}

function InstagramMocks() {
  const posts = [
    { bg: "from-primary-light to-[#FFE0C8]" },
    { bg: "from-surface to-border" },
    { bg: "from-[#FFF0E5] to-[#FFE5CC]" },
  ];
  return (
    <div className="mt-4 space-y-2">
      {posts.map((p, i) => (
        <div key={i} className="flex items-center gap-2 bg-white border border-border rounded-[10px] p-2 overflow-hidden">
          <div className={`w-10 h-10 rounded-sm bg-gradient-to-br ${p.bg} shrink-0`} />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 bg-border rounded-full w-3/4" />
            <div className="h-2 bg-border rounded-full w-1/2" />
          </div>
          <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-[8px] text-primary font-bold">↑</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function StrategyMock() {
  const lines = [
    "# Competitor Analysis",
    "→ Smith Plumbing: 23 reviews, no site",
    "→ City Trade Co: weak social, 3.8★",
    "→ Gap: no one doing video content",
    "",
    "# Opportunities",
    "→ Google Local ranking #1–3",
    "→ Facebook Marketplace leads",
    "→ Instagram before/after content",
  ];
  return (
    <div className="mt-4 font-mono text-[11px] leading-[1.8] text-white/70 space-y-0">
      {lines.map((line, i) => (
        <div key={i} className={line.startsWith("#") ? "text-primary/90 font-semibold" : ""}>
          {line || <span className="opacity-0">.</span>}
        </div>
      ))}
    </div>
  );
}

function ChatMock() {
  const messages = [
    { from: "owner", text: "Can you reschedule next week's posts to Monday?" },
    { from: "agent", text: "Done. Moved 3 posts to Mon 11am. Want to preview?" },
    { from: "owner", text: "Yes please" },
    { from: "agent", text: "Here's your Mon schedule ✓" },
  ];
  return (
    <div className="mt-4 space-y-2">
      {messages.map((m, i) => (
        <div key={i} className={`flex ${m.from === "owner" ? "justify-end" : "justify-start"}`}>
          <span
            className={`text-[12px] px-3 py-1.5 rounded-full max-w-[85%] leading-snug ${
              m.from === "owner"
                ? "bg-primary text-white rounded-br-sm"
                : "bg-border text-dark rounded-bl-sm"
            }`}
          >
            {m.text}
          </span>
        </div>
      ))}
    </div>
  );
}

const websiteBullets = [
  "Custom-designed, mobile-first",
  "Google Business profile setup",
  "SEO-ready from day one",
  "Live within 24 hours",
];

const socialBullets = [
  "Facebook, Instagram & more",
  "AI-generated content calendar",
  "Automated posting",
  "Performance tracking",
];

const strategyBullets = [
  "Competitor analysis",
  "Market opportunity mapping",
  "Tailored marketing plan",
  "Ongoing trend monitoring",
];

const agentBullets = [
  "On-demand marketing help",
  "Content creation & copywriting",
  "Campaign management",
  "Always learning your business",
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-[7.5rem] bg-warm">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="// What we do"
            title="Everything you need, done for you"
            kicker="One agency. Website, social, search, and AI — all running while you get on with your work."
          />
        </Reveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-auto">

          {/* Website — col-span-4 row-span-2 */}
          <SlideReveal
            from="left"
            className="md:col-span-4 md:row-span-2 rounded-card border border-border p-6 bg-surface hover:shadow-medium hover:-translate-y-1 hover:border-[#E5DFD6] transition-all duration-500 ease-dorza"
            delay={0.05}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center h-7 px-3 bg-primary text-white font-mono text-[11px] uppercase tracking-widest rounded-full">
                  Most popular
                </span>
                <h3 className="font-display font-semibold text-[22px] md:text-[24px] leading-[1.18] tracking-[-0.01em] text-dark mt-3">
                  Custom websites, live in 24 hours
                </h3>
              </div>
            </div>
            <BrowserMock />
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
              {websiteBullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-text-secondary">
                  <Check size={14} className="text-primary mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </SlideReveal>

          {/* Social — col-span-2 row-span-2 */}
          <SlideReveal
            from="right"
            className="md:col-span-2 md:row-span-2 rounded-card border border-primary/20 p-6 bg-primary-light hover:shadow-medium hover:-translate-y-1 transition-all duration-500 ease-dorza"
            delay={0.12}
          >
            <h3 className="font-display font-semibold text-[22px] md:text-[24px] leading-[1.18] tracking-[-0.01em] text-dark">
              Social media on autopilot
            </h3>
            <InstagramMocks />
            <ul className="mt-5 space-y-2">
              {socialBullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-text-secondary">
                  <Check size={14} className="text-primary mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </SlideReveal>

          {/* Research — col-span-3 row-span-2, dark */}
          <SlideReveal
            from="left"
            className="md:col-span-3 md:row-span-2 rounded-card border border-white/10 p-6 bg-dark hover:shadow-medium hover:-translate-y-1 transition-all duration-500 ease-dorza"
            delay={0.18}
          >
            <h3 className="font-display font-semibold text-[22px] md:text-[24px] leading-[1.18] tracking-[-0.01em] text-white">
              Research & strategy
            </h3>
            <StrategyMock />
            <ul className="mt-5 space-y-2">
              {strategyBullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-white/60">
                  <Check size={14} className="text-primary mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </SlideReveal>

          {/* AI Agents — col-span-3 row-span-2 */}
          <SlideReveal
            from="right"
            className="md:col-span-3 md:row-span-2 rounded-card border border-border p-6 bg-surface hover:shadow-medium hover:-translate-y-1 hover:border-[#E5DFD6] transition-all duration-500 ease-dorza"
            delay={0.24}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-display font-semibold text-[22px] md:text-[24px] leading-[1.18] tracking-[-0.01em] text-dark">
                AI agents at your disposal
              </h3>
              <span className="inline-flex items-center h-7 px-3 bg-primary-light text-primary font-mono text-[11px] uppercase tracking-widest rounded-full border border-primary/20 shrink-0 ml-3">
                New
              </span>
            </div>
            <ChatMock />
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
              {agentBullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-text-secondary">
                  <Check size={14} className="text-primary mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </SlideReveal>
        </div>
      </Container>
    </section>
  );
}
