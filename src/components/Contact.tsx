'use client';

import { Mail, MapPin, Phone, Linkedin, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto flex justify-center px-4 md:px-6">
        <div className="w-full max-w-xl space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Contact Me</h2>
            <p className="text-muted-foreground">
              Feel free to reach out. I'm open to discussing new projects and opportunities.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
            <MapPin className="h-6 w-6 text-accent" />
            {/* Change the text inside this span */}
            <span className="font-medium">Makati City, Metro Manila, Philippines</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Mail className="h-6 w-6 text-accent" />
              <a href="mailto:meshary.aquino21@gmail.com" className="font-medium hover:underline">
                meshary.aquino21@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Linkedin className="h-6 w-6 text-accent" />
              <Link href="https://www.linkedin.com/in/mesharyaquino" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                linkedin.com/in/mesharyaquino
              </Link>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Phone className="h-6 w-6 text-accent" />
              <span className="font-medium">+63 995 480 6524</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <FileText className="h-6 w-6 text-accent" />
              <Link href="https://drive.google.com/file/d/1T3ZLckN9Y5X4B3OH9NnW5XwPFQl-BjGm/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                Meshary's CV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
