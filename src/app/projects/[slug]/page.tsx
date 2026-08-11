'use client';

import { projects } from '@/lib/projects';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';

function getYouTubeEmbedUrl(url: string) {
  let videoId = '';
  try {
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v') || '';
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1]?.split('?')[0];
    }
  } catch (e) {
    console.error('Error parsing youtube url', e);
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export default function ProjectPage() {
  const params = useParams();
  const project = projects.find((p) => p.slug === params.slug);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!project) {
    notFound();
  }

  // Combine main image + gallery images for the hero slideshow
  const allImages = [
    { url: project.image, hint: project.imageHint },
    ...(project.gallery || []),
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, nextLightbox, prevLightbox]);

  return (
    <div className="bg-background min-h-screen overflow-x-hidden w-full max-w-full">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6 max-w-6xl">
          <Link
            href="/#projects"
            className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-medium">Back</span>
          </Link>
          <div className="ml-auto">
            <Link href="/" className="flex items-center gap-1.5">
              <span className="font-code text-sm font-bold text-foreground">meshary</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="font-headline text-sm font-semibold text-muted-foreground">dev</span>
            </Link>
          </div>
        </div>
      </header>

      {/* === GALLERY HERO — First thing visitors see === */}
      <section className="w-full bg-muted/20 border-b border-border/30">
        <div className="relative w-full" style={{ minHeight: '60vh', maxHeight: '80vh' }}>
          {/* Main slideshow image — full picture, no crop */}
          <div
            className="relative w-full h-[60vh] md:h-[70vh] max-h-[80vh] bg-background/50 flex items-center justify-center select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={allImages[currentSlide].url}
              alt={`${project.title} — ${allImages[currentSlide].hint || `Image ${currentSlide + 1}`}`}
              fill
              className="object-contain p-4 md:p-8"
              priority={currentSlide === 0}
              data-ai-hint={allImages[currentSlide].hint}
            />
          </div>

          {/* Navigation arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Slide indicators */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? 'w-6 bg-primary'
                      : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Gallery thumbnails strip */}
        {allImages.length > 1 && (
          <div className="container mx-auto max-w-6xl px-4 md:px-6 py-4">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar sm:scrollbar-thin overscroll-x-contain">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentSlide(idx);
                    openLightbox(idx);
                  }}
                  className={`relative shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                    idx === currentSlide
                      ? 'border-primary shadow-md shadow-primary/20'
                      : 'border-border/40 opacity-60 hover:opacity-100 hover:border-border'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-contain bg-muted/30 p-0.5"
                    data-ai-hint={img.hint}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* === PROJECT CONTENT === */}
      <main className="container mx-auto py-12 md:py-16 px-4 md:px-6 max-w-4xl">
        <article>
          {/* Title & Tags */}
          <div className="space-y-4 mb-10">
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-mono bg-secondary text-secondary-foreground border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-border/30 rounded-xl overflow-hidden border border-border/40 mb-12">
              {project.metrics.map((metric, i) => (
                <div key={i} className="bg-card p-5 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">
                    {metric.label}
                  </span>
                  <span className="text-xl font-headline font-bold text-primary block tracking-tight">
                    {metric.value}
                  </span>
                  {metric.description && (
                    <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
                      {metric.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* About, Challenges, Learnings */}
          <div className="space-y-10">
            <div>
              <h2 className="font-headline text-2xl font-bold tracking-tight mb-3 text-foreground flex items-center gap-3">
                <span className="h-5 w-1 bg-primary rounded-full" />
                About the Project
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">{project.longDescription}</p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold tracking-tight mb-3 text-foreground flex items-center gap-3">
                <span className="h-5 w-1 bg-primary rounded-full" />
                Challenges
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">{project.challenges}</p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold tracking-tight mb-3 text-foreground flex items-center gap-3">
                <span className="h-5 w-1 bg-primary rounded-full" />
                Learnings
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">{project.learnings}</p>
            </div>
          </div>

          {/* Timeline */}
          {project.timeline && project.timeline.length > 0 && (
            <div className="mt-16">
              <h2 className="font-headline text-2xl font-bold tracking-tight mb-10 text-foreground flex items-center gap-3">
                <span className="h-5 w-1 bg-primary rounded-full" />
                Development Journey
              </h2>
              <div className="relative border-l border-border/50 ml-3 space-y-10">
                {project.timeline.map((milestone, i) => (
                  <div key={i} className="relative pl-8 group">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 -translate-x-1/2 h-3 w-3 rounded-full border-2 border-primary bg-background group-hover:bg-primary/20 transition-colors" />

                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1.5">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {milestone.phase}
                      </span>
                      <span className="text-xs text-muted-foreground/60 font-mono">
                        {milestone.duration}
                      </span>
                    </div>

                    <h3 className="font-headline text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {milestone.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {project.videos && project.videos.length > 0 && (
            <div className="mt-16" id="project-videos">
              <h2 className="font-headline text-2xl font-bold tracking-tight mb-6 text-foreground flex items-center gap-3">
                <span className="h-5 w-1 bg-primary rounded-full" />
                Demo Videos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.videos.map((videoUrl, index) => {
                  const embedUrl = getYouTubeEmbedUrl(videoUrl);
                  if (!embedUrl) return null;
                  return (
                    <div key={index} className="flex flex-col space-y-2">
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm">
                        <iframe
                          src={embedUrl}
                          title={`${project.title} video demo ${index + 1}`}
                          className="absolute inset-0 h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                      <span className="text-xs text-muted-foreground text-center font-mono">
                        Demo {index + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action links */}
          <div className="flex flex-wrap gap-3 mt-16 pt-8 border-t border-border/30">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Projects
            </Link>

            <div className="flex-1" />

            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-all"
              >
                <Github className="h-4 w-4" />
                Source Code
              </Link>
            )}
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Link>
            )}
          </div>
        </article>
      </main>

      {/* === LIGHTBOX === */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-card/80 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Image — full view, no crop */}
          <div
            className="relative w-[90vw] h-[85vh] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[lightboxIndex].url}
              alt={`${project.title} — Full view ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Nav arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground bg-card/80 px-3 py-1.5 rounded-full border border-border/40">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
