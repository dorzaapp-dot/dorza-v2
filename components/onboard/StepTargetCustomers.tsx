"use client";

import type { OnboardState, OnboardAction } from "@/lib/types";

interface Props {
  state: OnboardState;
  dispatch: React.Dispatch<OnboardAction>;
}

const channels = [
  "Word of mouth",
  "Google Search",
  "Instagram",
  "Facebook",
  "Walk-ins",
  "Referrals",
  "Other",
];

export default function StepTargetCustomers({ state, dispatch }: Props) {
  const update = (field: keyof OnboardState, value: unknown) =>
    dispatch({ type: "UPDATE_FIELD", field, value });

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-2xl text-dark">
        Target customers
      </h2>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Describe your typical customer
        </label>
        <input
          type="text"
          placeholder="e.g. Homeowners in the Inner West aged 30-50"
          value={state.typicalCustomer}
          onChange={(e) => update("typicalCustomer", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Service area
        </label>
        <input
          type="text"
          placeholder="e.g. Sydney CBD + 20km radius"
          value={state.serviceArea}
          onChange={(e) => update("serviceArea", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          How do customers currently find you?
        </label>
        <div className="flex flex-wrap gap-2">
          {channels.map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() =>
                dispatch({ type: "TOGGLE_DISCOVERY_CHANNEL", channel: ch })
              }
              className={`h-9 px-4 rounded-full text-sm font-medium border transition-colors ${
                state.discoveryChannels.includes(ch)
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-dark border-border hover:border-primary/40"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
