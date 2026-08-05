'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/projects';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const categories = ['All', 'Web App', 'API', 'Mobile App', 'Desktop App', 'AI', 'IoT'];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const sectionRef = useScrollReveal<HTMLElement>(0.08);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.tags.includes(selectedCategory));

  return (
    <section id="projects" ref={sectionRef} className="reveal w-full py-20 md:py-32 relative">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-4">
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary">
            {'// Engineering Showcase'}
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Featured Work
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
            Systems built across distributed APIs, edge computer vision, cross-platform mobile, and enterprise platforms.
          </p>
        </div>

        {/* Category Filter — Toggle Bar */}
        <div className="flex flex-wrap gap-1.5 mb-12 p-1 bg-card/50 border border-border/60 rounded-full w-fit">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Staggered Projects Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group relative flex flex-col bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 ${
                index === 0 ? 'sm:col-span-2 lg:col-span-2 sm:row-span-1' : ''
              }`}
            >
              {/* Image container — full image, uncropped */}
              <div className="relative aspect-[16/9] overflow-hidden bg-background/60 border-b border-border/40 p-3 flex items-center justify-center">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  data-ai-hint={project.imageHint}
                />
              </div>

              <div className="flex flex-col flex-1 p-5 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px] px-2 py-0.5 bg-secondary text-secondary-foreground border-0 font-mono"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="font-headline font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                  {project.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-mono font-semibold text-primary">
                  <span>View details</span>
                  <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
