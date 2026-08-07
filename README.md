<div align="center">

# meshary · dev

**Personal portfolio of Meshary A. Aquino**
Computer Engineer · Full-Stack Developer · Edge AI Engineer

[![Next.js](https://img.shields.io/badge/Next.js-15.3-000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Chatbot-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)

</div>

---

## Overview

A hand-crafted dark-themed portfolio built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features a dark navy-charcoal color system with warm copper accents, scroll-reveal animations, gallery-first project pages, and an AI-powered chatbot assistant backed by Google Gemini.

### Highlights

- 🎨 **Custom dark theme** — Deep navy base with copper/amber accents, no generic templates
- 🖼️ **Gallery-first project pages** — Full-viewport slideshow is the first thing visitors see
- 🤖 **Meshary AI** — Interactive portfolio chatbot powered by Google Gemini 3.6
- ⚡ **Scroll-reveal animations** — IntersectionObserver-driven fade-up effects across all sections
- 📱 **Fully responsive** — Mobile-first design with adaptive layouts
- 🔒 **Security headers** — X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3.4 + custom CSS utilities |
| **UI Components** | Radix UI primitives (shadcn/ui) |
| **AI Chatbot** | Google Gemini API (`@google/genai`) |
| **Fonts** | Plus Jakarta Sans (body) + Outfit (headlines) via `next/font` |
| **Icons** | Lucide React |
| **Deployment** | Firebase App Hosting (standalone output) |

---

## Project Structure

```
src/
├── app/
│   ├── api/chat/          # Gemini AI chatbot API route
│   ├── projects/[slug]/   # Dynamic project detail pages
│   ├── globals.css         # Dark theme + animations
│   ├── layout.tsx          # Root layout with fonts
│   └── page.tsx            # Homepage
├── components/
│   ├── ui/                 # Radix-based UI primitives
│   ├── Header.tsx          # Scroll-aware sticky nav
│   ├── Hero.tsx            # Gradient name + stats
│   ├── Projects.tsx        # Filtered project grid
│   ├── Skills.tsx          # Horizontal skill rows
│   ├── Contact.tsx         # Clean contact rows
│   ├── Footer.tsx          # Copper gradient divider
│   └── Chatbot.tsx         # Floating AI assistant
├── hooks/
│   └── use-scroll-reveal.ts # IntersectionObserver hook
└── lib/
    ├── projects.ts         # Project data & types
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

Create a `.env.local` file for the AI chatbot:

```env
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
```

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
