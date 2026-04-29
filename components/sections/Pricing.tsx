"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

const plans = [
  {
    name: "Starter",
    setup: 499,
    monthly: 199,
    tagline: "Website + Google Business",
    features: [
      "Custom website",
      "Google Business setup",
      "Mobile-optimised & SEO-ready",
      "Basic analytics dashboard",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    setup: 799,
    monthly: 349,
    tagline: "Website + Social + Chatbot",
    features: [
      "Everything in Starter",
      "Social media (3 posts/week)",
      "AI customer service chatbot",
      "Review management",
      "Monthly performance report",
    ],
    highlighted: true,
  },
  {
    name: "Pro",
    setup: 1299,
    monthly: 549,
    tagline: "Full service, everything on",
    features: [
      "Everything in Growth",
      "Social media (5 posts/week)",
      "Paid ad campaigns",
      "Monthly strategy call",
      "Priority support",
    ],
    highlighted: false,
  },
];

function PricingCard({ plan }: { plan: typeof plans[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pulsed, setPulsed] = useState(false);

  useEffect(() => {
    if (!plan.highlighted) return;
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pulsed) {
          setTimeout(() => setPulsed(true), 300);
          obs.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [plan.highlighted, pulsed]);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-card flex flex-col ${
        plan.highlighted
          ? `bg-white border-2 border-primary ${pulsed ? "animate-pulse-ring" : ""}`
          : "bg-white border border-border hover:shadow-medium hover:-translate-y-1"
      } transition-all duration-200 p-6`}
    >
      {plan.highlighted && (
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-5">
          {"// Most popular"}
        </p>
      )}

      <h3 className="font-display font-bold text-[22px] leading-tight text-dark">
        {plan.name}
      </h3>
      <p className="text-text-muted text-[13px] mt-1 font-mono">{plan.tagline}</p>

      <div className="mt-5 flex items-baseline gap-1 flex-wrap">
        <span className="font-display font-bold text-[48px] md:text-[56px] leading-none text-dark tracking-[-0.02em]">
          ${plan.monthly}
        </span>
        <span className="text-text-muted text-sm">/mo</span>
        <span className="text-text-muted text-sm ml-1">+ ${plan.setup} setup</span>
      </div>

      <ul className="mt-6 space-y-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
            <Check size={15} className="text-primary mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#waitlist"
        className={`mt-6 inline-flex items-center justify-center h-12 w-full font-semibold text-sm rounded-full transition-all duration-[160ms] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          plan.highlighted
            ? "bg-primary hover:bg-primary-dark text-white"
            : "bg-white border border-border text-dark hover:bg-surface hover:border-[#E5DFD6]"
        }`}
      >
        Get started
      </a>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-[7.5rem] bg-white">
      <Container>
        <Reveal>
          <div className="text-center mb-14">
            <p className="font-mono text-[13px] uppercase tracking-widest text-primary mb-4">
              {"// Pricing"}
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[40px] leading-[1.08] tracking-[-0.02em] text-dark">
              Simple, transparent pricing
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.07}>
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="text-center font-mono text-[12px] text-text-muted uppercase tracking-wider mt-10">
            {"// Founding client offer · 50% off setup for the first 20 Sydney clients"}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
