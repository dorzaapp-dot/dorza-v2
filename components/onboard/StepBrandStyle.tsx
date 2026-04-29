"use client";

import type { OnboardState, OnboardAction } from "@/lib/types";

interface Props {
  state: OnboardState;
  dispatch: React.Dispatch<OnboardAction>;
}

const tones = [
  { value: "Casual & friendly", desc: "Relaxed, approachable, like chatting to a mate" },
  { value: "Professional & clean", desc: "Polished, trustworthy, straight to the point" },
  { value: "Bold & energetic", desc: "High energy, confident, stands out" },
  { value: "Warm & welcoming", desc: "Inviting, personal, community-focused" },
];

const logoOptions = ["Yes", "No"] as const;

export default function StepBrandStyle({ state, dispatch }: Props) {
  const update = (field: keyof OnboardState, value: unknown) =>
    dispatch({ type: "UPDATE_FIELD", field, value });

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-2xl text-dark">
        Brand & style
      </h2>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Do you have a logo?
        </label>
        <div className="flex gap-2">
          {logoOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => update("hasLogo", opt)}
              className={`h-10 px-6 rounded-btn text-sm font-medium border transition-colors ${
                state.hasLogo === opt
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-dark border-border hover:border-primary/40"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Brand colours
        </label>
        <input
          type="text"
          placeholder="e.g. Navy blue and white, or #1B2A4A"
          value={state.brandColours}
          onChange={(e) => update("brandColours", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          What tone suits your brand?
        </label>
        <div className="grid sm:grid-cols-2 gap-2">
          {tones.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => update("tone", t.value)}
              className={`text-left p-4 rounded-card border transition-colors ${
                state.tone === t.value
                  ? "bg-primary-light border-primary"
                  : "bg-white border-border hover:border-primary/40"
              }`}
            >
              <span className="block text-sm font-semibold text-dark">
                {t.value}
              </span>
              <span className="block text-xs text-text-muted mt-0.5">
                {t.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Inspiration websites
        </label>
        <textarea
          rows={2}
          placeholder="Any websites you like the look of"
          value={state.inspirationSites}
          onChange={(e) => update("inspirationSites", e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Brand keywords
        </label>
        <input
          type="text"
          placeholder="e.g. Modern, trustworthy, local"
          value={state.brandKeywords}
          onChange={(e) => update("brandKeywords", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>
    </div>
  );
}
