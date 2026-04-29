"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { submitForm } from "@/lib/api";
import type { BusinessType } from "@/lib/types";

export default function WaitlistPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "" as BusinessType | "",
    suburb: "",
    frustration: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const businessTypes: (BusinessType | "Other")[] = [
    "Tradie",
    "Cafe/Restaurant",
    "Salon/Beauty",
    "Fitness/Wellness",
    "Retail",
    "Professional Services",
    "Other",
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await submitForm("/api/waitlist", form);
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-5 py-14">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <a
            href="/"
            className="inline-block font-display font-bold text-3xl text-dark mb-6"
          >
            d<span className="text-primary">o</span>rza
          </a>
          <h1 className="font-display font-bold text-3xl text-dark mb-3">
            Get early access
          </h1>
          <p className="text-text-secondary leading-relaxed">
            We&apos;re launching soon in Sydney. Be one of our first 20
            founding clients and get 50% off setup.
          </p>
        </div>

        {submitted ? (
          <div className="bg-primary-light rounded-card p-8 text-center">
            <h2 className="font-display font-semibold text-xl text-dark mb-2">
              You&apos;re on the list!
            </h2>
            <p className="text-text-secondary mb-4">
              We&apos;ll be in touch soon.
            </p>
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              &larr; Back to homepage
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                Phone
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                Business type
              </label>
              <div className="relative">
                <select
                  required
                  value={form.businessType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      businessType: e.target.value as BusinessType,
                    })
                  }
                  className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
                >
                  <option value="">Select your business type</option>
                  {businessTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                Suburb
              </label>
              <input
                type="text"
                required
                value={form.suburb}
                onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                What&apos;s your biggest frustration with your current online
                presence? (optional)
              </label>
              <textarea
                rows={3}
                value={form.frustration}
                onChange={(e) =>
                  setForm({ ...form, frustration: e.target.value })
                }
                className="w-full px-4 py-3 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-semibold rounded-btn transition-colors disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Join the waitlist →"}
            </button>
          </form>
        )}

        <p className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-text-muted hover:text-primary transition-colors"
          >
            &larr; Back to homepage
          </a>
        </p>
      </div>
    </div>
  );
}
