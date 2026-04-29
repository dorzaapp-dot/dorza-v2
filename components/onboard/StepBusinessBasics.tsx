"use client";

import type { OnboardState, OnboardAction, BusinessType } from "@/lib/types";

const businessTypes: BusinessType[] = [
  "Tradie",
  "Cafe/Restaurant",
  "Salon/Beauty",
  "Fitness/Wellness",
  "Retail",
  "Professional Services",
  "Other",
];

const nichePlaceholders: Record<string, string> = {
  Tradie: "e.g. Electrician, Plumber, Landscaper",
  "Cafe/Restaurant": "e.g. Brunch cafe, Thai restaurant",
  "Salon/Beauty": "e.g. Hair salon, Nail bar, Skin clinic",
  "Fitness/Wellness": "e.g. Pilates studio, Personal training",
  Retail: "e.g. Boutique clothing, Gift shop",
  "Professional Services": "e.g. Accountant, Lawyer, Consultant",
  Other: "Describe your business type",
};

interface Props {
  state: OnboardState;
  dispatch: React.Dispatch<OnboardAction>;
  errors: Record<string, string>;
}

export default function StepBusinessBasics({ state, dispatch, errors }: Props) {
  const update = (field: keyof OnboardState, value: unknown) =>
    dispatch({ type: "UPDATE_FIELD", field, value });

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-2xl text-dark">
        Business basics
      </h2>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Business name *
        </label>
        <input
          type="text"
          value={state.businessName}
          onChange={(e) => update("businessName", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        {errors.businessName && (
          <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Owner name *
        </label>
        <input
          type="text"
          value={state.ownerName}
          onChange={(e) => update("ownerName", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        {errors.ownerName && (
          <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Business type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {businessTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => update("businessType", t)}
              className={`h-11 px-3 rounded-btn text-sm font-medium border transition-colors ${
                state.businessType === t
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-dark border-border hover:border-primary/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {state.businessType === "Other" && (
          <input
            type="text"
            placeholder="Specify your business type"
            value={state.customBusinessType}
            onChange={(e) => update("customBusinessType", e.target.value)}
            className="w-full h-12 px-4 mt-2 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Niche
        </label>
        <input
          type="text"
          placeholder={
            nichePlaceholders[state.businessType || "Other"] || "Describe your niche"
          }
          value={state.niche}
          onChange={(e) => update("niche", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          ABN (optional)
        </label>
        <input
          type="text"
          value={state.abn}
          onChange={(e) => update("abn", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Street address
        </label>
        <input
          type="text"
          value={state.streetAddress}
          onChange={(e) => update("streetAddress", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Suburb
        </label>
        <input
          type="text"
          value={state.suburb}
          onChange={(e) => update("suburb", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Phone *
        </label>
        <input
          type="tel"
          value={state.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Email
        </label>
        <input
          type="email"
          value={state.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Opening hours
        </label>
        <textarea
          rows={3}
          value={state.openingHours}
          onChange={(e) => update("openingHours", e.target.value)}
          placeholder="e.g. Mon-Fri 8am-5pm, Sat 9am-1pm"
          className="w-full px-4 py-3 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
        />
      </div>
    </div>
  );
}
