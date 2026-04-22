# Flowly — Landing Page

A modern SaaS landing page for **Flowly**, a project management platform built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Overview

Flowly helps remote teams manage projects without the chaos — smart task management, real-time collaboration, and beautiful dashboards in one place.

This repository contains the full marketing landing page including:

- Animated hero section with a dashboard mockup
- Social proof bar
- Features section
- Pricing tiers with monthly/annual toggle
- Testimonials
- FAQ accordion
- Call-to-action section
- Contact and signup modals
- REST API routes with input validation and XSS protection

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Testing | Jest + Testing Library |
| Node | ≥ 18.17 |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── contact/route.ts     # Contact form endpoint
│   │   ├── subscribe/route.ts   # Email subscribe endpoint
│   │   └── health/route.ts      # Health check endpoint
│   ├── globals.css
│   ├── icon.tsx                 # Generated favicon
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── SocialProof.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   ├── ClientShell.tsx          # Modal context provider wrapper
│   ├── ModalContext.tsx
│   └── Modals.tsx
└── lib/
    └── security-headers.ts
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for production

```bash
npm run build
npm start
```

### Run tests

```bash
npm test
```

## API Routes

All endpoints validate input and guard against XSS injection.

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/contact` | Submit a contact form (`name`, `email`, `message`) |
| `POST` | `/api/subscribe` | Subscribe an email address to the waitlist |
| `GET` | `/api/health` | Health check — returns `{ status: "ok" }` |

## Security

Security headers applied to every response via `next.config.mjs`:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` with HSTS preload
- `Permissions-Policy` (camera, microphone, geolocation disabled)
- Content Security Policy (CSP)

## Pricing Plans

| Plan | Monthly | Annual |
|---|---|---|
| Free | $0 | $0 |
| Pro | $12/mo | $9/mo |
| Business | $29/mo | $23/mo |

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com):

```bash
npx vercel
```

Or use any Node.js-compatible hosting that supports Next.js. No environment variables are required to run the landing page.

## License

MIT
