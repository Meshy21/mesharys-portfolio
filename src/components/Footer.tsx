import Link from 'next/link';
import { Github, Linkedin, FileText, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full relative">
      {/* Copper gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-24 sm:pb-24 px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Designed &amp; Engineered by{' '}
            <span className="text-foreground font-medium">Meshary A. Aquino</span>
            {' · '}
            &copy; {new Date().getFullYear()}
          </p>
          <Link
            href="https://github.com/Meshy21/mesharys-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-muted-foreground/70 hover:text-primary transition-colors duration-300"
          >
            {'// Site Source'}
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:pr-44">
          {/* Privacy Disclaimer Link */}
          <Link
            href="#analytics"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/80 border border-border/60 hover:border-primary/40 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-all duration-300 group"
            title="View Privacy & Analytics Disclaimer"
          >
            <ShieldCheck className="h-3 w-3 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Privacy First</span>
          </Link>

          <div className="flex items-center gap-3.5 border-l border-border/40 pl-3">
            <Link
              href="https://github.com/Meshy21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github className="h-4 w-4" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/mesharyaquino"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Linkedin className="h-4 w-4" />
            </Link>

            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume PDF Document"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <FileText className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
