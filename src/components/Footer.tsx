import Link from 'next/link';
import { Github, Linkedin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/80 bg-muted/20">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 py-8 px-4 md:px-6">
        <p className="text-xs text-muted-foreground text-center sm:text-left">
          &copy; {new Date().getFullYear()} Meshary A. Aquino. All rights reserved.
        </p>

        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
            <Link href="https://github.com/Meshy21" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <Github className="h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
            <Link href="https://www.linkedin.com/in/mesharyaquino" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <Linkedin className="h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
            <Link href="https://drive.google.com/file/d/1zgdQHeFZdbjkyfwAABfBjPgmxIqlUWqo/view?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="Resume Google Drive">
              <FileText className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
