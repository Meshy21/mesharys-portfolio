'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/projects';

const categories = ['All', 'Web App', 'API', 'Mobile App', 'Desktop App', 'AI', 'IoT'];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.tags.includes(selectedCategory));

  return (
    <section id="projects" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-md border border-primary/20">
            Engineering Showcase
          </div>
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Featured Systems & Projects
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Engineered systems across distributed conflict-resolution APIs, edge computer vision models, cross-platform mobile apps, and enterprise administrative platforms.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`text-xs font-medium ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-background hover:bg-muted text-muted-foreground'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Unified Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col bg-card rounded-xl border border-border/80 overflow-hidden shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted/40 border-b border-border/60">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={project.imageHint}
                />
              </div>

              <div className="flex flex-col flex-1 p-5 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 bg-muted text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="font-headline font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {project.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
