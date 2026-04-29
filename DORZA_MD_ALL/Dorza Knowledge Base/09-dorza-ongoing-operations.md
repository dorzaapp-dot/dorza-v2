# Dorza — Ongoing Operations

> Last updated: March 2026 | Checklists for recurring work after a client is onboarded.

## Weekly tasks per client (~15 min)

- [ ] Generate next week's social media content batch via Claude
- [ ] Review generated content for accuracy and tone
- [ ] Schedule posts in Buffer
- [ ] Check and respond to Google reviews (positive: thank within 24hrs; negative: flag to client, draft response together)
- [ ] Monitor chatbot conversations — flag any low-confidence or incorrect responses
- [ ] Check Instagram/Facebook DMs — respond or escalate to client

## Monthly tasks per client (~30 min)

- [ ] Pull analytics data: GA4 (website), Buffer (social), Google Business (profile views, calls, directions)
- [ ] Generate monthly performance report via Claude (see template below)
- [ ] Monthly check-in with client (10-min call or text): what's working, anything changing, upcoming events or promos
- [ ] Review and refresh website content if needed (seasonal updates, new services, price changes)
- [ ] Update Google Business with any new photos, services, or hours changes
- [ ] Adjust social media strategy based on what's performing

## Monthly report template

Feed this to Claude with the raw data:

```
Generate a client-friendly monthly report for [Business Name], [Month Year].

Website (GA4): Sessions: [X], Page views: [X], Top pages: [list], Traffic sources: [breakdown]
Social (Buffer): New followers: IG [X] / FB [X], Posts: [X], Engagement: [X], Top post: [desc]
Google Business: Profile views: [X], Searches: [X], Calls: [X], Directions: [X], Website clicks: [X], New reviews: [X] avg [X] stars

Format: Clean 1-page summary. 3 key wins. 1 recommendation for next month.
Tone: professional but warm. End positive.
```

## Quarterly tasks

- [ ] Review pricing — are costs per client tracking to estimates?
- [ ] Review churn — which clients have left and why?
- [ ] Refresh website templates if AI output quality has improved
- [ ] Update CLAUDE.md conventions based on learnings
- [ ] Review and improve prompt templates for content generation

## Automation targets

As you scale past 20 clients, progressively automate these manual steps:

| Task | Current (manual) | Automated via | Priority |
|------|-------------------|---------------|----------|
| Content generation | Prompt Claude per client | Cron job + Claude API → Buffer API | High — do at 15+ clients |
| Social scheduling | Copy-paste into Buffer | API integration, auto-schedule | High — do with content gen |
| Review responses | Check manually, draft reply | Claude API monitors + drafts, you approve | Medium — do at 25+ clients |
| Monthly reports | Pull data manually from 3 dashboards | GA4 API + Buffer API + GBP API → Claude → PDF | Medium — do at 20+ clients |
| Website updates | Open code, edit, redeploy | Client dashboard triggers rebuild | Low — do at 40+ clients |
| Chatbot tuning | Manual review of conversations | Auto-flag low-confidence responses | Low — do at 30+ clients |
| Invoicing | Manual invoices or bank transfers | Stripe recurring billing | High — do at 10+ clients |
| Client onboarding | Manual 7-phase process | Partially automated via n8n/Make.com | Medium — after process is stable |

**Rule: The first 10 clients should be semi-manual.** Learn what works, refine the process, then automate. Premature automation locks in bad processes.

## Client health indicators

Track these to predict churn and identify upsell opportunities:

| Signal | Meaning | Action |
|--------|---------|--------|
| Client stops responding to check-ins | Disengaged or unhappy | Call directly. Ask what's changed. |
| Engagement rates dropping | Content isn't resonating | Refresh content strategy, try new formats |
| Competitor launched a better site | Client may feel underserved | Proactive refresh offer |
| Client asks about ads | Ready for Pro tier | Upsell conversation |
| Client refers someone | Happy client | Thank them, apply referral credit, ask for testimonial |
| Google reviews increasing | Service is working | Highlight in monthly report |
