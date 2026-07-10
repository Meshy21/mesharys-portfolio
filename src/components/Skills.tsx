import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeXml, Smartphone, Cpu, BrainCircuit, Database, GitBranch, Server, LayoutTemplate } from 'lucide-react';

const skills = [
  { name: 'Core Languages', icon: <CodeXml className="h-10 w-10 text-accent" />, description: 'TypeScript, JavaScript, Python, Dart, PHP, C/C++' },
  { name: 'Frontend & Frameworks', icon: <LayoutTemplate className="h-10 w-10 text-accent" />, description: 'Next.js, React, Tailwind CSS, HTML/CSS' },
  { name: 'Mobile Development', icon: <Smartphone className="h-10 w-10 text-accent" />, description: 'Flutter, Dart, Cross-Platform Architecture' },
  { name: 'Databases & Backend', icon: <Database className="h-10 w-10 text-accent" />, description: 'PostgreSQL, Firebase, Supabase, SQL' },
  { name: 'AI & Machine Learning', icon: <BrainCircuit className="h-10 w-10 text-accent" />, description: 'TensorFlow Lite, YOLOv5/v8, Prompt Engineering' },
  { name: 'DevOps & Tooling', icon: <GitBranch className="h-10 w-10 text-accent" />, description: 'Git/GitHub, AWS (Basics), Vercel' },
];

export default function Skills() {
  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Technical Skills</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              I have a diverse skill set that spans across software and hardware, allowing me to build comprehensive solutions from the ground up.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <Card key={skill.name} className="flex flex-col text-center">
              <CardHeader className="flex flex-col items-center gap-4 pb-4">
                {skill.icon}
                <CardTitle className="font-headline">{skill.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
