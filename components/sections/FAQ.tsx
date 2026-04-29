"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

const faqs = [
  {
    q: "How much does it cost?",
    a: "Our Starter plan is $199/month plus a one-time $499 setup fee. Growth is $349/month + $799 setup. Pro is $549/month + $1,299 setup. Right now, founding clients get 50% off setup — so Starter setup is just $249. No lock-in contracts.",
  },
  {
    q: "I've been burned by agencies before — why is this different?",
    a: "We get it. Most agencies overpromise, underdeliver, and disappear for weeks. With Dorza, you see a working website within 24 hours of signing up — not a proposal, not a mood board. If you're not happy, you don't pay for the next month. Simple.",
  },
  {
    q: "I don't have time for this.",
    a: "Good — you don't need to make time. We handle everything. You fill out a 5-minute form, review what we build, and say go. After that, we run it. You'll hear from us once a month with a performance report.",
  },
  {
    q: "How fast is 'live in 24 hours' really?",
    a: "We mean it. After you submit your intake form, your website is live within 24 hours. Google Business setup takes another 24-48 hours (Google has its own timeline). Social media profiles are live same day.",
  },
  {
    q: "What if I want to cancel?",
    a: "Cancel any time, no questions asked. We don't do lock-in contracts. If you cancel, your website stays live for the rest of the month you've paid for. We'll hand over everything we've built — you own it.",
  },
  {
    q: "Can I just get one piece — say, only social media?",
    a: "Yes. Our Starter plan is website + Google Business only. If you only want social media management, talk to us — we can put together a custom package. We're flexible.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;

  return (
    <div className="border-b border-border last:border-0">
      <button
        id={`${id}-btn`}
        aria-expanded={open}
        aria-controls={`${id}-content`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
      >
        <span className="font-display font-semibold text-[17px] leading-snug text-dark group-hover:text-primary transition-colors duration-[160ms]">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`text-text-muted shrink-0 transition-transform duration-[200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={`${id}-content`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={`faq-content ${open ? "open" : ""}`}
      >
        <div>
          <p className="pb-5 text-[15px] leading-[1.6] text-text-secondary">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-20 md:py-[7.5rem] bg-warm">
      <Container>
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="font-mono text-[13px] uppercase tracking-widest text-primary mb-4">
                {"// Questions"}
              </p>
              <h2 className="font-display font-bold text-[28px] md:text-[40px] leading-[1.08] tracking-[-0.02em] text-dark">
                Answers to the real questions
              </h2>
            </div>
          </Reveal>

          <div>
            {faqs.map((item, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <FAQItem q={item.q} a={item.a} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
