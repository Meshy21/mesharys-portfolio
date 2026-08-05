'use client';

import { Mail, MapPin, Phone, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface ContactLink {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

const contactLinks: ContactLink[] = [
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
    <section id="contact" ref={sectionRef} className="reveal w-full py-20 md:py-32 relative">
      {/* Top edge line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center space-y-6 mb-16">
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

        {/* Location badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-card border border-border/60">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Makati City, Metro Manila</span>
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
