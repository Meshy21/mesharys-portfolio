import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import GithubActivity from '@/components/GithubActivity';
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
        <Experience />
        <Skills />
        <GithubActivity />
        <AnalyticsSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

