"use client";

import { useReducer, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { OnboardState, OnboardAction } from "@/lib/types";
import StepBusinessBasics from "@/components/onboard/StepBusinessBasics";
import StepDigitalPresence from "@/components/onboard/StepDigitalPresence";
import StepServices from "@/components/onboard/StepServices";
import StepTargetCustomers from "@/components/onboard/StepTargetCustomers";
import StepBrandStyle from "@/components/onboard/StepBrandStyle";
import StepPhotosAssets from "@/components/onboard/StepPhotosAssets";
import StepWebsiteSections from "@/components/onboard/StepWebsiteSections";
import StepSocialMedia from "@/components/onboard/StepSocialMedia";
import StepPackage from "@/components/onboard/StepPackage";
import StepReview from "@/components/onboard/StepReview";

const TOTAL_STEPS = 10;

function getDefaultSections(businessType: string): Record<string, boolean> {
  const base: Record<string, boolean> = {
    Hero: true,
    "Services/menu": true,
    "About us": true,
    "Photo gallery": false,
    "Contact form": true,
    "Google Map": true,
    Testimonials: true,
    "Online booking": false,
    "Social feed embed": false,
    FAQ: false,
    "Blog future": false,
    "E-commerce": false,
  };

  if (businessType === "Cafe/Restaurant") {
    base["Photo gallery"] = true;
  } else if (businessType === "Salon/Beauty") {
    base["Photo gallery"] = true;
    base["Online booking"] = true;
  } else if (businessType === "Fitness/Wellness") {
    base["Online booking"] = true;
  } else if (businessType === "Retail") {
    base["E-commerce"] = true;
    base["Photo gallery"] = true;
  }

  return base;
}

const initialState: OnboardState = {
  businessName: "",
  ownerName: "",
  businessType: "",
  customBusinessType: "",
  niche: "",
  abn: "",
  streetAddress: "",
  suburb: "",
  phone: "",
  email: "",
  openingHours: "",
  existingWebsite: "",
  googleBusiness: "",
  instagramHandle: "",
  facebookPage: "",
  otherPlatforms: "",
  biggestFrustration: "",
  services: ["", "", "", ""],
  differentiator: "",
  priceRange: "",
  typicalCustomer: "",
  serviceArea: "",
  discoveryChannels: [],
  hasLogo: "",
  brandColours: "",
  tone: "",
  inspirationSites: "",
  brandKeywords: "",
  logoStatus: "",
  photosStatus: "",
  menuDocStatus: "",
  testimonialsStatus: "",
  specificTestimonials: "",
  photoNotes: "",
  websiteSections: getDefaultSections(""),
  bookingLink: "",
  ecommercePlatform: "",
  socialPlatforms: [],
  postingFrequency: "",
  contentTypes: [],
  approvalProcess: "",
  avoidTopics: "",
  selectedPackage: "",
  foundingClient: false,
  agreedSetupFee: 0,
  agreedMonthlyFee: 0,
  paymentMethod: "",
  startDate: new Date().toISOString().split("T")[0],
  notes: "",
  completedBy: "",
};

function toggleInArray(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

function reducer(state: OnboardState, action: OnboardAction): OnboardState {
  switch (action.type) {
    case "UPDATE_FIELD": {
      const next = { ...state, [action.field]: action.value };
      // Update website section defaults when business type changes
      if (action.field === "businessType") {
        next.websiteSections = getDefaultSections(action.value as string);
      }
      // Pre-fill fees when package is selected
      if (action.field === "foundingClient" || action.field === "selectedPackage") {
        // handled in SELECT_PACKAGE
      }
      return next;
    }
    case "ADD_SERVICE":
      if (state.services.length >= 10) return state;
      return { ...state, services: [...state.services, ""] };
    case "REMOVE_SERVICE":
      return {
        ...state,
        services: state.services.filter((_, i) => i !== action.index),
      };
    case "UPDATE_SERVICE":
      return {
        ...state,
        services: state.services.map((s, i) =>
          i === action.index ? action.value : s
        ),
      };
    case "TOGGLE_DISCOVERY_CHANNEL":
      return {
        ...state,
        discoveryChannels: toggleInArray(
          state.discoveryChannels,
          action.channel
        ),
      };
    case "TOGGLE_SOCIAL_PLATFORM":
      return {
        ...state,
        socialPlatforms: toggleInArray(
          state.socialPlatforms,
          action.platform
        ),
      };
    case "TOGGLE_CONTENT_TYPE":
      return {
        ...state,
        contentTypes: toggleInArray(state.contentTypes, action.contentType),
      };
    case "TOGGLE_WEBSITE_SECTION":
      return {
        ...state,
        websiteSections: {
          ...state.websiteSections,
          [action.section]: !state.websiteSections[action.section],
        },
      };
    case "SELECT_PACKAGE": {
      const fees: Record<string, { setup: number; monthly: number }> = {
        Starter: { setup: 499, monthly: 199 },
        Growth: { setup: 799, monthly: 349 },
        Pro: { setup: 1299, monthly: 549 },
      };
      const f = fees[action.pkg];
      const setupFee = state.foundingClient
        ? Math.round(f.setup * 0.5)
        : f.setup;
      return {
        ...state,
        selectedPackage: action.pkg,
        agreedSetupFee: setupFee,
        agreedMonthlyFee: f.monthly,
      };
    }
    default:
      return state;
  }
}

const stepLabels = [
  "Business basics",
  "Digital presence",
  "Services",
  "Target customers",
  "Brand & style",
  "Photos & assets",
  "Website sections",
  "Social media",
  "Package",
  "Review & export",
];

export default function OnboardPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(
    (currentStep: number): boolean => {
      const errs: Record<string, string> = {};

      if (currentStep === 0) {
        if (!state.businessName.trim())
          errs.businessName = "Business name is required";
        if (!state.ownerName.trim())
          errs.ownerName = "Owner name is required";
        if (!state.phone.trim()) errs.phone = "Phone is required";
      }

      if (currentStep === 2) {
        if (!state.services.some((s) => s.trim()))
          errs.services = "At least one service is required";
      }

      if (currentStep === 8) {
        if (!state.selectedPackage)
          errs.selectedPackage = "Please select a package";
      }

      setErrors(errs);
      return Object.keys(errs).length === 0;
    },
    [state]
  );

  function goNext() {
    if (!validate(step)) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border px-5 h-14 flex items-center justify-between">
        <a href="/" className="font-display font-bold text-xl text-dark">
          d<span className="text-primary">o</span>rza
        </a>
        <span className="text-xs text-text-muted">
          {stepLabels[step]} ({step + 1}/{TOTAL_STEPS})
        </span>
      </header>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 py-4 bg-white border-b border-border">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (i < step) setStep(i);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === step
                ? "bg-primary"
                : i < step
                ? "bg-primary/40 cursor-pointer"
                : "bg-gray-200"
            }`}
            aria-label={`Step ${i + 1}: ${stepLabels[i]}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-5 py-8">
          {step === 0 && (
            <StepBusinessBasics
              state={state}
              dispatch={dispatch}
              errors={errors}
            />
          )}
          {step === 1 && (
            <StepDigitalPresence state={state} dispatch={dispatch} />
          )}
          {step === 2 && (
            <StepServices
              state={state}
              dispatch={dispatch}
              errors={errors}
            />
          )}
          {step === 3 && (
            <StepTargetCustomers state={state} dispatch={dispatch} />
          )}
          {step === 4 && (
            <StepBrandStyle state={state} dispatch={dispatch} />
          )}
          {step === 5 && (
            <StepPhotosAssets state={state} dispatch={dispatch} />
          )}
          {step === 6 && (
            <StepWebsiteSections state={state} dispatch={dispatch} />
          )}
          {step === 7 && (
            <StepSocialMedia state={state} dispatch={dispatch} />
          )}
          {step === 8 && (
            <StepPackage
              state={state}
              dispatch={dispatch}
              errors={errors}
            />
          )}
          {step === 9 && (
            <StepReview state={state} dispatch={dispatch} />
          )}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="bg-white border-t border-border px-5 py-3 flex justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="inline-flex items-center gap-1 h-12 px-5 border border-border text-dark font-semibold rounded-btn hover:bg-surface transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} /> Back
        </button>
        {step < TOTAL_STEPS - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-1 h-12 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-btn transition-colors"
          >
            Next <ChevronRight size={18} />
          </button>
        ) : (
          <span className="text-sm text-text-muted self-center">
            Use the buttons above to export
          </span>
        )}
      </div>
    </div>
  );
}
