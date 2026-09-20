'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, FileText, Terminal, Cpu, Sparkles, Calendar, ExternalLink, Code2, FolderGit2 } from 'lucide-react';
import images from '@/app/lib/placeholder-images.json';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import ResumeModal from '@/components/ResumeModal';
import ScheduleModal from '@/components/ScheduleModal';

// Every item here is confirmable in one click — no self-reported counts.
const proofLinks = [
  {
    label: 'Live Demo',
    value: 'Payroll App',
    href: 'https://payroll-online-web.vercel.app/',
    icon: ExternalLink,
  },
  {
    label: 'Source Code',
    value: 'payroll-online-web',
    href: 'https://github.com/Meshy21/payroll-online-web',
    icon: Code2,
  },
  {
    label: 'GitHub',
    value: '@Meshy21',
    href: 'https://github.com/Meshy21',
    icon: FolderGit2,
  },
];

export default function Hero() {
  const sectionRef = useScrollReveal<HTMLElement>(0.05);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="reveal w-full relative overflow-hidden bg-grid-pattern py-12 sm:py-16 md:py-20 lg:py-24 border-b border-border/40"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Status & Tech Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-xs font-mono font-medium text-emerald-400 tracking-wide">
                  Available for Roles &amp; Projects
                </span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/80 border border-border/60 text-xs font-mono text-muted-foreground">
                <Terminal className="h-3.5 w-3.5 text-primary" />
                <span>Full-Stack &amp; Edge AI</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95]">
                <span className="text-foreground">Meshary</span>
                <br />
                <span className="text-gradient-copper drop-shadow-sm">A. Aquino</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-xl leading-relaxed">
                Computer Engineer specializing in{' '}
                <span className="text-foreground font-semibold border-b border-primary/40 pb-0.5">
                  conflict-resolution APIs
                </span>
                ,{' '}
                <span className="text-foreground font-semibold border-b border-primary/40 pb-0.5">
                  on-device neural networks
                </span>
                , and{' '}
                <span className="text-foreground font-semibold border-b border-primary/40 pb-0.5">
                  cross-platform mobile apps
                </span>
                .
              </p>
            </div>

            {/* EYE-CATCHING Action Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              <Link
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.97] touch-manipulation min-h-[44px]"
              >
                <span>Explore Work</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* EYE-CATCHING CALENDLY SCHEDULE BUTTON */}
              <ScheduleModal>
                <button
                  type="button"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-foreground bg-card border-2 border-primary/50 hover:border-primary transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.97] border-glow-copper overflow-hidden touch-manipulation min-h-[44px] cursor-pointer"
                >
                  <div className="absolute inset-0 shimmer opacity-50 pointer-events-none" />
                  <Calendar className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span>Schedule Call</span>
                </button>
              </ScheduleModal>

              {/* EYE-CATCHING RESUME POPUP BUTTON */}
              <ResumeModal>
                <button
                  type="button"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground bg-card/60 border border-border/80 hover:border-primary/50 transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.97] touch-manipulation min-h-[44px] cursor-pointer"
                >
                  <FileText className="h-4 w-4 text-primary group-hover:translate-y-0.5 transition-transform" />
                  <span>View Resume</span>
                </button>
              </ResumeModal>
            </div>


            {/* Verifiable proof links — each one opens the real thing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-6 max-w-lg">
              {proofLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 bg-card/70 border border-border/60 rounded-xl p-3 sm:p-3.5 backdrop-blur-sm hover:border-primary/50 hover:bg-card transition-all min-h-[44px] touch-manipulation"
                  >
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-wider block leading-tight">
                        {item.label}
                      </span>
                      <span className="font-headline text-sm font-bold text-foreground block truncate group-hover:text-primary transition-colors">
                        {item.value}
                      </span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Profile Image Column — High Impact Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative mt-8 lg:mt-0">
            <div className="relative">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/30 via-amber-500/20 to-primary/30 blur-2xl opacity-70 pointer-events-none" />

              {/* Floating Tech Badges */}
              <div className="absolute -top-5 left-0 sm:-top-6 sm:-left-6 z-20 animate-float">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-card/90 border border-primary/40 shadow-xl backdrop-blur-md text-[11px] sm:text-xs font-mono text-foreground">
                  <Cpu className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-primary" />
                  <span>Edge Vision AI</span>
                </div>
              </div>

              <div className="absolute -bottom-4 right-0 sm:-bottom-5 sm:-right-5 z-20 animate-float-reverse">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-card/90 border border-primary/40 shadow-xl backdrop-blur-md text-[11px] sm:text-xs font-mono text-foreground">
                  <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-amber-400" />
                  <span>Flutter &amp; FastAPI</span>
                </div>
              </div>

              {/* Photo Frame Container — Full photo, uncropped */}
              <div className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-[350px] lg:h-[420px] rounded-2xl overflow-hidden bg-card/90 border-2 border-primary/30 p-2 shadow-2xl backdrop-blur-sm flex items-center justify-center group hover:border-primary/60 transition-colors">
                <Image
                  alt="Meshary A. Aquino — Computer Engineer"
                  className="object-contain max-h-full max-w-full rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                  height={650}
                  src={images.heroProfile}
                  width={550}
                  priority
                  data-ai-hint="professional portrait"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
