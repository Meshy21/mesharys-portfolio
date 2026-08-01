import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import images from '@/app/lib/placeholder-images.json';

export default function Hero() {
  return (
    <section id="home" className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-b from-background via-muted/30 to-background border-b border-border/60">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-6 lg:col-span-7">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-md border border-primary/20 w-fit">
                Computer Engineer & Software Developer
              </div>
              
              <h1 className="font-headline text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-foreground">
                Meshary A. Aquino
              </h1>

              <p className="text-base sm:text-lg text-primary font-semibold font-headline">
                Backend API Architecture | Cross-Platform Mobile | Edge Computer Vision
              </p>

              <p className="max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed pt-2">
                Computer Engineer specializing in deterministic conflict-resolution backend APIs, on-device neural network computer vision models, Flutter mobile applications, and normalized relational database architecture.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                <Link href="#projects">
                  Explore Featured Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="border-border hover:bg-muted font-medium">
                <Link href="https://drive.google.com/file/d/1zgdQHeFZdbjkyfwAABfBjPgmxIqlUWqo/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4 text-primary" />
                  Download CV
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-square rounded-2xl overflow-hidden border-2 border-primary/20 bg-card shadow-lg">
              <Image
                alt="Meshary A. Aquino"
                className="object-cover object-center w-full h-full"
                height="500"
                src={images.heroProfile}
                width="500"
                priority
                data-ai-hint="professional portrait"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
