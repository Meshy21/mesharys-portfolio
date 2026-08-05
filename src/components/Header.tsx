'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
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
          <span className="font-code text-sm font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
            meshary
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="font-headline text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
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

          <Link
            href="https://drive.google.com/file/d/1zgdQHeFZdbjkyfwAABfBjPgmxIqlUWqo/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-semibold px-4 py-1.5 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-300"
          >
            Resume
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
                    className="text-sm font-mono font-semibold px-4 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all text-center mt-4"
                  >
                    Resume
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
