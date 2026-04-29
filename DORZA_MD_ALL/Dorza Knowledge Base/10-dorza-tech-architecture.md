# Dorza — Tech Architecture

> Last updated: March 2026 | Primary owner: Adi Widodo (CTO)

## Stack overview

| Layer | Tool | Purpose |
|-------|------|---------|
| Website framework | Next.js 14 (App Router, static export) | Client websites + Dorza site |
| Styling | Tailwind CSS v3 | All frontend styling |
| Language | TypeScript (strict) | All code |
| Icons | Lucide React | UI icons |
| Fonts | Google Fonts (DM Sans + Fraunces) | Typography via next/font |
| Hosting | Vercel (current) → AWS S3 + CloudFront (at scale) | Static site hosting |
| DNS & SSL | Cloudflare | Domain management, CDN, auto-SSL |
| AI — website generation | Claude Code (Opus 4.6) | Generates full websites from intake markdown |
| AI — content generation | Claude API (Sonnet) | Social media posts, blog content, chatbot responses |
| Social scheduling | Buffer (API) | Automated posting to Instagram + Facebook |
| Forms | Native webhook → email (dorza.app@gmail.com) | Form submissions. TODO: Formalise backend. |
| Automation orchestration | n8n or Make.com (planned) | Connecting intake → build → deploy → schedule |
| Google Business | Google Business Profile (manual → API) | Profile creation and management |
| Analytics | Google Analytics 4 + Google Search Console | Website and search performance |
| Monitoring | UptimeRobot (free) | Site uptime alerts |
| Version control | GitHub | All code repos |

## Architecture diagram (conceptual)

```
Client meeting
    ↓
Intake app (tablet) → generates intake.md
    ↓
Claude Code reads intake.md + CLAUDE.md → generates Next.js site
    ↓
Vercel deployment → live on client domain (Cloudflare DNS)
    ↓ (parallel)
Google Business Profile setup (manual → API)
Claude API → content calendar → Buffer API → Instagram + Facebook
Claude API → chatbot knowledge base → embedded widget on site
    ↓
Ongoing: Claude API generates weekly content → Buffer schedules
         UptimeRobot monitors → alerts on downtime
         GA4 + Buffer + GBP → monthly report data
```

## Current state vs future state

| Component | Current (pre-launch) | Future (20+ clients) |
|-----------|---------------------|----------------------|
| Website builds | Claude Code manually triggered | Automated via n8n: intake form → trigger build → deploy |
| Hosting | Vercel free tier | Vercel Pro ($20/mo) or migrate to AWS S3 + CloudFront |
| Content generation | Manual Claude prompts per client | Cron job: Claude API generates weekly → auto-schedules via Buffer API |
| Social scheduling | Manual paste into Buffer | Buffer API integration, zero-touch |
| Form handling | Webhook → email notification | Dedicated API endpoint, data stored in DB |
| Client dashboard | None | Lovable-built React app: analytics, content approval, support |
| Google Business | Manual setup via web UI | Google Business Profile API: auto-create, auto-populate |
| Chatbot | Per-client Claude API setup | Standardised chatbot platform with per-client knowledge bases |
| Invoicing | Manual | Stripe recurring billing |
| Monitoring | UptimeRobot per site | Centralised dashboard monitoring all client sites |

## Infrastructure cost per client (at current scale)

| Item | Monthly cost |
|------|-------------|
| Vercel hosting (free tier, up to 100 deployments/day) | $0 |
| Cloudflare DNS + SSL | $0 |
| Claude API (content generation, ~50 API calls/month) | $8–$18 |
| Buffer (free tier: 3 channels, 10 posts/channel) | $0–$10 |
| UptimeRobot (free: 50 monitors) | $0 |
| Domain registration (Cloudflare) | ~$1/mo amortised |
| **Total per client** | **$9–$29/mo** |

At 50+ clients, consider: Vercel Pro ($20/mo flat), Buffer paid tier ($15/mo), consolidated monitoring.

## Key technical decisions

1. **Static export over SSR:** Client sites are brochure sites with no dynamic content. Static export is cheaper, faster, and more reliable. `output: 'export'` in next.config.js.

2. **Vercel over AWS initially:** Simpler deployment, preview URLs for client review, automatic SSL. Move to AWS when per-site hosting cost matters (50+ clients).

3. **Claude Code for builds, Claude API for ongoing content:** Opus via Claude Code handles the complex one-time website generation. Sonnet via API handles the repetitive weekly content generation at lower cost.

4. **No SaaS product:** We are a service, not a platform. Clients don't log in, configure settings, or manage tools. We do it for them. This is a deliberate business decision, not a technical limitation.

## Form handling (current)

Forms on client sites and the Dorza site submit via a native webhook that sends an email notification to dorza.app@gmail.com. The exact implementation is:

- TODO: Document the webhook endpoint and configuration
- TODO: Determine if this scales to 20+ clients or needs a proper backend

Adi to formalise this as the first backend infrastructure task.

## Security considerations

- Client social media credentials stored securely (TODO: define password management — 1Password, Bitwarden, or similar)
- Vercel and Cloudflare accounts under Dorza team ownership, not personal accounts
- Client sites are static with no server-side processing — minimal attack surface
- Form submissions go through our controlled endpoint — no direct database exposure
- Google Business access via manager roles, not client credential sharing where possible

## Repository structure (planned)

```
github.com/dorza/
├── dorza-site/          # Main Dorza marketing site + intake app + waitlist
├── client-templates/    # Next.js templates per business type
├── automation/          # n8n workflows, scripts, cron jobs
├── chatbot/             # Chatbot platform + knowledge base management
└── internal-tools/      # Reporting, monitoring, admin scripts
```
