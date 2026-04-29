"use client";

import type { OnboardState, OnboardAction } from "@/lib/types";

interface Props {
  state: OnboardState;
  dispatch: React.Dispatch<OnboardAction>;
}

const platforms = ["Instagram", "Facebook", "TikTok", "LinkedIn"];
const frequencies = ["3x/week standard", "5x/week pro"] as const;
const contentTypes = [
  "Promos",
  "Tips & education",
  "Behind the scenes",
  "Seasonal",
  "Customer reviews",
  "Local area",
];
const approvalOptions = [
  { value: "Auto-post", desc: "We post without approval" },
  { value: "WhatsApp approval", desc: "We send drafts via WhatsApp" },
  { value: "Dashboard review", desc: "You review in a dashboard" },
];

export default function StepSocialMedia({ state, dispatch }: Props) {
  const update = (field: keyof OnboardState, value: unknown) =>
    dispatch({ type: "UPDATE_FIELD", field, value });

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-2xl text-dark">
        Social media
      </h2>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Platforms
        </label>
        <div className="flex flex-wrap gap-2">
          {platforms.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() =>
                dispatch({ type: "TOGGLE_SOCIAL_PLATFORM", platform: p })
              }
              className={`h-9 px-4 rounded-full text-sm font-medium border transition-colors ${
                state.socialPlatforms.includes(p)
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-dark border-border hover:border-primary/40"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Posting frequency
        </label>
        <div className="flex gap-2">
          {frequencies.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => update("postingFrequency", f)}
              className={`h-10 px-4 rounded-btn text-sm font-medium border transition-colors ${
                state.postingFrequency === f
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-dark border-border hover:border-primary/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Content types
        </label>
        <div className="flex flex-wrap gap-2">
          {contentTypes.map((ct) => (
            <button
              key={ct}
              type="button"
              onClick={() =>
                dispatch({ type: "TOGGLE_CONTENT_TYPE", contentType: ct })
              }
              className={`h-9 px-4 rounded-full text-sm font-medium border transition-colors ${
                state.contentTypes.includes(ct)
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-dark border-border hover:border-primary/40"
              }`}
            >
              {ct}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Approval process
        </label>
        <div className="grid sm:grid-cols-3 gap-2">
          {approvalOptions.map((a) => (
            <button
              key={a.value}
              type="button"
              onClick={() => update("approvalProcess", a.value)}
              className={`text-left p-4 rounded-card border transition-colors ${
                state.approvalProcess === a.value
                  ? "bg-primary-light border-primary"
                  : "bg-white border-border hover:border-primary/40"
              }`}
            >
              <span className="block text-sm font-semibold text-dark">
                {a.value}
              </span>
              <span className="block text-xs text-text-muted mt-0.5">
                {a.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Topics to avoid
        </label>
        <input
          type="text"
          placeholder="Any topics or themes to stay away from"
          value={state.avoidTopics}
          onChange={(e) => update("avoidTopics", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>
    </div>
  );
}
