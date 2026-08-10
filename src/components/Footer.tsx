import Link from 'next/link';
import { Github, Linkedin, FileText, BarChart3 } from 'lucide-react';

const shareUrl = process.env.NEXT_PUBLIC_UMAMI_SHARE_URL || 'https://cloud.umami.is/share/f54f12c9-a5ad-4282-a4d1-ad3621b88a8e';

export default function Footer() {
  return (
    <footer className="w-full relative">
      {/* Copper gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-20 sm:pb-12 px-4 md:px-6">
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

        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Live Open Analytics Button */}
          {shareUrl && (
            <Link
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/80 border border-border/60 hover:border-primary/40 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-all duration-300 group"
              title="View Live Open Visitor Analytics powered by Umami"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <BarChart3 className="h-3 w-3 text-primary group-hover:scale-110 transition-transform" />
              <span>Live Analytics</span>
            </Link>
          )}

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
              href="https://drive.google.com/file/d/1zgdQHeFZdbjkyfwAABfBjPgmxIqlUWqo/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume Google Drive"
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
