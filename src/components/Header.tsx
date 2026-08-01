'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-6xl">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-headline font-bold text-lg text-foreground tracking-tight hover:text-primary transition-colors">
            Meshary A. Aquino
          </Link>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 hidden sm:inline-block">
            Computer Engineer
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
            <Link href="https://drive.google.com/file/d/1zgdQHeFZdbjkyfwAABfBjPgmxIqlUWqo/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              CV
            </Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-5 pt-8">
                <SheetClose asChild>
                  <Link href="/" className="mb-2">
                    <span className="font-headline font-bold text-lg">Meshary A. Aquino</span>
                  </Link>
                </SheetClose>
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
