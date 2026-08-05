'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import images from '@/app/lib/placeholder-images.json';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const stats = [
  { value: '6', label: 'Projects' },
  { value: '3', label: 'AI Systems' },
  { value: '10K+', label: 'Training Images' },
];

export default function Hero() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="reveal w-full relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-72 h-72 bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-20 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Availability indicator */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-mono text-emerald-400/90 tracking-wide">
                Available for opportunities
              </span>
            </div>

            {/* Name — oversized with gradient */}
            <div className="space-y-4">
              <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95]">
                <span className="text-foreground">Meshary</span>
                <br />
                <span className="text-gradient-copper">A. Aquino</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-xl leading-relaxed">
                Computer Engineer specializing in{' '}
                <span className="text-foreground font-semibold">conflict-resolution APIs</span>,{' '}
                <span className="text-foreground font-semibold">on-device neural networks</span>,{' '}
                and{' '}
                <span className="text-foreground font-semibold">cross-platform mobile apps</span>.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                Explore Work
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="https://drive.google.com/file/d/1zgdQHeFZdbjkyfwAABfBjPgmxIqlUWqo/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border text-muted-foreground px-6 py-3 rounded-full text-sm font-medium hover:text-foreground hover:border-primary/40 transition-all duration-300"
              >
                <FileText className="h-4 w-4" />
                Download CV
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 pt-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div>
                    <span className="font-headline text-2xl font-bold text-foreground">{stat.value}</span>
                    <span className="block text-[11px] font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="h-8 w-px bg-border ml-3" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Profile image — full photo, uncropped */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative border ring */}
              <div className="absolute -inset-3 rounded-2xl border border-primary/15 pointer-events-none" />
              <div className="absolute -inset-1.5 rounded-xl bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-[340px] lg:h-[400px] rounded-xl overflow-hidden bg-card/90 border border-border/60 p-2 flex items-center justify-center">
                <Image
                  alt="Meshary A. Aquino"
                  className="object-contain max-h-full max-w-full rounded-lg"
                  height={600}
                  src={images.heroProfile}
                  width={500}
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
