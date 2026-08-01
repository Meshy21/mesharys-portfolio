import { Badge } from '@/components/ui/badge';

interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; highlight?: boolean }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Core Systems',
    description: 'Programming languages and query systems for backend services, database operations, and desktop software.',
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
    title: 'Mobile Development & Frameworks',
    description: 'Cross-platform mobile application architecture, local caching engines, and real-time media feeds.',
    skills: [
      { name: 'Flutter', highlight: true },
      { name: 'Dart' },
      { name: 'Offline-First Storage' },
      { name: 'WebRTC & Agora RTC' },
      { name: 'RESTful API Integration' },
    ],
  },
  {
    title: 'Edge AI & Computer Vision',
    description: 'On-device neural network deployment, custom dataset training, optical character recognition, and model quantization.',
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
  return (
    <section id="skills" className="w-full py-16 md:py-24 bg-muted/40 border-y border-border/60">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-md border border-primary/20">
            Technical Matrix
          </div>
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Core Technologies & Stacks
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Core technologies and frameworks used across backend conflict-resolution APIs, cross-platform mobile apps, edge computer vision pipelines, and database systems.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="flex flex-col bg-card rounded-xl border border-border/80 p-6 shadow-sm hover:border-primary/40 transition-colors"
            >
              <h3 className="font-headline font-bold text-lg text-foreground mb-2">
                {category.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                {category.description}
              </p>
              
              <div className="mt-auto flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant={skill.highlight ? 'default' : 'secondary'}
                    className={`text-xs px-3 py-1 font-medium ${
                      skill.highlight 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'bg-muted text-muted-foreground border border-border/60'
                    }`}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
