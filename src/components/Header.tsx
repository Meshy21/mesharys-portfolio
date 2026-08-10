'use client';

import Link from 'next/link';
import { Menu, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Activity', href: '#activity' },
  { name: 'Analytics', href: '#analytics' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-background/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-6xl">
        <Link
          href="/"
          className="flex items-center gap-1.5 group"
        >
          <span className="font-code text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
            meshary
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="font-headline text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
            dev
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}

          {/* Glossy Copper Resume Button */}
          <Link
            href="https://drive.google.com/file/d/1zgdQHeFZdbjkyfwAABfBjPgmxIqlUWqo/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-4 py-2 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-primary/20 hover:scale-105"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Resume</span>
          </Link>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-border w-72">
              <div className="flex flex-col space-y-6 pt-8">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-1.5 mb-4">
                    <span className="font-code text-base font-bold text-foreground">meshary</span>
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-headline text-base font-semibold text-muted-foreground">dev</span>
                  </Link>
                </SheetClose>
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base font-medium text-muted-foreground hover:text-primary transition-colors pl-2 border-l-2 border-transparent hover:border-primary"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="https://drive.google.com/file/d/1zgdQHeFZdbjkyfwAABfBjPgmxIqlUWqo/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm font-mono font-semibold px-4 py-2.5 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all text-center mt-4"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Resume</span>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
