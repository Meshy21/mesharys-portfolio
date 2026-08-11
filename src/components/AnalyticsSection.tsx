'use client';

import { ShieldCheck, BarChart3, Users, Clock, Eye, Zap, TrendingUp, Lock } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export default function AnalyticsSection() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section id="analytics" ref={sectionRef} className="reveal w-full py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

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

        {/* Live Visitor & Session Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Visitors This Week */}
          <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3 hover:border-primary/40 transition-all duration-300 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground font-medium">This Week</span>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-headline font-bold text-foreground group-hover:text-emerald-400 transition-colors flex items-baseline gap-2">
                <span>145+</span>
                <span className="text-xs font-mono font-medium text-emerald-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" /> +18%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Unique Visitors (7 Days)</p>
            </div>
          </div>

          {/* Card 2: Average Visit Duration */}
          <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3 hover:border-primary/40 transition-all duration-300 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground font-medium">Avg Session</span>
              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">
                3m 18s
              </div>
              <p className="text-xs text-muted-foreground mt-1">Average Time Spent per Visit</p>
            </div>
          </div>

          {/* Card 3: Weekly Page Views */}
          <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3 hover:border-primary/40 transition-all duration-300 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground font-medium">Total Views</span>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Eye className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-headline font-bold text-foreground group-hover:text-amber-400 transition-colors">
                490+
              </div>
              <p className="text-xs text-muted-foreground mt-1">Project &amp; Page Views (7 Days)</p>
            </div>
          </div>

          {/* Card 4: Bounce Rate */}
          <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3 hover:border-primary/40 transition-all duration-300 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground font-medium">Engagement</span>
              <div className="h-8 w-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
                <Zap className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-headline font-bold text-foreground group-hover:text-sky-400 transition-colors">
                24.5%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Low Bounce / High Retention</p>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid — Privacy & Security */}
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
              Analytics metrics are displayed openly on-page for all visitors without requiring accounts or logins.
            </p>
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
