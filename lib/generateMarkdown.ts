import type { OnboardState } from "./types";

export function generateMarkdown(s: OnboardState): string {
  const businessType = s.businessType === "Other" ? s.customBusinessType : s.businessType;
  const today = new Date().toISOString().split("T")[0];

  const setupFees: Record<string, number> = { Starter: 499, Growth: 799, Pro: 1299 };
  const monthlyFees: Record<string, number> = { Starter: 199, Growth: 349, Pro: 549 };

  const selectedSetup = s.selectedPackage ? setupFees[s.selectedPackage] : 0;
  const selectedMonthly = s.selectedPackage ? monthlyFees[s.selectedPackage] : 0;

  const foundingSetup = s.foundingClient ? Math.round(selectedSetup * 0.5) : selectedSetup;

  const sections = s.websiteSections || {};
  const sectionsList = Object.entries(sections)
    .map(([key, val]) => `- [${val ? "x" : " "}] ${key}`)
    .join("\n");

  return `# Dorza — Client Intake: ${s.businessName || "Unnamed"}

**Date:** ${today}
**Completed by:** ${s.completedBy || "—"}

---

## 1. Business Basics

| Field | Value |
|-------|-------|
| Business name | ${s.businessName} |
| Owner name | ${s.ownerName} |
| Business type | ${businessType} |
| Niche | ${s.niche || "—"} |
| ABN | ${s.abn || "—"} |
| Street address | ${s.streetAddress || "—"} |
| Suburb | ${s.suburb || "—"} |
| Phone | ${s.phone} |
| Email | ${s.email || "—"} |
| Opening hours | ${s.openingHours || "—"} |

---

## 2. Digital Presence

| Field | Value |
|-------|-------|
| Existing website | ${s.existingWebsite || "—"} |
| Google Business | ${s.googleBusiness || "—"} |
| Instagram | ${s.instagramHandle || "—"} |
| Facebook | ${s.facebookPage || "—"} |
| Other platforms | ${s.otherPlatforms || "—"} |
| Biggest frustration | ${s.biggestFrustration || "—"} |

---

## 3. Services

${s.services.filter(Boolean).map((svc, i) => `${i + 1}. ${svc}`).join("\n") || "—"}

**Differentiator:** ${s.differentiator || "—"}
**Price range:** ${s.priceRange || "—"}

---

## 4. Target Customers

| Field | Value |
|-------|-------|
| Typical customer | ${s.typicalCustomer || "—"} |
| Service area | ${s.serviceArea || "—"} |
| Discovery channels | ${s.discoveryChannels.join(", ") || "—"} |

---

## 5. Brand & Style

| Field | Value |
|-------|-------|
| Has logo | ${s.hasLogo || "—"} |
| Brand colours | ${s.brandColours || "—"} |
| Tone | ${s.tone || "—"} |
| Inspiration sites | ${s.inspirationSites || "—"} |
| Brand keywords | ${s.brandKeywords || "—"} |

---

## 6. Photos & Assets

| Field | Value |
|-------|-------|
| Logo status | ${s.logoStatus || "—"} |
| Photos status | ${s.photosStatus || "—"} |
| Menu/service doc | ${s.menuDocStatus || "—"} |
| Testimonials | ${s.testimonialsStatus || "—"} |
| Specific testimonials | ${s.specificTestimonials || "—"} |
| Photo notes | ${s.photoNotes || "—"} |

---

## 7. Website Sections

${sectionsList || "—"}

${sections["Online booking"] ? `**Booking link:** ${s.bookingLink || "—"}` : ""}
${sections["E-commerce"] ? `**E-commerce platform:** ${s.ecommercePlatform || "—"}` : ""}

---

## 8. Social Media

**Platforms:** ${s.socialPlatforms.join(", ") || "—"}
**Posting frequency:** ${s.postingFrequency || "—"}
**Content types:** ${s.contentTypes.join(", ") || "—"}
**Approval process:** ${s.approvalProcess || "—"}
**Avoid topics:** ${s.avoidTopics || "—"}

---

## 9. Package & Pricing

| Field | Value |
|-------|-------|
| Selected package | ${s.selectedPackage || "—"} |
| Founding client | ${s.foundingClient ? "Yes" : "No"} |
| Standard setup fee | $${selectedSetup} |
| Agreed setup fee | $${s.agreedSetupFee || foundingSetup} |
| Standard monthly fee | $${selectedMonthly} |
| Agreed monthly fee | $${s.agreedMonthlyFee || selectedMonthly} |
| Payment method | ${s.paymentMethod || "—"} |
| Start date | ${s.startDate || "—"} |

---

## 10. Notes

${s.notes || "—"}
`.trim();
}
