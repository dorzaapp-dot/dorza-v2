"use client";

import { useState } from "react";

/* ─── Brand tokens ─── */
const C = {
  orange: "#E8742A",
  orangeDark: "#C45D1E",
  orangeLight: "#FFF0E5",
  navy: "#1A1A2E",
  grey: "#555555",
  greyMuted: "#888888",
  border: "#F0EBE4",
  white: "#FFFFFF",
  surface: "#F9F7F5",
};

const fontBody = "'DM Sans', system-ui, sans-serif";
const fontDisplay = "'Fraunces', Georgia, serif";

/* ─── Data ─── */
const BUSINESS_TYPES = [
  { id: "tradie", label: "Tradie", emoji: "🔧", example: "Plumber, Electrician, Builder" },
  { id: "cafe", label: "Cafe / Restaurant", emoji: "☕", example: "Cafe, Bakery, Bar" },
  { id: "salon", label: "Salon / Beauty", emoji: "✂️", example: "Hair, Nails, Skin" },
  { id: "fitness", label: "Fitness / Wellness", emoji: "💪", example: "Gym, Yoga, Physio" },
  { id: "retail", label: "Retail / Shop", emoji: "🛍️", example: "Boutique, Florist, Gift" },
  { id: "professional", label: "Professional Services", emoji: "📋", example: "Accounting, Legal, Consulting" },
];

const TIMELINE = [
  { badge: "Day 1", color: C.orange, title: "Your website goes live", desc: "A beautiful, mobile-friendly site — SEO optimised and ready to rank on Google from day one." },
  { badge: "Week 1", color: "#F59E0B", title: "Google & social set up", desc: "Your Google Business profile goes live, plus your first social media posts are scheduled and published." },
  { badge: "Month 1", color: "#10B981", title: "First reviews come in", desc: "Dorza manages your online reviews — requesting, responding, and building your reputation automatically." },
  { badge: "Month 2", color: "#6366F1", title: "AI chatbot goes live", desc: "Your website gets an AI assistant that answers customer enquiries, takes bookings, and sends quotes 24/7." },
  { badge: "Ongoing", color: "#8B5CF6", title: "Growth & reporting", desc: "Monthly performance reports and tailored strategy recommendations to keep your business growing." },
];

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    monthly: 199,
    setup: 499,
    color: "#6B7280",
    features: [
      "Custom website live in 24hrs",
      "Google Business setup",
      "Mobile-optimised & SEO-ready",
      "Basic analytics dashboard",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 349,
    setup: 799,
    color: C.orange,
    badge: "Most popular",
    features: [
      "Everything in Starter",
      "Social media (3 posts/week)",
      "AI customer service chatbot",
      "Review management",
      "Monthly performance report",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 549,
    setup: 1299,
    color: C.navy,
    features: [
      "Everything in Growth",
      "Social media (5 posts/week)",
      "Paid ad campaigns",
      "Monthly strategy call",
      "Priority support",
    ],
  },
];

const NEXT_STEPS = [
  "We'll call to confirm your details",
  "Send you a quick onboarding form",
  "Build your website (24 hours)",
  "Set up social media & Google profile",
  "You're live and growing!",
];

const TOTAL_STEPS = 5;

/* ═══════════════════════════════════════════════════════════════════════ */
export default function DorzaOnboarding() {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState("growth");
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedPlanData = PLANS.find((p) => p.id === selectedPlan)!;
  const selectedTypeLabel =
    BUSINESS_TYPES.find((t) => t.id === selectedType)?.label ?? "";

  /* ── Navigation logic ── */
  function canProceed(): boolean {
    if (step === 1 && !selectedType) return false;
    if (step === 4 && (!formData.name || !formData.business || !formData.phone))
      return false;
    return true;
  }

  function handleForward() {
    if (!canProceed()) return;
    if (step === 4) {
      setSubmitted(true);
      return;
    }
    setStep((s) => Math.min(s + 1, 4));
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const forwardLabel = step <= 2 ? "Continue →" : step === 3 ? "Get started →" : "Submit →";

  /* ── Shared inline styles ── */
  const heading: React.CSSProperties = {
    fontFamily: fontDisplay,
    fontWeight: 700,
    fontSize: 30,
    color: C.navy,
    lineHeight: 1.25,
    margin: "0 0 12px",
  };

  const subtext: React.CSSProperties = {
    fontSize: 16,
    lineHeight: 1.6,
    color: C.grey,
    margin: "0 0 28px",
  };

  const card: React.CSSProperties = {
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: 16,
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    height: 48,
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    padding: "0 14px",
    fontSize: 15,
    fontFamily: fontBody,
    color: C.navy,
    background: C.white,
    boxSizing: "border-box",
    outline: "none",
  };

  /* ════════════════════════════════════════════════════════════════════ */
  /*  Steps                                                              */
  /* ════════════════════════════════════════════════════════════════════ */

  /* ── Step 0 — Welcome ── */
  function StepWelcome() {
    return (
      <div style={{ textAlign: "center" }}>
        {/* Badge */}
        <span
          style={{
            display: "inline-block",
            background: C.orangeLight,
            color: C.orange,
            fontSize: 13,
            fontWeight: 600,
            padding: "6px 18px",
            borderRadius: 999,
            marginBottom: 22,
          }}
        >
          Up and running in days, not months
        </span>

        {/* Heading */}
        <h1
          style={{
            ...heading,
            fontSize: 36,
            textAlign: "center",
          }}
        >
          Get your business{" "}
          <span style={{ color: C.orange }}>online this week</span>
        </h1>

        {/* Subtext */}
        <p style={{ ...subtext, textAlign: "center", maxWidth: 480, margin: "0 auto 32px" }}>
          We build your website, manage your social media, and handle your
          Google listing — so you can focus on what you do best.
        </p>

        {/* 2×2 feature grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 28,
          }}
        >
          {[
            { emoji: "🌐", title: "Website live in 24hrs", sub: "Professional, mobile-friendly, SEO-ready" },
            { emoji: "📱", title: "Social media on autopilot", sub: "AI posts while you focus on work" },
            { emoji: "📍", title: "Google Business setup", sub: "Get found in local search instantly" },
            { emoji: "🤖", title: "AI customer service", sub: "Answers enquiries & books jobs 24/7" },
          ].map((f) => (
            <div key={f.title} style={card}>
              <span style={{ fontSize: 26, display: "block", marginBottom: 8 }}>{f.emoji}</span>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 3 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 13, color: C.greyMuted, lineHeight: 1.4 }}>{f.sub}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => setStep(1)}
          style={{
            display: "block",
            width: "100%",
            height: 52,
            background: C.orange,
            color: C.white,
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 700,
            fontFamily: fontBody,
            cursor: "pointer",
            marginBottom: 14,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = C.orangeDark;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = C.orange;
          }}
        >
          See what Dorza can do for you →
        </button>

        {/* Footnote */}
        <p style={{ fontSize: 12, color: C.greyMuted, textAlign: "center", margin: 0 }}>
          No commitment. See your options in 2 minutes.
        </p>
      </div>
    );
  }

  /* ── Step 1 — Business type ── */
  function StepBusinessType() {
    return (
      <div>
        <h2 style={heading}>What kind of business do you run?</h2>
        <p style={subtext}>This helps us show you the right solution.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {BUSINESS_TYPES.map((t) => {
            const active = selectedType === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                style={{
                  background: active ? C.orangeLight : C.white,
                  border: `2px solid ${active ? C.orange : C.border}`,
                  borderRadius: 12,
                  padding: "16px 14px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: fontBody,
                  transition: "border-color 0.15s, background 0.15s",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{t.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 3 }}>
                  {t.label}
                </div>
                <div style={{ fontSize: 12, color: C.greyMuted }}>{t.example}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── Step 2 — What you get ── */
  function StepWhatYouGet() {
    return (
      <div>
        <h2 style={heading}>
          Here&apos;s what Dorza will build for{" "}
          <span style={{ color: C.orange }}>{selectedTypeLabel}</span>
        </h2>
        <p style={subtext}>All done for you. No tech skills needed.</p>

        <div style={{ position: "relative" }}>
          {/* Vertical connector line */}
          <div
            style={{
              position: "absolute",
              left: 19,
              top: 24,
              bottom: 24,
              width: 2,
              background: C.border,
              zIndex: 0,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Circle badge */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: item.color,
                    color: C.white,
                    fontSize: 9,
                    fontWeight: 700,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    lineHeight: 1.2,
                    textTransform: "uppercase",
                    letterSpacing: 0.3,
                  }}
                >
                  {item.badge.split(" ").map((w, wi) => (
                    <span key={wi}>{w}</span>
                  ))}
                </div>

                {/* Card */}
                <div style={{ ...card, flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 4 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 13, color: C.grey, lineHeight: 1.55 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Step 3 — Pick a plan ── */
  function StepPickPlan() {
    return (
      <div>
        <h2 style={heading}>Choose your plan</h2>
        <p style={subtext}>
          All plans include your website built in 24 hours. Cancel anytime.
        </p>

        {/* Promo banner */}
        <div
          style={{
            background: C.orange,
            color: C.white,
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 14,
            fontWeight: 600,
            textAlign: "center",
            marginBottom: 20,
            lineHeight: 1.4,
          }}
        >
          🎉 Founding client offer: 50% off setup + first 3 months half price
        </div>

        {/* Plan cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PLANS.map((plan) => {
            const active = selectedPlan === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  background: C.white,
                  border: `2px solid ${active ? plan.color : C.border}`,
                  borderRadius: 14,
                  padding: "20px 18px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: fontBody,
                  position: "relative",
                  transition: "border-color 0.15s",
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      background: C.orange,
                      color: C.white,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: 999,
                    }}
                  >
                    {plan.badge}
                  </span>
                )}

                {/* Plan name */}
                <div
                  style={{
                    fontFamily: fontDisplay,
                    fontWeight: 700,
                    fontSize: 17,
                    color: plan.color,
                    marginBottom: 6,
                  }}
                >
                  {plan.name}
                </div>

                {/* Pricing */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 6,
                    marginBottom: 14,
                  }}
                >
                  <span style={{ fontSize: 28, fontWeight: 700, color: C.navy }}>
                    ${plan.monthly}
                  </span>
                  <span style={{ fontSize: 13, color: C.greyMuted }}>/mo</span>
                  <span style={{ fontSize: 13, color: C.greyMuted, marginLeft: 4 }}>
                    + ${plan.setup} setup
                  </span>
                </div>

                {/* Features */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                  }}
                >
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13,
                        color: C.grey,
                      }}
                    >
                      <span style={{ color: C.orange, fontWeight: 700, fontSize: 14 }}>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── Step 4 — Get started (form + success) ── */
  function StepGetStarted() {
    if (submitted) {
      return (
        <div style={{ textAlign: "center" }}>
          {/* Green tick */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#D1FAE5",
              color: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            ✓
          </div>

          <h2 style={{ ...heading, textAlign: "center" }}>
            You&apos;re all set, {formData.name}!
          </h2>
          <p style={{ ...subtext, textAlign: "center", maxWidth: 420, margin: "0 auto 28px" }}>
            We&apos;ll be in touch within 24 hours to get everything rolling.
            Your website will be live this week.
          </p>

          {/* What happens next */}
          <div
            style={{
              background: C.orange,
              borderRadius: 14,
              padding: "22px 20px",
              textAlign: "left",
              color: C.white,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
              What happens next
            </div>
            <ol
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {NEXT_STEPS.map((ns, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(255,255,255,0.22)",
                      borderRadius: "50%",
                      width: 26,
                      height: 26,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 12,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 14, lineHeight: 1.5, paddingTop: 4 }}>
                    {ns}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      );
    }

    const fields = [
      { key: "name", label: "Your name", placeholder: "e.g. Sarah", type: "text" },
      { key: "business", label: "Business name", placeholder: "e.g. Sarah's Hair Studio", type: "text" },
      { key: "phone", label: "Phone number", placeholder: "e.g. 0412 345 678", type: "tel" },
      { key: "email", label: "Email (optional)", placeholder: "e.g. sarah@example.com", type: "email" },
    ];

    return (
      <div>
        <h2 style={heading}>Let&apos;s get you started</h2>
        <p style={subtext}>
          We&apos;ll be in touch within 24 hours to kick things off.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          {fields.map((f) => (
            <div key={f.key}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.navy,
                  marginBottom: 6,
                }}
              >
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={formData[f.key as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [f.key]: e.target.value })
                }
                style={inputBase}
              />
            </div>
          ))}
        </div>

        {/* Plan summary */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: "14px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>
              {selectedPlanData.name} plan
            </div>
            <div style={{ fontSize: 12, color: C.greyMuted }}>
              + ${selectedPlanData.setup} setup
            </div>
          </div>
          <div style={{ fontWeight: 700, fontSize: 24, color: C.orange }}>
            ${selectedPlanData.monthly}
            <span style={{ fontSize: 13, fontWeight: 400, color: C.greyMuted }}>
              /mo
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════════ */
  /*  Progress pills                                                     */
  /* ════════════════════════════════════════════════════════════════════ */
  function ProgressPills() {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
          const isActive = i === step;
          const isComplete = i < step;
          return (
            <div
              key={i}
              style={{
                height: 8,
                width: isActive ? 28 : 8,
                borderRadius: 999,
                background: isActive || isComplete ? C.orange : "#D1D5DB",
                opacity: isComplete && !isActive ? 0.5 : 1,
                transition: "width 0.25s ease, background 0.2s ease",
              }}
            />
          );
        })}
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════════ */
  /*  Render                                                             */
  /* ════════════════════════════════════════════════════════════════════ */
  const steps = [StepWelcome, StepBusinessType, StepWhatYouGet, StepPickPlan, StepGetStarted];
  const ActiveStep = steps[step];
  const disabled = !canProceed();

  return (
    <div
      style={{
        fontFamily: fontBody,
        background: "linear-gradient(180deg, #FFF8F2 0%, #FFFFFF 40%)",
        minHeight: "100vh",
        color: C.grey,
      }}
    >
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@600;700&display=swap"
        rel="stylesheet"
      />

      {/* ── Sticky header ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.border}`,
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: fontDisplay,
            fontWeight: 700,
            fontSize: 22,
            color: C.navy,
            letterSpacing: "-0.5px",
          }}
        >
          <span>Dor</span>
          <span style={{ color: C.orange }}>za</span>
        </div>

        <ProgressPills />

        <div style={{ fontSize: 12, color: C.greyMuted, whiteSpace: "nowrap" }}>
          {step + 1} / {TOTAL_STEPS}
        </div>
      </header>

      {/* ── Content ── */}
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          padding: "32px 20px 120px",
        }}
      >
        <ActiveStep />
      </div>

      {/* ── Fixed bottom nav ── */}
      {!submitted && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: `1px solid ${C.border}`,
            padding: "14px 20px",
            display: "flex",
            gap: 10,
            boxSizing: "border-box",
          }}
        >
          {/* Back */}
          {step > 0 && (
            <button
              onClick={handleBack}
              style={{
                height: 52,
                padding: "0 20px",
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                background: "transparent",
                color: C.grey,
                fontFamily: fontBody,
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              ← Back
            </button>
          )}

          {/* Forward */}
          <button
            onClick={handleForward}
            disabled={disabled}
            style={{
              flex: 1,
              height: 52,
              background: disabled ? "#D1D5DB" : C.orange,
              color: C.white,
              border: "none",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: fontBody,
              cursor: disabled ? "not-allowed" : "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!disabled)
                (e.currentTarget as HTMLButtonElement).style.background = C.orangeDark;
            }}
            onMouseLeave={(e) => {
              if (!disabled)
                (e.currentTarget as HTMLButtonElement).style.background = C.orange;
            }}
          >
            {forwardLabel}
          </button>
        </div>
      )}
    </div>
  );
}
