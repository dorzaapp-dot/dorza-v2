import { useState } from "react";

const BUSINESS_TYPES = [
  { id: "tradie", label: "Tradie", icon: "🔧", examples: "Plumber, Electrician, Builder" },
  { id: "cafe", label: "Cafe / Restaurant", icon: "☕", examples: "Cafe, Bakery, Bar" },
  { id: "salon", label: "Salon / Beauty", icon: "✂️", examples: "Hair, Nails, Skin" },
  { id: "fitness", label: "Fitness / Wellness", icon: "💪", examples: "Gym, Yoga, Physio" },
  { id: "retail", label: "Retail / Shop", icon: "🛍️", examples: "Boutique, Florist, Gift" },
  { id: "services", label: "Professional Services", icon: "📋", examples: "Accounting, Legal, Consulting" },
];

const PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    setup: 499,
    monthly: 199,
    features: ["Custom website live in 24hrs", "Google Business setup", "Mobile-optimised & SEO-ready", "Basic analytics dashboard"],
    color: "#666",
  },
  {
    id: "growth",
    name: "Growth",
    setup: 799,
    monthly: 349,
    popular: true,
    features: ["Everything in Starter", "Social media (3 posts/week)", "AI customer service chatbot", "Review management", "Monthly performance report"],
    color: "#E8742A",
  },
  {
    id: "pro",
    name: "Pro",
    setup: 1299,
    monthly: 549,
    features: ["Everything in Growth", "Social media (5 posts/week)", "Paid ad campaigns", "Monthly strategy call", "Priority support"],
    color: "#1A1A2E",
  },
];

const STEPS = ["Welcome", "Business type", "What you get", "Pick a plan", "Get started"];

export default function GoDigitalOnboarding() {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("growth");
  const [formData, setFormData] = useState({ name: "", business: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const typeName = selectedType ? BUSINESS_TYPES.find(t => t.id === selectedType)?.label : "your business";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #FFF8F2 0%, #FFFFFF 40%)", fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@600;700&display=swap" rel="stylesheet" />

      {/* Progress bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #f0ebe4", padding: "12px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 600, margin: "0 auto" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E" }}>Go<span style={{ color: "#E8742A" }}>Digital</span></span>
          <div style={{ display: "flex", gap: 6 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ width: i === step ? 28 : 8, height: 8, borderRadius: 4, background: i <= step ? "#E8742A" : "#e0dbd4", transition: "all 0.3s ease" }} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "32px 20px 100px" }}>

        {/* Step 0: Welcome */}
        {step === 0 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "inline-block", background: "#FFF0E5", color: "#E8742A", fontSize: 13, fontWeight: 600, padding: "6px 16px", borderRadius: 20, marginBottom: 24 }}>
              Up and running in days, not months
            </div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 700, color: "#1A1A2E", lineHeight: 1.2, marginBottom: 16 }}>
              Get your business<br /><span style={{ color: "#E8742A" }}>online this week</span>
            </h1>
            <p style={{ fontSize: 17, color: "#666", lineHeight: 1.6, marginBottom: 32, maxWidth: 440, margin: "0 auto 32px" }}>
              We build your website, manage your social media, and handle your Google listing — so you can focus on what you do best.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32, textAlign: "left" }}>
              {[
                { icon: "🌐", title: "Website live in 24hrs", sub: "Custom-designed, mobile-ready" },
                { icon: "📱", title: "Social media on autopilot", sub: "We post 3-5x per week" },
                { icon: "📍", title: "Google Business setup", sub: "Get found by local customers" },
                { icon: "🤖", title: "AI customer service", sub: "Never miss an enquiry" },
              ].map((item, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #f0ebe4", borderRadius: 12, padding: "16px 14px" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E", marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{item.sub}</div>
                </div>
              ))}
            </div>

            <button onClick={next} style={{ width: "100%", padding: "16px", background: "#E8742A", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
              See what we can do for you →
            </button>
            <p style={{ fontSize: 12, color: "#999", marginTop: 12 }}>No commitment. See your options in 2 minutes.</p>
          </div>
        )}

        {/* Step 1: Business type */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>What kind of business do you run?</h2>
            <p style={{ fontSize: 15, color: "#888", marginBottom: 24 }}>This helps us show you the right solution.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {BUSINESS_TYPES.map(t => (
                <button key={t.id} onClick={() => { setSelectedType(t.id); }} style={{
                  background: selectedType === t.id ? "#FFF0E5" : "#fff",
                  border: selectedType === t.id ? "2px solid #E8742A" : "1px solid #e8e4df",
                  borderRadius: 12, padding: "18px 14px", textAlign: "left", cursor: "pointer",
                  transition: "all 0.2s ease"
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E" }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{t.examples}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: What you get */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>Here's what we'll build for {typeName}</h2>
            <p style={{ fontSize: 15, color: "#888", marginBottom: 24 }}>All done for you. No tech skills needed.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  step: "Day 1",
                  title: "Your website goes live",
                  desc: "A beautiful, mobile-friendly website with your services, photos, location, and contact details. Optimised for Google search so customers can find you.",
                  color: "#E8742A",
                  bg: "#FFF0E5",
                },
                {
                  step: "Day 2",
                  title: "Google Business profile set up",
                  desc: "We create or update your Google listing with your hours, photos, and services. When people search for you, they'll find everything they need.",
                  color: "#1D9E75",
                  bg: "#E1F5EE",
                },
                {
                  step: "Day 3",
                  title: "Social media starts posting",
                  desc: "Professional posts go out on Instagram and Facebook 3-5 times per week. Content tailored to your business, your style, your local area.",
                  color: "#378ADD",
                  bg: "#E6F1FB",
                },
                {
                  step: "Day 4",
                  title: "AI chatbot answers enquiries",
                  desc: "A smart chatbot on your website and socials that answers common questions, takes bookings, and never sleeps. 24/7 customer service.",
                  color: "#534AB7",
                  bg: "#EEEDFE",
                },
                {
                  step: "Ongoing",
                  title: "We handle everything",
                  desc: "Monthly reports, strategy updates, content creation, review management. You focus on your business — we handle the digital side.",
                  color: "#D85A30",
                  bg: "#FAECE7",
                },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <div style={{ flexShrink: 0, width: 52, textAlign: "center" }}>
                    <div style={{ background: item.bg, color: item.color, fontSize: 11, fontWeight: 700, padding: "4px 0", borderRadius: 6, marginBottom: 4 }}>{item.step}</div>
                    {i < 4 && <div style={{ width: 2, height: 40, background: "#ece8e2", margin: "4px auto" }} />}
                  </div>
                  <div style={{ background: "#fff", border: "1px solid #f0ebe4", borderRadius: 12, padding: 16, flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, color: "#1A1A2E", marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "#777", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Pick a plan */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>Choose your plan</h2>
            <p style={{ fontSize: 15, color: "#888", marginBottom: 20 }}>All plans include your website built in 24 hours. Cancel anytime.</p>

            <div style={{ background: "#FFF0E5", border: "1px solid #f5d4bc", borderRadius: 10, padding: "10px 14px", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>🎉</span>
              <span style={{ fontSize: 13, color: "#9a5a1f" }}><strong>Founding client offer:</strong> 50% off setup + first 3 months half price</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PACKAGES.map(pkg => (
                <button key={pkg.id} onClick={() => setSelectedPlan(pkg.id)} style={{
                  background: selectedPlan === pkg.id ? (pkg.popular ? "#FFF8F2" : "#fafafa") : "#fff",
                  border: selectedPlan === pkg.id ? `2px solid ${pkg.color}` : "1px solid #e8e4df",
                  borderRadius: 14, padding: "18px 16px", textAlign: "left", cursor: "pointer",
                  position: "relative", transition: "all 0.2s ease"
                }}>
                  {pkg.popular && (
                    <div style={{ position: "absolute", top: -10, right: 14, background: "#E8742A", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 8 }}>Most popular</div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: pkg.color }}>{pkg.name}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: "#1A1A2E" }}>${pkg.monthly}<span style={{ fontSize: 14, fontWeight: 400, color: "#999" }}>/mo</span></div>
                      <div style={{ fontSize: 12, color: "#999" }}>+ ${pkg.setup} setup</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 0" }}>
                    {pkg.features.map((f, i) => (
                      <div key={i} style={{ fontSize: 13, color: "#666", width: "100%", display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: "#E8742A", fontSize: 14 }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Get started form */}
        {step === 4 && !submitted && (
          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>Let's get you started</h2>
            <p style={{ fontSize: 15, color: "#888", marginBottom: 24 }}>We'll be in touch within 24 hours to kick things off.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { key: "name", label: "Your name", placeholder: "e.g. Sarah" },
                { key: "business", label: "Business name", placeholder: "e.g. Sarah's Hair Studio" },
                { key: "phone", label: "Phone number", placeholder: "e.g. 0412 345 678" },
                { key: "email", label: "Email (optional)", placeholder: "e.g. sarah@example.com" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={formData[f.key]}
                    onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                    style={{ width: "100%", padding: "14px 16px", border: "1px solid #e0dbd4", borderRadius: 10, fontSize: 15, background: "#fff", boxSizing: "border-box", outline: "none" }}
                  />
                </div>
              ))}
            </div>

            <div style={{ background: "#f8f6f3", borderRadius: 12, padding: 16, marginTop: 20 }}>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>Your selected plan</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#1A1A2E" }}>
                {PACKAGES.find(p => p.id === selectedPlan)?.name} — ${PACKAGES.find(p => p.id === selectedPlan)?.monthly}/month
              </div>
            </div>
          </div>
        )}

        {/* Submitted state */}
        {step === 4 && submitted && (
          <div style={{ textAlign: "center", paddingTop: 60 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 32 }}>✓</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "#1A1A2E", marginBottom: 12 }}>You're all set, {formData.name || "legend"}!</h2>
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
              We'll be in touch within 24 hours to get everything rolling. Your website will be live this week.
            </p>
            <div style={{ background: "#FFF0E5", borderRadius: 12, padding: "20px", marginTop: 32, maxWidth: 360, margin: "32px auto 0" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#9a5a1f", marginBottom: 8 }}>What happens next</div>
              <div style={{ fontSize: 13, color: "#886840", lineHeight: 1.7, textAlign: "left" }}>
                1. We'll call to confirm your details<br />
                2. Send you a quick onboarding form<br />
                3. Build your website (24 hours)<br />
                4. Set up social media & Google profile<br />
                5. You're live and growing!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed bottom nav */}
      {!(step === 4 && submitted) && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderTop: "1px solid #f0ebe4", padding: "12px 20px", zIndex: 10 }}>
          <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", gap: 10 }}>
            {step > 0 && (
              <button onClick={prev} style={{ padding: "14px 20px", background: "#f5f3f0", color: "#444", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
                ← Back
              </button>
            )}
            <button
              onClick={() => {
                if (step === 4) { setSubmitted(true); }
                else next();
              }}
              disabled={step === 1 && !selectedType}
              style={{
                flex: 1, padding: "14px", background: (step === 1 && !selectedType) ? "#ccc" : "#E8742A",
                color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: (step === 1 && !selectedType) ? "default" : "pointer"
              }}
            >
              {step === 4 ? "Submit →" : step === 3 ? "Get started →" : "Continue →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
