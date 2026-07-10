import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-secondary/50">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Meshary A. Aquino. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon">
                <Link href="https://github.com/Meshy21" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                    <Github className="h-5 w-5" />
                </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
                <Link href="https://www.linkedin.com/in/mesharyaquino/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                    <Linkedin className="h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </footer>
  );
}
