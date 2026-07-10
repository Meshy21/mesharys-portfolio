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
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4 md:px-6">
          <div className="mr-6 flex items-center space-x-2">
            <Link href="/" className="font-headline font-bold sm:inline-block">
              Meshary's Portfolio
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 pt-6">
                    <SheetClose asChild>
                        <Link href="/" className="mb-4">
                            <span className="font-headline font-bold text-lg">Meshary's Portfolio</span>
                        </Link>
                    </SheetClose>
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.name}>
                        <Link
                          href={link.href}
                          className="text-lg transition-colors hover:text-accent"
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
        </div>
      </header>
    </>
  );
}
