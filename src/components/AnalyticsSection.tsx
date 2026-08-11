'use client';

import { ShieldCheck, Lock, EyeOff, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export default function AnalyticsSection() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section id="analytics" ref={sectionRef} className="reveal w-full py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>{'// Privacy & Transparency'}</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Privacy &amp; Visitor Analytics
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
              This portfolio collects minimal, aggregated visitor insights powered by <strong className="text-foreground font-semibold">Umami Analytics</strong>. Built with complete respect for your online privacy.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>100% Cookie-Free</span>
          </div>
        </div>

        {/* Feature Cards Grid — Privacy & Security Disclaimer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Card 1: 100% Cookie-Free */}
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-4 hover:border-primary/40 transition-all duration-300 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-headline font-bold text-lg text-foreground">
              No Tracking Cookies
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              No persistent tracking cookies are stored on your browser. You will never be asked to accept intrusive cookie banners.
            </p>
          </div>

          {/* Card 2: GDPR & CCPA Compliant */}
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-4 hover:border-primary/40 transition-all duration-300 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="font-headline font-bold text-lg text-foreground">
              GDPR &amp; CCPA Compliant
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All metrics are aggregated anonymously. No Personally Identifiable Information (PII) or IP addresses are saved.
            </p>
          </div>

          {/* Card 3: Zero Cross-Site Profiling */}
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-4 hover:border-primary/40 transition-all duration-300 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <EyeOff className="h-5 w-5" />
            </div>
            <h3 className="font-headline font-bold text-lg text-foreground">
              Zero Device Profiling
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Visitors are not tracked across websites or sessions. Data remains strictly private and restricted to basic page counts.
            </p>
          </div>
        </div>

        {/* Privacy Disclaimer Banner */}
        <div className="bg-card/50 border border-border/60 rounded-2xl p-4 sm:p-5 text-center backdrop-blur-sm">
          <p className="text-xs font-mono text-muted-foreground/80 flex items-center justify-center gap-2 flex-wrap">
            <ShieldCheck className="h-4 w-4 text-emerald-400 inline shrink-0" />
            <span>
              <strong>Privacy Disclaimer:</strong> Your visit is completely anonymous. No personal data, session recordings, or cookies are collected or shared.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

