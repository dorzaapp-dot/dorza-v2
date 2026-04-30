"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { submitForm } from "@/lib/api";
import type { BusinessType } from "@/lib/types";

const businessTypes: (BusinessType | "Other")[] = [
  "Tradie",
  "Cafe/Restaurant",
  "Salon/Beauty",
  "Fitness/Wellness",
  "Retail",
  "Professional Services",
  "Other",
];

const inputCls =
  "w-full h-12 px-4 rounded-full text-sm text-white placeholder-white/40 bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-[160ms]";

export default function WaitlistCTA() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessType: "" as BusinessType | "",
    suburb: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await submitForm("/api/waitlist", form);
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <section id="waitlist" className="py-20 md:py-[10rem] bg-dark">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
            <p className="font-mono text-[13px] uppercase tracking-widest text-primary mb-6">
              {"// Founding client offer"}
            </p>
            <h2 className="font-display font-bold text-[32px] md:text-[56px] leading-[1.02] tracking-[-0.025em] text-white mb-4">
              Get in before we launch
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[1.55] text-white/60">
              We&apos;re onboarding our first 20 founding clients in Sydney.
              Join the waitlist and lock in 50% off your setup fee.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            {submitted ? (
              <div className="rounded-card border border-white/10 bg-white/5 p-10 text-center">
                <p className="font-mono text-[12px] uppercase tracking-widest text-primary mb-3">
                  You&apos;re in
                </p>
                <h3 className="font-display font-semibold text-[24px] text-white mb-2">
                  You&apos;re on the list.
                </h3>
                <p className="text-white/60 text-sm">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="text-left space-y-3">
                <div>
                  <label className="block text-[13px] font-medium text-white/70 mb-1.5 ml-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-white/70 mb-1.5 ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@business.com.au"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div className="relative">
                  <label className="block text-[13px] font-medium text-white/70 mb-1.5 ml-1">
                    Business type
                  </label>
                  <select
                    required
                    value={form.businessType}
                    onChange={(e) =>
                      setForm({ ...form, businessType: e.target.value as BusinessType })
                    }
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" className="bg-dark text-white">
                      Select your business type
                    </option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t} className="bg-dark text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 bottom-3.5 text-white/40 pointer-events-none"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-white/70 mb-1.5 ml-1">
                    Suburb
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Surry Hills"
                    value={form.suburb}
                    onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-full transition-all duration-[160ms] active:scale-[0.98] disabled:opacity-60 mt-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                >
                  {loading ? "Submitting…" : "Join the waitlist →"}
                </button>
                <p className="text-center font-mono text-[11px] text-white/30 uppercase tracking-wider mt-2">
                  No spam. No lock-in. Cancel any time.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
