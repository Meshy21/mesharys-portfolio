import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CodeXml, 
  Smartphone, 
  Cpu, 
  BrainCircuit, 
  Database, 
  GitBranch, 
  Server, 
  LayoutTemplate,
  Monitor,
  Workflow,
  Palette,
  Layers,
  Shield
} from 'lucide-react';

const skills = [
  { name: 'Core Languages', icon: <CodeXml className="h-10 w-10 text-accent" />, description: 'TypeScript, JavaScript, Python, Dart, PHP, C/C++' },
  { name: 'Frontend & Frameworks', icon: <LayoutTemplate className="h-10 w-10 text-accent" />, description: 'Next.js, Remix, React, Tailwind CSS, HTML/CSS' },
  { name: 'Mobile Development', icon: <Smartphone className="h-10 w-10 text-accent" />, description: 'Flutter, Dart, Cross-Platform Architecture, Mobile APIs' },
  { name: 'Databases & Backend', icon: <Database className="h-10 w-10 text-accent" />, description: 'PostgreSQL, Firebase, Supabase, SQL Schema Normalization' },
  { name: 'Edge AI & Computer Vision', icon: <BrainCircuit className="h-10 w-10 text-accent" />, description: 'TensorFlow Lite, YOLOv5/v8, ONNX Model Quantization, OCR Pipelines' },
  { name: 'IoT & Embedded Systems', icon: <Cpu className="h-10 w-10 text-accent" />, description: 'Raspberry Pi, Hardware Integration, Sensor Interfaces, Actuators' },
  { name: 'Desktop App Development', icon: <Monitor className="h-10 w-10 text-accent" />, description: 'Python Desktop Applications, PyQt/PySide GUI, Desktop Software Design' },
  { name: 'IT Operations & Systems', icon: <Server className="h-10 w-10 text-accent" />, description: 'Linux Administration, Server Maintenance, Network Configuration, Asset Tracking Systems' },
  { name: 'DevOps & Cloud Tooling', icon: <GitBranch className="h-10 w-10 text-accent" />, description: 'Git/GitHub, AWS (Basics), Vercel deployment, CI/CD environments' },
  { name: 'API Design & Integration', icon: <Workflow className="h-10 w-10 text-accent" />, description: 'RESTful API Design, WebSockets, Webhooks, Third-party SDKs, API Integration' },
  { name: 'UI/UX & Prototyping', icon: <Palette className="h-10 w-10 text-accent" />, description: 'Figma Prototyping, Component Design, Responsive Design, User Experience Optimization' },
  { name: 'System Architecture', icon: <Layers className="h-10 w-10 text-accent" />, description: 'SOLID Principles, Design Patterns, Microservices, High-Availability Systems' },
  { name: 'Security & Identity', icon: <Shield className="h-10 w-10 text-accent" />, description: 'OAuth 2.0, JWT Authentication, SSL/TLS Certificates, Secure Coding Best Practices' },
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
