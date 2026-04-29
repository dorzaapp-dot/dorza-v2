"use client";

import type { OnboardState, OnboardAction } from "@/lib/types";

interface Props {
  state: OnboardState;
  dispatch: React.Dispatch<OnboardAction>;
}

const googleOptions = ["Yes", "No", "Not sure"] as const;

export default function StepDigitalPresence({ state, dispatch }: Props) {
  const update = (field: keyof OnboardState, value: unknown) =>
    dispatch({ type: "UPDATE_FIELD", field, value });

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-2xl text-dark">
        Digital presence
      </h2>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Existing website URL
        </label>
        <input
          type="url"
          placeholder="https://"
          value={state.existingWebsite}
          onChange={(e) => update("existingWebsite", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Google Business profile?
        </label>
        <div className="flex gap-2">
          {googleOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => update("googleBusiness", opt)}
              className={`h-10 px-4 rounded-btn text-sm font-medium border transition-colors ${
                state.googleBusiness === opt
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
          Instagram handle
        </label>
        <input
          type="text"
          placeholder="@"
          value={state.instagramHandle}
          onChange={(e) => update("instagramHandle", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Facebook page
        </label>
        <input
          type="text"
          value={state.facebookPage}
          onChange={(e) => update("facebookPage", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Other platforms
        </label>
        <input
          type="text"
          placeholder="e.g. TikTok, YouTube, LinkedIn"
          value={state.otherPlatforms}
          onChange={(e) => update("otherPlatforms", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Biggest frustration with your current online presence
        </label>
        <textarea
          rows={3}
          value={state.biggestFrustration}
          onChange={(e) => update("biggestFrustration", e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
        />
      </div>
    </div>
  );
}
