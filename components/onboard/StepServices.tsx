"use client";

import { Plus, Trash2 } from "lucide-react";
import type { OnboardState, OnboardAction } from "@/lib/types";

interface Props {
  state: OnboardState;
  dispatch: React.Dispatch<OnboardAction>;
  errors: Record<string, string>;
}

export default function StepServices({ state, dispatch, errors }: Props) {
  const update = (field: keyof OnboardState, value: unknown) =>
    dispatch({ type: "UPDATE_FIELD", field, value });

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-2xl text-dark">Services</h2>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          What services do you offer? *
        </label>
        <div className="space-y-2">
          {state.services.map((svc, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={svc}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_SERVICE",
                    index: i,
                    value: e.target.value,
                  })
                }
                placeholder={`Service ${i + 1}`}
                className="flex-1 h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              {state.services.length > 1 && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: "REMOVE_SERVICE", index: i })}
                  className="h-12 w-12 flex items-center justify-center border border-border rounded-btn text-text-muted hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.services && (
          <p className="text-red-500 text-xs mt-1">{errors.services}</p>
        )}
        {state.services.length < 10 && (
          <button
            type="button"
            onClick={() => dispatch({ type: "ADD_SERVICE" })}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            <Plus size={16} /> Add service
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          What makes you different from competitors?
        </label>
        <textarea
          rows={3}
          value={state.differentiator}
          onChange={(e) => update("differentiator", e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Price range (optional)
        </label>
        <input
          type="text"
          placeholder="e.g. $50-$150 per service"
          value={state.priceRange}
          onChange={(e) => update("priceRange", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>
    </div>
  );
}
