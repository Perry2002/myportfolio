import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import About from './components/About';
import Formation from './components/Formation';
import Skills from './components/Skills';
// import Stats from './components/Stats';
import GitHubRepos from './components/GitHubRepos';
import ContactFooter from './components/ContactFooter';
import { Analytics } from "@vercel/analytics/react";

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('Home');

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sections = ['home', 'work', 'formation', 'skills', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const labelMap: Record<string, string> = {
              home: 'Home',
              work: 'Work',
              formation: 'Formation',
              skills: 'Skills',
              contact: 'Contact',
            };
            if (labelMap[id]) setActiveSection(labelMap[id]);
          }
        }
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    const id = section.toLowerCase();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <Analytics />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <ScrollProgressBar />
      <Navbar scrollY={scrollY} activeSection={activeSection} onNavClick={handleNavClick} />
      <Hero />
      <SelectedWorks />
      <About />
      <Formation />
      <Skills />
      {/* <Stats /> */}
      <GitHubRepos />
      <ContactFooter />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}