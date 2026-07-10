'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/projects';

const categories = ['All', 'Web App', 'Mobile App', 'Desktop App', 'AI', 'IoT'];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.tags.includes(selectedCategory));

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">My Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Here are a few projects I've worked on. They showcase my ability to tackle problems across different domains, from hardware to mobile and web. Click on a project to learn more.
            </p>
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-4 my-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group block h-full">
              <Card className="flex flex-col h-full group-hover:border-accent group-hover:shadow-lg transform group-hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="mb-4 rounded-lg object-contain aspect-[3/2] bg-muted/50"
                    data-ai-hint={project.imageHint}
                  />
                  <CardTitle className="font-headline">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
