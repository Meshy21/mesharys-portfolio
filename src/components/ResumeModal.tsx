'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Download, ExternalLink, FileText, Monitor, Eye } from 'lucide-react';

interface ResumeModalProps {
  children: React.ReactNode;
}

export default function ResumeModal({ children }: ResumeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewerMode, setViewerMode] = useState<'native' | 'google'>('native');
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const googleViewerUrl = origin
    ? `https://docs.google.com/gview?url=${encodeURIComponent(origin + '/resume.pdf')}&embedded=true`
    : '';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="max-w-4xl w-[95vw] sm:w-[90vw] max-h-[92vh] h-[85vh] p-0 border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col rounded-2xl">
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-border/60 bg-card/80 gap-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-sm sm:text-base font-headline font-bold text-foreground leading-tight">
                Meshary A. Aquino — Resume
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground font-mono leading-tight">
                Computer Engineer &amp; Full-Stack Developer
              </DialogDescription>
            </div>
          </div>

          <div className="flex items-center gap-2 pr-8 sm:pr-6">
            {/* Viewer Mode Toggle */}
            <div className="hidden sm:flex items-center bg-muted/60 p-0.5 rounded-lg border border-border/50 text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewerMode('native')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  viewerMode === 'native'
                    ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Native PDF Viewer (API Stream)"
              >
                <Monitor className="h-3 w-3" />
                <span>Native</span>
              </button>
              <button
                type="button"
                onClick={() => setViewerMode('google')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  viewerMode === 'google'
                    ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Web View (Google Docs Viewer)"
              >
                <Eye className="h-3 w-3" />
                <span>Web View</span>
              </button>
            </div>

            {/* Direct Download Button */}
            <a
              href="/resume.pdf"
              download="Meshary_Aquino_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-mono font-semibold transition-all shadow-sm hover:shadow-primary/20"
              title="Download PDF to device"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* Open in Full New Tab */}
            <a
              href="/api/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border/80 hover:border-primary/40 text-muted-foreground hover:text-foreground text-xs font-mono font-medium transition-all"
              title="Open full PDF in new browser tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">New Tab</span>
            </a>
          </div>
        </div>

        {/* Modal PDF Viewer Container */}
        <div className="flex-1 w-full h-full bg-neutral-950/60 p-2 sm:p-4 flex items-center justify-center relative">
          {viewerMode === 'google' && googleViewerUrl ? (
            <iframe
              src={googleViewerUrl}
              className="w-full h-full rounded-xl border border-border/40 shadow-inner bg-card"
              title="Meshary Aquino Resume PDF (Web View)"
            />
          ) : (
            <iframe
              src="/api/resume#toolbar=1&navpanes=0"
              className="w-full h-full rounded-xl border border-border/40 shadow-inner bg-card"
              title="Meshary Aquino Resume PDF (Native)"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
