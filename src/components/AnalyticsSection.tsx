'use client';

import { ShieldCheck, BarChart3, ExternalLink, Lock, Eye, Zap } from 'lucide-react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const shareUrl =
  process.env.NEXT_PUBLIC_UMAMI_SHARE_URL ||
  'https://cloud.umami.is/share/f54f12c9-a5ad-4282-a4d1-ad3621b88a8e';

export default function AnalyticsSection() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section id="analytics" ref={sectionRef} className="reveal w-full py-12 sm:py-16 md:py-20 relative">
      {/* Top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary font-semibold uppercase tracking-wider">
            <BarChart3 className="h-3.5 w-3.5 text-primary" />
            <span>{'// Open Metrics & Transparency'}</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Live Traffic &amp; Open Analytics
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
            Real-time portfolio metrics powered by <strong className="text-foreground font-semibold">Umami Analytics</strong>. Completely transparent, 100% cookie-free, and respectful of your privacy.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Card 1: Privacy First */}
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-4 hover:border-primary/40 transition-all duration-300 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-headline font-bold text-lg text-foreground">
              100% Cookie-Free
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              No tracking cookies, no persistent device fingerprinting, and no cross-site profiling. Your privacy is fully preserved.
            </p>
          </div>

          {/* Card 2: GDPR Compliant */}
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-4 hover:border-primary/40 transition-all duration-300 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="font-headline font-bold text-lg text-foreground">
              GDPR &amp; CCPA Compliant
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All website visitor metrics are aggregated anonymously. No personal identifiable information (PII) is ever saved.
            </p>
          </div>

          {/* Card 3: Open Data */}
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-4 hover:border-primary/40 transition-all duration-300 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="font-headline font-bold text-lg text-foreground">
              Open &amp; Transparent
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Anyone can view live visitor counts, top project pages, and traffic referrals via our public dashboard.
            </p>
          </div>
        </div>

        {/* Live Dashboard CTA & Privacy Notice Box */}
        <div className="bg-gradient-to-r from-card via-card/90 to-card border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left z-10 max-w-xl">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wide">
                Live Public Dashboard Active
              </span>
            </div>
            <h4 className="font-headline font-bold text-xl text-foreground">
              Explore Live Visitor Traffic &amp; Page Views
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Click below to open the live, interactive Umami analytics dashboard for this portfolio in real-time.
            </p>
          </div>

          <div className="z-10 shrink-0">
            <Link
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <BarChart3 className="h-4 w-4" />
              <span>View Open Analytics</span>
              <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Privacy Notice Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-[11px] font-mono text-muted-foreground/70 flex items-center justify-center gap-1.5 flex-wrap">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 inline" />
            <span>Privacy Note: No cookies are stored on your device. Analytics data is completely anonymized.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
