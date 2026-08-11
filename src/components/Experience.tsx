'use client';

import { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Sparkles, Building2 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Badge } from '@/components/ui/badge';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  tags: string[];
  bullets: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'abubakar-it-specialist',
    title: 'IT Specialist',
    company: 'M. Abubakar Construction and Engineering',
    location: 'Zamboanga City',
    period: 'June 2025 – June 2026',
    tags: ['Python', 'PyQt6', 'PostgreSQL', 'RBAC', 'Git', 'Database Schema'],
    bullets: [
      'Cut document and certificate reconciliation from three days to under four hours by designing a normalized PostgreSQL schema and building the tracking system that replaced a shared-spreadsheet process, with authentication and role-based access control across three user tiers.',
      'Removed 15+ hours of weekly manual data entry from a payroll cycle covering 50+ employees by building a payroll application end to end (Python, PyQt6), automating computation, statutory deductions and payslip generation.',
      'Shipped to production across two live systems with zero downtime by owning the full Git workflow — feature branching, code review and versioned releases.'
    ]
  },
  {
    id: 'freelance-software-engineer',
    title: 'Freelance Software Engineer',
    company: 'Part-time, Concurrent',
    location: 'Remote',
    period: 'September 2024 – Present',
    isCurrent: true,
    tags: ['Dart', 'Flutter', 'Firebase', 'WebRTC', 'YOLOv8', 'Python', 'TensorFlow Lite'],
    bullets: [
      'Delivered low-latency video and messaging for two user roles on LearnMate, a cross-platform tutoring app, by designing the Firebase data model, authentication and role-based access, and implementing WebRTC signalling. Dart, Flutter, Firebase.',
      'Achieved on-device inference for Wood Knot Detection as sole engineer, by training a YOLOv8 detector on a 12,000-image dataset and building the ONNX-to-TFLite pipeline. Python, TensorFlow Lite.'
    ]
  },
  {
    id: 'rtc9-intern',
    title: 'Software Developer Intern',
    company: 'Regional Trial Court, Region 9',
    location: 'Zamboanga City',
    period: 'August 2024 – April 2025',
    tags: ['Offline-First', 'Desktop Client', 'Bi-Directional Sync', 'Conflict Resolution', 'SQL'],
    bullets: [
      'Kept court operations running for 10+ daily staff through repeated network outages by building an offline-first desktop client with automated cloud synchronization.',
      'Reconciled 1,000+ legal records after outages with zero data loss by engineering bi-directional sync with conflict resolution between offline clients and the live database.'
    ]
  }
];

export default function Experience() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" ref={sectionRef} className="reveal w-full py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary font-semibold uppercase tracking-wider">
            <Briefcase className="h-3.5 w-3.5 text-primary" />
            <span>{'// Career Journey'}</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Work Experience
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
            Engineering impact, system design achievements, and enterprise software deployments across industry roles.
          </p>
        </div>

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                className={`group bg-card border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'border-primary/50 shadow-xl shadow-primary/5 bg-card/95'
                    : 'border-border/60 hover:border-primary/30 hover:shadow-md'
                }`}
              >
                {/* Clickable Header Card */}
                <button
                  onClick={() => toggleExpand(exp.id)}
                  className="w-full p-5 sm:p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-2xl"
                  aria-expanded={isExpanded}
                  aria-label={`Toggle details for ${exp.title} at ${exp.company}`}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-headline font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>

                      {exp.isCurrent && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-semibold text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Current Role
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1.5 text-foreground font-semibold">
                        <Building2 className="h-3.5 w-3.5 text-primary" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3 text-muted-foreground/70" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground font-mono text-[11px]">
                        <Calendar className="h-3 w-3 text-muted-foreground/70" />
                        {exp.period}
                      </span>
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] font-mono px-2 py-0.5 bg-secondary text-secondary-foreground border border-border/40"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Button Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-medium text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </div>
                </button>

                {/* Collapsible Accomplishments Body */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? 'max-h-[800px] opacity-100 border-t border-border/40 p-5 sm:p-6 bg-muted/20'
                      : 'max-h-0 opacity-0 overflow-hidden p-0 border-t-0'
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-primary block">
                      {'// Key Accomplishments & Metrics'}
                    </span>

                    <ul className="space-y-3">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                          <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
