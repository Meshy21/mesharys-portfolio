'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface SkillCategory {
  title: string;
  description: string;
  count: number;
  skills: { name: string; highlight?: boolean }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Core',
    description: 'Programming languages and query systems for backend services, database operations, and desktop software.',
    count: 7,
    skills: [
      { name: 'Python', highlight: true },
      { name: 'TypeScript', highlight: true },
      { name: 'Dart', highlight: true },
      { name: 'PHP', highlight: true },
      { name: 'SQL', highlight: true },
      { name: 'FastAPI' },
      { name: 'PyQt6' },
    ],
  },
  {
    title: 'Mobile & Frameworks',
    description: 'Cross-platform mobile application architecture, local caching engines, and real-time media feeds.',
    count: 5,
    skills: [
      { name: 'Flutter', highlight: true },
      { name: 'Dart' },
      { name: 'Offline-First Storage' },
      { name: 'WebRTC & Agora RTC' },
      { name: 'RESTful API Integration' },
    ],
  },
  {
    title: 'Edge AI & Vision',
    description: 'On-device neural network deployment, custom dataset training, OCR, and model quantization.',
    count: 6,
    skills: [
      { name: 'YOLOv8', highlight: true },
      { name: 'YOLOv5', highlight: true },
      { name: 'TensorFlow Lite', highlight: true },
      { name: 'ONNX', highlight: true },
      { name: 'OpenCV', highlight: true },
      { name: 'OCR Translation' },
    ],
  },
];

export default function Skills() {
  const sectionRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <section id="skills" ref={sectionRef} className="reveal w-full py-12 sm:py-16 md:py-20 relative">
      {/* Top edge line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="max-w-2xl mb-8 sm:mb-10 space-y-3">
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary">
            {'// Technical Matrix'}
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Core Stack
          </h2>
        </div>

        {/* Horizontal layout — category label left, skills right */}
        <div className="space-y-0">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-6 sm:py-8 ${
                idx !== skillCategories.length - 1 ? 'border-b border-border/40' : ''
              }`}
            >
              {/* Category info — left column */}
              <div className="md:col-span-4 space-y-2">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-headline font-bold text-xl text-foreground">
                    {category.title}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground">
                    ({category.count})
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Skills — right column */}
              <div className="md:col-span-8 flex flex-wrap items-start gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-300 ${
                      skill.highlight
                        ? 'bg-primary/10 text-primary border border-primary/25 border-glow-copper hover:bg-primary/15'
                        : 'bg-secondary text-secondary-foreground border border-border/40 hover:border-border'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
