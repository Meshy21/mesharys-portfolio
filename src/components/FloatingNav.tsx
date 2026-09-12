'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Home,
  FolderGit2,
  Briefcase,
  Cpu,
  GitCommit,
  Mail,
  Calendar,
  FileText,
} from 'lucide-react';
import ScheduleModal from '@/components/ScheduleModal';
import ResumeModal from '@/components/ResumeModal';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home', icon: Home },
  { id: 'projects', label: 'Projects', href: '#projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', href: '#experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', href: '#skills', icon: Cpu },
  { id: 'activity', label: 'Activity', href: '#activity', icon: GitCommit },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
];

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility based on scroll depth
      if (window.scrollY > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Detect current active section
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 z-40 transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-6 pointer-events-none scale-95'
      }`}
    >
      <nav
        aria-label="Floating mini navigation"
        className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-full bg-card/85 backdrop-blur-xl border border-primary/30 shadow-2xl shadow-background/80"
      >
        {/* Navigation Section Icons */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group relative flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
              aria-label={`Navigate to ${item.label}`}
            >
              <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform group-hover:scale-110" />

              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none px-2.5 py-1 rounded-md bg-card/95 border border-border/80 text-[11px] font-mono text-foreground font-semibold shadow-lg whitespace-nowrap z-50">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Divider line */}
        <div className="w-px h-5 bg-border/60 mx-0.5 sm:mx-1" />

        {/* Schedule Call Quick Action Button */}
        <ScheduleModal>
          <button
            type="button"
            className="group relative flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer"
            aria-label="Schedule a Meeting with Meshary"
          >
            <Calendar className="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform group-hover:scale-110" />

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none px-2.5 py-1 rounded-md bg-card/95 border border-primary/40 text-[11px] font-mono text-primary font-semibold shadow-lg whitespace-nowrap z-50">
              Schedule Call
            </span>
          </button>
        </ScheduleModal>

        {/* View Resume Quick Action Button */}
        <ResumeModal>
          <button
            type="button"
            className="group relative flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer"
            aria-label="View Resume PDF"
          >
            <FileText className="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform group-hover:scale-110" />

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none px-2.5 py-1 rounded-md bg-card/95 border border-border/80 text-[11px] font-mono text-foreground font-semibold shadow-lg whitespace-nowrap z-50">
              View Resume
            </span>
          </button>
        </ResumeModal>
      </nav>
    </div>
  );
}
