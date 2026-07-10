import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import images from '@/app/lib/placeholder-images.json';

export default function Hero() {
  return (
    <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <Image
            alt="Meshary A. Aquino"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-contain sm:w-full lg:order-last"
            height="600"
            src={images.heroProfile}
            width="600"
            data-ai-hint="professional portrait"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Meshary A. Aquino
              </h1>
              <p className="text-xl text-accent md:text-2xl font-medium">
                Computer Engineer | Mobile Developer | Embedded Systems Enthusiast
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                IT Specialist and Computer Engineer specializing in full-stack web and mobile development. Experienced in architecting robust database systems, developing cross-platform applications with Flutter, and automating complex workflows using Python and modern web frameworks.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="#contact">Get In Touch</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#projects">View My Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
