"use client";

import type { OnboardState, OnboardAction } from "@/lib/types";

interface Props {
  state: OnboardState;
  dispatch: React.Dispatch<OnboardAction>;
}

const logoOptions = ["Received", "Client will send", "No logo"] as const;
const photoOptions = ["Received", "Client will send", "Use stock", "Pull from Instagram"] as const;
const menuOptions = ["Received", "Client will send", "N/A"] as const;
const testimonialOptions = ["Have specific ones", "Pull from Google", "None yet"] as const;

function SelectGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-dark mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`h-10 px-4 rounded-btn text-sm font-medium border transition-colors ${
              value === opt
                ? "bg-primary text-white border-primary"
                : "bg-white text-dark border-border hover:border-primary/40"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function StepPhotosAssets({ state, dispatch }: Props) {
  const update = (field: keyof OnboardState, value: unknown) =>
    dispatch({ type: "UPDATE_FIELD", field, value });

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-2xl text-dark">
        Photos & assets
      </h2>

      <SelectGroup
        label="Logo status"
        options={logoOptions}
        value={state.logoStatus}
        onChange={(v) => update("logoStatus", v)}
      />

      <SelectGroup
        label="Photos status"
        options={photoOptions}
        value={state.photosStatus}
        onChange={(v) => update("photosStatus", v)}
      />

      <SelectGroup
        label="Menu / service doc"
        options={menuOptions}
        value={state.menuDocStatus}
        onChange={(v) => update("menuDocStatus", v)}
      />

      <SelectGroup
        label="Testimonials"
        options={testimonialOptions}
        value={state.testimonialsStatus}
        onChange={(v) => update("testimonialsStatus", v)}
      />

      {state.testimonialsStatus === "Have specific ones" && (
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Testimonials
          </label>
          <textarea
            rows={3}
            value={state.specificTestimonials}
            onChange={(e) => update("specificTestimonials", e.target.value)}
            placeholder="Paste testimonials here"
            className="w-full px-4 py-3 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Photo notes
        </label>
        <textarea
          rows={3}
          value={state.photoNotes}
          onChange={(e) => update("photoNotes", e.target.value)}
          placeholder="Any notes about photos or assets"
          className="w-full px-4 py-3 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
        />
      </div>
    </div>
  );
}
