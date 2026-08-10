<div align="center">

# meshary · dev

**Personal portfolio of Meshary A. Aquino**
Computer Engineer · Full-Stack Developer · Edge AI Engineer

[![Next.js](https://img.shields.io/badge/Next.js-15.3-000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Chatbot-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)
[![Umami Analytics](https://img.shields.io/badge/Umami-Privacy_Analytics-2094f3?logo=umami&logoColor=white)](https://cloud.umami.is)

</div>

---

## Overview

A hand-crafted dark-themed portfolio built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features a dark navy-charcoal color system with warm copper accents, scroll-reveal animations, gallery-first project pages, an AI-powered chatbot assistant backed by Google Gemini, and open, cookie-free visitor analytics powered by Umami.

### Highlights

- 💼 **Interactive Work Experience** — Career timeline with click-to-expand accomplishment bullet points and metrics
- 🎨 **Custom dark theme** — Deep navy base with copper/amber accents, no generic templates
- 🖼️ **Gallery-first project pages** — Full-viewport slideshow with touch swipe support
- 🤖 **Meshary AI** — Interactive portfolio chatbot powered by Google Gemini 3.6
- 📊 **Open Live Analytics** — Privacy-first, cookie-free visitor insights powered by Umami
- ⚡ **60fps Mobile Performance** — GPU-optimized blurs, touch-swipeable project categories, dynamic viewport safety
- 🔒 **Privacy & Security** — GDPR-compliant anonymized metrics + custom security headers

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3.4 + custom CSS utilities |
| **UI Components** | Radix UI primitives (shadcn/ui) |
| **AI Chatbot** | Google Gemini API (`@google/genai`) |
| **Analytics** | Umami Analytics (100% Cookie-free, GDPR compliant) |
| **Fonts** | Plus Jakarta Sans (body) + Outfit (headlines) via `next/font` |
| **Icons** | Lucide React |
| **Deployment** | Vercel / Firebase App Hosting (standalone output) |

---

## Project Structure

```
src/
├── app/
│   ├── api/chat/          # Gemini AI chatbot API route
│   ├── projects/[slug]/   # Dynamic project detail pages + touch carousels
│   ├── globals.css         # Dark theme + mobile GPU optimizations
│   ├── layout.tsx          # Root layout + Umami script injection
│   └── page.tsx            # Homepage
├── components/
│   ├── ui/                 # Radix-based UI primitives
│   ├── Header.tsx          # Scroll-aware sticky nav with Experience & Analytics
│   ├── Hero.tsx            # Gradient name + stats
│   ├── Projects.tsx        # Filtered project grid + mobile swipe pill bar
│   ├── Experience.tsx      # Interactive career timeline with click-to-expand details
│   ├── Skills.tsx          # Horizontal skill matrix
│   ├── AnalyticsSection.tsx# Dedicated live traffic & privacy shield section
│   ├── Contact.tsx         # Clean contact rows
│   ├── Footer.tsx          # Copper gradient divider + Live Analytics badge
│   └── Chatbot.tsx         # Floating AI assistant with dvh mobile safety
├── hooks/
│   └── use-scroll-reveal.ts # Touch-stabilized IntersectionObserver hook
└── lib/
    ├── projects.ts         # Project data & types
    ├── umami.ts            # Umami custom event tracking helper
    └── utils.ts            # Tailwind merge utility
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/Meshy21/mesharys-portfolio.git
cd mesharys-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Environment Variables

Create a `.env.local` file:

```env
# Gemini AI Chatbot
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here

# Umami User Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID=f54f12c9-a5ad-4282-a4d1-ad3621b88a8e
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
NEXT_PUBLIC_UMAMI_SHARE_URL=https://cloud.umami.is/share/f54f12c9-a5ad-4282-a4d1-ad3621b88a8e
```

### Setting Up Umami Analytics

1. Sign up or log into [Umami Cloud](https://cloud.umami.is) (or your self-hosted Umami dashboard).
2. Click **Add Website** and enter your domain name (e.g. `meshary.dev`).
3. Copy the **Website ID** (UUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).
4. Paste it into your `.env.local` or host environment variables as `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
5. Re-deploy or restart `npm run dev`. Umami will automatically begin tracking page views and visitor metrics privacy-compliantly!

### Build for Production

```bash
npm run build
npm run start
```

---

## Featured Projects

| Project | Category | Stack |
|---------|----------|-------|
| **Enterprise Payroll Web App** — BIR & Statutory Compliance | Web App / Security | Next.js, FastAPI, PostgreSQL, Tailwind |
| **SyncSolve API** — Conflict Resolution Engine | API / Web App | Python, FastAPI, Distributed Systems |
| **Wood Knot Detection** — On-Device AI | Mobile / AI | YOLOv8, TensorFlow Lite, Flutter |
| **Braille Haptic Reader** — Capstone | IoT / AI | YOLOv5, Raspberry Pi, Python |
| **Custom Payroll System** — Desktop App | Desktop App | Python, PyQt6, PostgreSQL |

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `hsl(222 47% 6%)` | Page background (deep navy-charcoal) |
| `--foreground` | `hsl(210 20% 92%)` | Primary text (warm off-white) |
| `--primary` | `hsl(29 85% 52%)` | Copper accent (CTAs, links, highlights) |
| `--card` | `hsl(222 30% 10%)` | Elevated surfaces |
| `--muted` | `hsl(222 25% 12%)` | Subtle backgrounds |
| `--border` | `hsl(222 20% 18%)` | Borders and dividers |

### Typography

- **Headlines**: Outfit (variable, `--font-headline`)
- **Body**: Plus Jakarta Sans (variable, `--font-sans`)
- **Code/Labels**: System monospace (`font-code`)

---

## License

© 2025–2026 Meshary A. Aquino. All rights reserved.
