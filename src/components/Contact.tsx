'use client';

import { Mail, MapPin, Phone, Linkedin, FileText, Github } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  return (
    <section id="contact" className="w-full py-16 md:py-24 bg-card border-t border-border/80">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-md border border-primary/20">
            Direct Contact & Profiles
          </div>
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Reach out directly for software engineering inquiries, project discussions, or technical collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center p-5 rounded-xl bg-muted/30 border border-border/60">
            <MapPin className="h-5 w-5 text-primary mb-2" />
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Location</span>
            <span className="text-xs font-medium text-foreground">Makati City, Metro Manila</span>
          </div>

          <a 
            href="mailto:meshary.aquino21@gmail.com" 
            className="flex flex-col items-center text-center p-5 rounded-xl bg-muted/30 border border-border/60 hover:border-primary/50 transition-colors group"
          >
            <Mail className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Email</span>
            <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
              meshary.aquino21@gmail.com
            </span>
          </a>

          <div className="flex flex-col items-center text-center p-5 rounded-xl bg-muted/30 border border-border/60">
            <Phone className="h-5 w-5 text-primary mb-2" />
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Phone</span>
            <span className="text-xs font-medium text-foreground">+63 995 480 6524</span>
          </div>

          <Link 
            href="https://www.linkedin.com/in/mesharyaquino" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center p-5 rounded-xl bg-muted/30 border border-border/60 hover:border-primary/50 transition-colors group"
          >
            <Linkedin className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">LinkedIn</span>
            <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
              in/mesharyaquino
            </span>
          </Link>

          <Link 
            href="https://github.com/Meshy21" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center p-5 rounded-xl bg-muted/30 border border-border/60 hover:border-primary/50 transition-colors group"
          >
            <Github className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">GitHub</span>
            <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
              github.com/Meshy21
            </span>
          </Link>

          <Link 
            href="https://drive.google.com/file/d/1zgdQHeFZdbjkyfwAABfBjPgmxIqlUWqo/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center p-5 rounded-xl bg-muted/30 border border-border/60 hover:border-primary/50 transition-colors group"
          >
            <FileText className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Resume</span>
            <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
              Google Drive CV
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
