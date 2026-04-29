"use client";

import { Check } from "lucide-react";
import type { OnboardState, OnboardAction } from "@/lib/types";

interface Props {
  state: OnboardState;
  dispatch: React.Dispatch<OnboardAction>;
  errors: Record<string, string>;
}

const packages = [
  {
    name: "Starter" as const,
    setup: 499,
    monthly: 199,
    tagline: "Website + Google Business",
    features: [
      "Custom website",
      "Google Business setup",
      "Mobile-optimised & SEO-ready",
      "Basic analytics",
    ],
  },
  {
    name: "Growth" as const,
    setup: 799,
    monthly: 349,
    tagline: "Website + Social + Chatbot",
    features: [
      "Everything in Starter",
      "Social media (3 posts/wk)",
      "AI customer service chatbot",
      "Review management",
      "Monthly report",
    ],
    badge: "Most popular",
  },
  {
    name: "Pro" as const,
    setup: 1299,
    monthly: 549,
    tagline: "Full service",
    features: [
      "Everything in Growth",
      "Social media (5 posts/wk)",
      "Paid ad campaigns",
      "Monthly strategy call",
      "Priority support",
    ],
  },
];

const paymentMethods = ["Invoice", "Card", "Direct debit"] as const;

export default function StepPackage({ state, dispatch, errors }: Props) {
  const update = (field: keyof OnboardState, value: unknown) =>
    dispatch({ type: "UPDATE_FIELD", field, value });

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-2xl text-dark">Package</h2>

      <div className="grid sm:grid-cols-3 gap-4">
        {packages.map((pkg) => {
          const selected = state.selectedPackage === pkg.name;
          const discountSetup = Math.round(pkg.setup * 0.5);
          return (
            <button
              key={pkg.name}
              type="button"
              onClick={() => dispatch({ type: "SELECT_PACKAGE", pkg: pkg.name })}
              className={`relative text-left p-5 rounded-card border-2 transition-colors ${
                selected
                  ? "border-primary bg-primary-light/50"
                  : "border-border bg-white hover:border-primary/40"
              }`}
            >
              {pkg.badge && (
                <span className="absolute -top-2.5 right-3 bg-primary text-white text-xs font-semibold px-3 py-0.5 rounded-full">
                  {pkg.badge}
                </span>
              )}
              <span className="block text-lg font-bold text-dark font-display">
                {pkg.name}
              </span>
              <span className="block text-xs text-text-muted mb-3">
                {pkg.tagline}
              </span>
              <div className="mb-3">
                {state.foundingClient ? (
                  <>
                    <span className="line-through text-text-muted text-sm">
                      ${pkg.setup}
                    </span>{" "}
                    <span className="text-xl font-bold text-dark font-body">
                      ${discountSetup}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-dark font-body">
                    ${pkg.setup}
                  </span>
                )}
                <span className="text-text-muted text-xs"> setup + </span>
                <span className="text-base font-bold text-dark font-body">
                  ${pkg.monthly}
                </span>
                <span className="text-text-muted text-xs">/mo</span>
              </div>
              <ul className="space-y-1.5">
                {pkg.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-1.5 text-xs text-text-secondary"
                  >
                    <Check size={14} className="text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
      {errors.selectedPackage && (
        <p className="text-red-500 text-xs">{errors.selectedPackage}</p>
      )}

      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-dark">
          Founding client (50% off setup)
        </span>
        <button
          type="button"
          onClick={() => update("foundingClient", !state.foundingClient)}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            state.foundingClient ? "bg-primary" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              state.foundingClient ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Agreed setup fee
          </label>
          <input
            type="number"
            value={state.agreedSetupFee || ""}
            onChange={(e) => update("agreedSetupFee", Number(e.target.value))}
            className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Agreed monthly fee
          </label>
          <input
            type="number"
            value={state.agreedMonthlyFee || ""}
            onChange={(e) => update("agreedMonthlyFee", Number(e.target.value))}
            className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Payment method
        </label>
        <div className="flex gap-2">
          {paymentMethods.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => update("paymentMethod", m)}
              className={`h-10 px-4 rounded-btn text-sm font-medium border transition-colors ${
                state.paymentMethod === m
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-dark border-border hover:border-primary/40"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Start date
        </label>
        <input
          type="date"
          value={state.startDate}
          onChange={(e) => update("startDate", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>
    </div>
  );
}
