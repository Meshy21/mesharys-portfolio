'use client';

import { projects } from '@/lib/projects';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

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

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4 md:px-6">
            <Button asChild variant="ghost" size="icon">
                <Link href="/#projects">
                    <ArrowLeft />
                    <span className="sr-only">Back to projects</span>
                </Link>
            </Button>
            <div className="ml-4 flex items-center space-x-2">
                <Link href="/" className="font-headline font-bold sm:inline-block">
                Meshary's Portfolio
                </Link>
            </div>
        </div>
      </header>
      <main className="container mx-auto py-12 px-4 md:px-6">
        <article className="mx-auto max-w-4xl">
          <div className="space-y-4 mb-8">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">{project.title}</h1>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
          
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={675}
            className="mb-8 rounded-lg object-contain w-full aspect-video bg-muted/50"
            data-ai-hint={project.imageHint}
          />
          
          <div className="space-y-8">
            <div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter mb-2">About the Project</h2>
                <p className="text-muted-foreground text-lg">{project.longDescription}</p>
            </div>
            
            <div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter mb-2">Challenges</h2>
                <p className="text-muted-foreground text-lg">{project.challenges}</p>
            </div>

            <div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter mb-2">Learnings</h2>
                <p className="text-muted-foreground text-lg">{project.learnings}</p>
            </div>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="font-headline text-3xl font-bold tracking-tighter mb-4">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((item, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div className="overflow-hidden rounded-lg cursor-pointer bg-muted/50">
                        <Image
                          src={item.url}
                          alt={`${project.title} gallery image ${index + 1}`}
                          width={800}
                          height={600}
                          className="rounded-lg object-contain aspect-[4/3] transition-transform duration-300 hover:scale-105"
                          data-ai-hint={item.hint}
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
                      <Image
                        src={item.url}
                        alt={`${project.title} gallery image ${index + 1}`}
                        width={1200}
                        height={900}
                        className="rounded-lg object-contain w-full h-auto"
                      />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          )}

          {project.videos && project.videos.length > 0 && (
            <div className="mt-12" id="project-videos">
              <h2 className="font-headline text-3xl font-bold tracking-tighter mb-4">Demo Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.videos.map((videoUrl, index) => {
                  const embedUrl = getYouTubeEmbedUrl(videoUrl);
                  if (!embedUrl) return null;
                  return (
                    <div key={index} className="flex flex-col space-y-2">
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/40 bg-muted/50 shadow-sm">
                        <iframe
                          src={embedUrl}
                          title={`${project.title} video demo ${index + 1}`}
                          className="absolute inset-0 h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                      <span className="text-sm text-muted-foreground text-center font-medium">Demo Video {index + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-12">
            {project.github && (
              <Button asChild variant="outline">
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2" />
                  View on GitHub
                </Link>
              </Button>
            )}
            {project.live && (
              <Button asChild>
                <Link href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2" />
                  Live Demo
                </Link>
              </Button>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
