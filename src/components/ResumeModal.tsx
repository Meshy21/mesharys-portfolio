'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Download, ExternalLink, FileText } from 'lucide-react';

interface ResumeModalProps {
  children: React.ReactNode;
}

export default function ResumeModal({ children }: ResumeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="max-w-4xl w-[95vw] sm:w-[90vw] max-h-[92vh] h-[85vh] p-0 border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col rounded-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-border/60 bg-card/80">
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
              href="/resume.pdf"
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
          <object
            data="/resume.pdf"
            type="application/pdf"
            className="w-full h-full rounded-xl border border-border/40 shadow-inner bg-card"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-4 p-6 text-center">
              <FileText className="h-12 w-12 text-primary" />
              <p className="text-sm text-muted-foreground max-w-sm">
                Your browser doesn&apos;t support inline PDF preview. You can open or download the PDF directly below:
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open PDF in New Tab</span>
                </a>
                <a
                  href="/resume.pdf"
                  download="Meshary_Aquino_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-xs font-semibold text-foreground"
                >
                  <Download className="h-4 w-4 text-primary" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </object>
        </div>
      </DialogContent>
    </Dialog>
  );
}
