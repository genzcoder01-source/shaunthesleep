import React, { useState, useEffect } from 'react';
import { Gamepad2, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onPlayGameClick: () => void;
  onOpenContact: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onPlayGameClick,
  onOpenContact,
  activeSection = 'home',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.enabled = nextState;
    if (nextState) {
      sound.playPop(520);
    }
  };

  const navItems = [
    { label: 'home', href: '#hero' },
    { label: 'games', href: '#games' },
    { label: 'contact', action: onOpenContact },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    sound.playPop(440);
    setIsMobileMenuOpen(false);
    if (item.action) {
      item.action();
    } else if (item.href) {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-white/75 backdrop-blur-md shadow-sm border-b border-white/40'
          : 'py-4 md:py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Shaun the Sleep Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            sound.playPop(480);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl"
          aria-label="Shaun the Sleep Home"
        >
          <img
            src="https://res.cloudinary.com/s8kgvkbx/image/upload/v1790938876/Shaun_the_Sleep_Logo.png?utm_source=chatgpt.com"
            alt="Shaun the Sleep"
            referrerPolicy="no-referrer"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-md"
          />
        </a>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.label;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`relative py-1 font-cartoon text-lg lg:text-xl font-bold transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md ${
                  isActive ? 'text-slate-950 font-extrabold' : 'text-slate-800 hover:text-slate-950'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#ffd43b] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Audio Toggle & Play Game Button */}
        <div className="flex items-center gap-3">
          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            className="p-2 sm:p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-sm border border-white/60 hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
            aria-label={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
            title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            )}
          </button>

          {/* Yellow Play Game Button */}
          <button
            onClick={() => {
              sound.playPop(580);
              onPlayGameClick();
            }}
            className="clay-button inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#ffd43b] hover:bg-[#ffcd1a] text-slate-950 font-cartoon font-bold text-base sm:text-lg shadow-md hover:shadow-lg border-2 border-amber-300/60 cursor-pointer active:scale-95"
          >
            <Gamepad2 className="w-5 h-5 text-slate-950 fill-current" />
            <span className="whitespace-nowrap">Play Game</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => {
              sound.playPop(420);
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-xl bg-white/80 text-slate-800 hover:bg-white shadow-sm cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-amber-100 shadow-lg px-6 py-6 mt-2 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="text-left font-cartoon text-xl font-bold text-slate-900 hover:text-amber-600 py-1 transition-colors capitalize"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Flock Sound Effects</span>
            <button
              onClick={toggleSound}
              className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 font-cartoon text-sm font-bold flex items-center gap-1.5"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              {soundEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
