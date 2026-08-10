'use client';

import { useEffect, useState } from 'react';
import { GitCommit, Flame, GitBranch, ExternalLink, Calendar, Sparkles, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { GitHubActivityData, ContributionDay } from '@/app/api/github-activity/route';

export default function GithubActivity() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);
  const [data, setData] = useState<GitHubActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch('/api/github-activity');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load GitHub activity data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, []);

  // Organize 365 days into 52/53 columns of 7 days each (Sun - Sat)
  const columns: ContributionDay[][] = [];
  if (data?.contributions) {
    let currentWeek: ContributionDay[] = [];
    data.contributions.forEach((day, idx) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || idx === data.contributions.length - 1) {
        columns.push(currentWeek);
        currentWeek = [];
      }
    });
  }

  // Helper for color levels
  const getLevelBg = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-900/60 border-emerald-700/50 hover:bg-emerald-800';
      case 2:
        return 'bg-emerald-600/80 border-emerald-500 hover:bg-emerald-500 shadow-sm shadow-emerald-950';
      case 3:
        return 'bg-emerald-500 border-emerald-400 hover:bg-emerald-400 shadow-sm shadow-emerald-500/30';
      case 4:
        return 'bg-emerald-400 border-emerald-200 hover:bg-emerald-300 shadow-md shadow-emerald-400/40 ring-1 ring-emerald-300';
      default:
        return 'bg-secondary/40 border-border/40 hover:border-primary/40';
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <section id="activity" ref={sectionRef} className="reveal w-full py-12 sm:py-16 md:py-20 relative">
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              <GitCommit className="h-3.5 w-3.5 text-emerald-400" />
              <span>{'// Live GitHub Activity & Pushes'}</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Code Contributions &amp; Activity Matrix
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Real-time snapshot of daily commits, repository pushes, and open-source contributions across public repositories.
            </p>
          </div>

          <Link
            href="https://github.com/Meshy21"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border/80 text-xs font-mono font-semibold text-foreground hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-300 shadow-sm shrink-0 w-fit"
          >
            <GitBranch className="h-4 w-4 text-emerald-400" />
            <span>@Meshy21 on GitHub</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Total Contributions */}
          <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-2 hover:border-emerald-500/40 transition-all duration-300 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground font-medium">Past 365 Days</span>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <GitCommit className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-headline font-bold text-foreground group-hover:text-emerald-400 transition-colors">
              {loading ? '...' : (data?.stats.totalContributions ?? 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total Commits &amp; Pull Requests</p>
          </div>

          {/* Card 2: Current Streak */}
          <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-2 hover:border-emerald-500/40 transition-all duration-300 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground font-medium">Active Streak</span>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Flame className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-headline font-bold text-foreground group-hover:text-amber-400 transition-colors flex items-center gap-2">
              {loading ? '...' : `${data?.stats.currentStreak ?? 0} Days`}
            </div>
            <p className="text-xs text-muted-foreground">Continuous Active Days</p>
          </div>

          {/* Card 3: Longest Streak */}
          <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-2 hover:border-emerald-500/40 transition-all duration-300 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground font-medium">Best Streak</span>
              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">
              {loading ? '...' : `${data?.stats.longestStreak ?? 0} Days`}
            </div>
            <p className="text-xs text-muted-foreground">All-Time Longest Commit Streak</p>
          </div>

          {/* Card 4: Public Repos */}
          <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-2 hover:border-emerald-500/40 transition-all duration-300 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground font-medium">Public Repos</span>
              <div className="h-8 w-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <GitBranch className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-headline font-bold text-foreground group-hover:text-sky-400 transition-colors">
              {loading ? '...' : (data?.user.publicRepos ?? 0)}
            </div>
            <p className="text-xs text-muted-foreground">Active Public Repositories</p>
          </div>
        </div>

        {/* Matrix Card Container */}
        <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-7 shadow-xl relative overflow-hidden mb-8">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-400" />
              <h3 className="font-headline font-bold text-base sm:text-lg text-foreground">
                365-Day Contribution Calendar
              </h3>
            </div>
            
            {/* Legend */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1 items-center">
                <span className="h-3 w-3 rounded-xs bg-secondary/40 border border-border/40" />
                <span className="h-3 w-3 rounded-xs bg-emerald-900/60 border border-emerald-700/50" />
                <span className="h-3 w-3 rounded-xs bg-emerald-600/80 border border-emerald-500" />
                <span className="h-3 w-3 rounded-xs bg-emerald-500 border border-emerald-400" />
                <span className="h-3 w-3 rounded-xs bg-emerald-400 border border-emerald-200" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Matrix Scroll Area */}
          {loading ? (
            <div className="h-36 w-full flex items-center justify-center text-muted-foreground gap-2 font-mono text-xs">
              <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
              <span>Fetching GitHub commit history...</span>
            </div>
          ) : (
            <div className="overflow-x-auto pb-2 scrollbar-thin">
              <div className="min-w-[720px]">
                {/* Month labels */}
                <div className="flex text-[10px] font-mono text-muted-foreground mb-2 pl-6 justify-between pr-2">
                  {months.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>

                <div className="flex gap-1.5">
                  {/* Day of Week Labels */}
                  <div className="flex flex-col justify-between text-[9px] font-mono text-muted-foreground pr-1 select-none py-0.5">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>

                  {/* Columns of 7 days */}
                  <div className="flex flex-1 gap-1">
                    {columns.map((col, cIdx) => (
                      <div key={cIdx} className="flex flex-col gap-1">
                        {col.map((day, dIdx) => (
                          <div
                            key={`${day.date}-${dIdx}`}
                            onMouseEnter={(e) => {
                              setHoveredDay(day);
                              const rect = e.currentTarget.getBoundingClientRect();
                              setMousePos({ x: rect.left + rect.width / 2, y: rect.top - 10 });
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`h-3 w-3 rounded-xs transition-all duration-200 cursor-pointer ${getLevelBg(
                              day.level
                            )} hover:scale-125 hover:z-10`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tooltip on hover */}
          {hoveredDay && (
            <div
              style={{
                position: 'fixed',
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
                transform: 'translate(-50%, -100%)',
              }}
              className="z-50 pointer-events-none bg-popover/95 backdrop-blur-md border border-border text-foreground text-xs font-mono py-1.5 px-3 rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap"
            >
              <div className="font-semibold text-emerald-400">
                {hoveredDay.count === 0
                  ? 'No contributions'
                  : `${hoveredDay.count} contribution${hoveredDay.count > 1 ? 's' : ''}`}
              </div>
              <div className="text-[10px] text-muted-foreground">{hoveredDay.date}</div>
            </div>
          )}
        </div>

        {/* Recent Repository Pushes Section */}
        {data?.recentPushes && data.recentPushes.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-lg text-foreground flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-emerald-400" />
              <span>Recent Commit Activity Across Repos</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.recentPushes.map((push) => (
                <Link
                  key={push.id}
                  href={push.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border/60 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-emerald-500/40 transition-all duration-300 shadow-sm group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 font-semibold">
                      <GitCommit className="h-3.5 w-3.5" />
                      <span>{push.repo}</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {new Date(push.date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/90 font-mono line-clamp-2 leading-relaxed group-hover:text-emerald-300 transition-colors">
                    {push.message}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
