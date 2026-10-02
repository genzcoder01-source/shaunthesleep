import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ScrollScene } from './components/ScrollScene';
import { GameSection } from './components/GameSection';
import { CharactersSection } from './components/CharactersSection';
import { AboutSection } from './components/AboutSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { MiniGameModal } from './components/MiniGameModal';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track active section for navbar highlight
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['hero', 'games', 'characters', 'about'];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id === 'hero' ? 'home' : id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#4ba3ff] flex flex-col selection:bg-amber-300 selection:text-slate-950">
      {/* Floating Navbar */}
      <Navbar
        onPlayGameClick={() => setIsGameModalOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Interactive Scroll Scene (Pinned GSAP Video Scrub Hero) */}
      <main className="flex-1">
        <ScrollScene onPlayGameClick={() => setIsGameModalOpen(true)} />

        {/* Section 1: Games */}
        <GameSection onPlayGameClick={() => setIsGameModalOpen(true)} />

        {/* Section 2: Characters */}
        <CharactersSection />

        {/* Section 3: About */}
        <AboutSection />

        {/* Section 4: Call to Action */}
        <CtaSection onPlayGameClick={() => setIsGameModalOpen(true)} />
      </main>

      {/* Section 5: Footer */}
      <Footer
        onOpenContact={() => setIsContactModalOpen(true)}
        onPlayGameClick={() => setIsGameModalOpen(true)}
      />

      {/* Interactive Mini Game Modal */}
      <MiniGameModal
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
      />

      {/* Interactive Contact Postcard Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
