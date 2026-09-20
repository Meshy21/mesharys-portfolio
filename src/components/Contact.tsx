'use client';

import { Mail, MapPin, Phone, Linkedin, Github, FileText, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import ResumeModal from '@/components/ResumeModal';
import ScheduleModal from '@/components/ScheduleModal';

interface ContactLink {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

const contactLinks: ContactLink[] = [
  {
    icon: Calendar,
    label: 'Meeting',
    value: 'Schedule via Calendly',
    href: '#',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'meshary.aquino21@gmail.com',
    href: 'mailto:meshary.aquino21@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+63 995 480 6524',
    href: 'tel:+639954806524',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/mesharyaquino',
    href: 'https://www.linkedin.com/in/mesharyaquino',
    external: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Meshy21',
    href: 'https://github.com/Meshy21',
    external: true,
  },
  {
    icon: FileText,
    label: 'Resume',
    value: 'View PDF Resume',
    href: '/resume.pdf',
    external: true,
  },
];

function ContactRow({ link, isLast }: { link: ContactLink; isLast: boolean }) {
  const Icon = link.icon;
  const content = (
    <>
      <div className="flex items-center gap-4">
        <Icon className="h-[18px] w-[18px] text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {link.label}
        </span>
      </div>
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
        {link.value}
      </span>
    </>
  );

  const className = `group flex items-center justify-between py-5 transition-colors ${
    !isLast ? 'border-b border-border/30' : ''
  }`;

  if (link.label === 'Meeting') {
    return (
      <ScheduleModal>
        <button type="button" className={`w-full text-left cursor-pointer ${className}`}>
          {content}
        </button>
      </ScheduleModal>
    );
  }

  if (link.label === 'Resume') {
    return (
      <ResumeModal>
        <button type="button" className={`w-full text-left cursor-pointer ${className}`}>
          {content}
        </button>
      </ResumeModal>
    );
  }

  if (link.external) {
    return (
      <Link href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a href={link.href} className={className}>
      {content}
    </a>
  );
}

export default function Contact() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section id="contact" ref={sectionRef} className="reveal w-full py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Top edge line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center space-y-4 mb-8 sm:mb-10">
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary">
            {"// Let's Connect"}
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
            Open to software engineering roles, project collaborations, and technical discussions.
          </p>
        </div>

        {/* Schedule a Meeting Banner CTA */}
        <div className="max-w-lg mx-auto mb-8 p-6 rounded-2xl bg-gradient-to-b from-card to-card/60 border border-primary/30 shadow-xl backdrop-blur-md relative overflow-hidden text-center group hover:border-primary/60 transition-all duration-300">
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/10 rounded-full blur-xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-3">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>Fast &amp; Direct</span>
          </div>
          <h3 className="text-lg font-headline font-bold text-foreground mb-1">
            Want to schedule a quick meeting?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
            Select a slot on my Calendly for a 1-on-1 intro or technical discussion.
          </p>
          <ScheduleModal>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-md shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule Call with Meshary</span>
            </button>
          </ScheduleModal>
        </div>

        {/* Location badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-card border border-border/60">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Philippines &middot; Open to remote</span>
          </div>
        </div>

        {/* Contact links — clean horizontal rows */}
        <div className="max-w-lg mx-auto space-y-0">
          {contactLinks.map((link, idx) => (
            <ContactRow
              key={link.label}
              link={link}
              isLast={idx === contactLinks.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

