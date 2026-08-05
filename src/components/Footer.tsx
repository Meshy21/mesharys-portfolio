import Link from 'next/link';
import { Github, Linkedin, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full relative">
      {/* Copper gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 py-8 px-4 md:px-6">
        <p className="text-xs text-muted-foreground text-center sm:text-left">
          Designed &amp; Engineered by{' '}
          <span className="text-foreground font-medium">Meshary A. Aquino</span>
          {' · '}
          &copy; {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-4">
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
    </footer>
  );
}
