"use client";

import type { OnboardState, OnboardAction } from "@/lib/types";

interface Props {
  state: OnboardState;
  dispatch: React.Dispatch<OnboardAction>;
}

const allSections = [
  "Hero",
  "Services/menu",
  "About us",
  "Photo gallery",
  "Contact form",
  "Google Map",
  "Testimonials",
  "Online booking",
  "Social feed embed",
  "FAQ",
  "Blog future",
  "E-commerce",
];

export default function StepWebsiteSections({ state, dispatch }: Props) {
  const update = (field: keyof OnboardState, value: unknown) =>
    dispatch({ type: "UPDATE_FIELD", field, value });

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-2xl text-dark">
        Website sections
      </h2>
      <p className="text-sm text-text-muted">
        Toggle the sections you want on the website.
      </p>

      <div className="space-y-3">
        {allSections.map((section) => (
          <div key={section}>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-dark">{section}</span>
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "TOGGLE_WEBSITE_SECTION", section })
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  state.websiteSections[section]
                    ? "bg-primary"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    state.websiteSections[section]
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {section === "Online booking" &&
              state.websiteSections["Online booking"] && (
                <input
                  type="text"
                  placeholder="Booking link URL"
                  value={state.bookingLink}
                  onChange={(e) => update("bookingLink", e.target.value)}
                  className="w-full h-10 px-4 mt-1 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              )}

            {section === "E-commerce" &&
              state.websiteSections["E-commerce"] && (
                <input
                  type="text"
                  placeholder="E-commerce platform (e.g. Shopify)"
                  value={state.ecommercePlatform}
                  onChange={(e) => update("ecommercePlatform", e.target.value)}
                  className="w-full h-10 px-4 mt-1 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
