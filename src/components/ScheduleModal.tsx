'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar, ExternalLink, Loader2, Sparkles } from 'lucide-react';

interface ScheduleModalProps {
  children: React.ReactNode;
  calendlyUrl?: string;
}

export default function ScheduleModal({ children, calendlyUrl }: ScheduleModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const targetUrl =
    calendlyUrl ||
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    'https://calendly.com/meshary-aquino21/30min';


  // Embed params for Calendly
  const embedUrl = targetUrl.includes('?')
    ? `${targetUrl}&embed_domain=${typeof window !== 'undefined' ? window.location.hostname : ''}&embed_type=Inline`
    : `${targetUrl}?embed_domain=${typeof window !== 'undefined' ? window.location.hostname : ''}&embed_type=Inline`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-4xl w-[95vw] sm:w-[90vw] max-h-[92vh] h-[85vh] p-0 border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col rounded-2xl">
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-border/60 bg-card/80 gap-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-sm sm:text-base font-headline font-bold text-foreground leading-tight flex items-center gap-2">
                <span>Schedule a Meeting</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                  <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
                  Live Booking
                </span>
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground font-mono leading-tight">
                Pick a date &amp; time for a technical intro or collaboration call
              </DialogDescription>
            </div>
          </div>

          <div className="flex items-center gap-2 pr-8 sm:pr-6">
            {/* Open directly in standard Calendly tab */}
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border/80 hover:border-primary/40 text-muted-foreground hover:text-foreground text-xs font-mono font-medium transition-all shadow-sm"
              title="Open Calendly directly in a new browser tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Open in New Tab</span>
            </a>
          </div>
        </div>

        {/* Iframe Scheduling Container */}
        <div className="flex-1 w-full h-full bg-card/40 p-1 sm:p-2 flex items-center justify-center relative overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm">
              <Loader2 className="h-7 w-7 text-primary animate-spin" />
              <span className="text-xs font-mono text-muted-foreground">
                Loading Calendly Scheduler...
              </span>
            </div>
          )}

          <iframe
            src={embedUrl}
            className="w-full h-full rounded-xl border-0 bg-transparent"
            title="Schedule a Meeting with Meshary"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
