import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CodeXml, 
  Smartphone, 
  Cpu, 
  BrainCircuit, 
  Database, 
  Server
} from 'lucide-react';

const skills = [
  { 
    name: 'Software & Web Architecture', 
    icon: <CodeXml className="h-10 w-10 text-accent" />, 
    description: 'Python, Dart, C/C++, C#, PHP, JavaScript, HTML5/CSS3, RESTful APIs, MVC Architecture, Bidirectional API Integration, Object-Oriented Programming (OOP).' 
  },
  { 
    name: 'AI, Computer Vision & Agentic Workflows', 
    icon: <BrainCircuit className="h-10 w-10 text-accent" />, 
    description: 'YOLOv8, YOLOv5, TensorFlow Lite, ONNX, OpenCV, Optical Character Recognition (OCR), AI-Assisted IDEs (Cursor), Large Language Models (Claude, Google Gemini), LLM Prompt Engineering, Custom Image Annotation.' 
  },
  { 
    name: 'Databases, Security & Cloud', 
    icon: <Database className="h-10 w-10 text-accent" />, 
    description: 'PostgreSQL, MySQL, MS SQL Server, Firebase, AWS, Relational Database Design, Role-Based Access Control (RBAC), Database Triggers & Audit Trails, ETL Data Automation.' 
  },
  { 
    name: 'Mobile & Frameworks', 
    icon: <Smartphone className="h-10 w-10 text-accent" />, 
    description: 'Flutter, Offline-First Architecture, Local Data Caching, WebRTC Integration, PyQt6, CMake, UI/UX Design Implementation.' 
  },
  { 
    name: 'Systems, Networking & IT Operations', 
    icon: <Server className="h-10 w-10 text-accent" />, 
    description: 'Git/GitHub, Windows/Linux Server Environments, Cisco Networking Fundamentals (TCP/IP, Routing/Switching), RAID 1 Mirroring & Storage Architectures, Advanced Motherboard Diagnostics, Technical IT Support, Enterprise SLA Management.' 
  },
  { 
    name: 'Hardware & Electronics', 
    icon: <Cpu className="h-10 w-10 text-accent" />, 
    description: 'Raspberry Pi, Arduino, Custom Circuit Design, Component-Level Troubleshooting, Soldering, Micro-hydro Systems, Microcontrollers.' 
  },
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
