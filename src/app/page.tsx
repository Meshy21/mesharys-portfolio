import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import AnalyticsSection from '@/components/AnalyticsSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Projects />
        <Skills />
        <AnalyticsSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
