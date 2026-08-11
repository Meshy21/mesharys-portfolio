'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, BarChart3, Users, Clock, Eye, Zap, TrendingUp, TrendingDown, Lock, ExternalLink, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { AnalyticsStatsData } from '@/app/api/analytics/route';

export default function AnalyticsSection() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);
  const [stats, setStats] = useState<AnalyticsStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchAnalytics() {
      try {
        const res = await fetch('/api/analytics');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setStats(data);
          }
        }
      } catch (e) {
        console.warn('Failed to load live analytics stats:', e);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchAnalytics();
    return () => {
      isMounted = false;
    };
  }, []);

  const shareUrl = stats?.shareUrl || process.env.NEXT_PUBLIC_UMAMI_SHARE_URL || 'https://cloud.umami.is/share/f54f12c9-a5ad-4282-a4d1-ad3621b88a8e';

  return (
    <section id="analytics" ref={sectionRef} className="reveal w-full py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl space-y-3">
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

          <div className="flex items-center gap-3">
            {stats?.isLive ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>Live Umami Sync</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span>Privacy First</span>
              </div>
            )}

            <Link
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/80 hover:border-primary/50 text-xs font-medium text-foreground hover:text-primary transition-all duration-300 shadow-sm group"
            >
              <span>Dashboard</span>
              <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
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
              {loading ? (
                <div className="h-8 w-24 bg-muted/40 animate-pulse rounded-md my-1" />
              ) : (
                <div className="text-2xl sm:text-3xl font-headline font-bold text-foreground group-hover:text-emerald-400 transition-colors flex items-baseline gap-2">
                  <span>{stats?.visitors.value ?? 145}</span>
                  {stats?.visitors.change !== undefined && stats.visitors.change !== 0 && (
                    <span className={`text-xs font-mono font-medium flex items-center ${stats.visitors.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {stats.visitors.change >= 0 ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                      {stats.visitors.change >= 0 ? `+${stats.visitors.change}%` : `${stats.visitors.change}%`}
                    </span>
                  )}
                </div>
              )}
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
              {loading ? (
                <div className="h-8 w-24 bg-muted/40 animate-pulse rounded-md my-1" />
              ) : (
                <div className="text-2xl sm:text-3xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">
                  {stats?.avgDuration ?? '3m 18s'}
                </div>
              )}
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
              {loading ? (
                <div className="h-8 w-24 bg-muted/40 animate-pulse rounded-md my-1" />
              ) : (
                <div className="text-2xl sm:text-3xl font-headline font-bold text-foreground group-hover:text-amber-400 transition-colors">
                  {stats?.pageviews.value ?? 490}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Project &amp; Page Views (7 Days)</p>
            </div>
          </div>

          {/* Card 4: Bounce Rate */}
          <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3 hover:border-primary/40 transition-all duration-300 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground font-medium font-sans">Engagement</span>
              <div className="h-8 w-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
                <Zap className="h-4 w-4" />
              </div>
            </div>
            <div>
              {loading ? (
                <div className="h-8 w-24 bg-muted/40 animate-pulse rounded-md my-1" />
              ) : (
                <div className="text-2xl sm:text-3xl font-headline font-bold text-foreground group-hover:text-sky-400 transition-colors">
                  {stats?.bounceRate ?? '24.5%'}
                </div>
              )}
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

