import React from 'react';
import { ArrowUp, Heart, Youtube, Instagram, Twitter, Music } from 'lucide-react';
import { sound } from '../utils/audio';

interface FooterProps {
  onOpenContact: () => void;
  onPlayGameClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onPlayGameClick }) => {
  const scrollToTop = () => {
    sound.playPop(520);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Game', action: onPlayGameClick },
    { label: 'Characters', href: '#characters' },
    { label: 'About', href: '#about' },
    { label: 'Contact', action: onOpenContact },
  ];

  return (
    <footer className="relative bg-[#338be6] text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-t-4 border-white/30">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          className="mb-8 group"
          aria-label="Shaun the Sleep Home"
        >
          <img
            src="https://res.cloudinary.com/s8kgvkbx/image/upload/v1790938876/Shaun_the_Sleep_Logo.png?utm_source=chatgpt.com"
            alt="Shaun the Sleep"
            referrerPolicy="no-referrer"
            className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-lg"
          />
        </a>

        {/* Center Nav Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                sound.playPop(460);
                if (item.action) {
                  item.action();
                } else if (item.href) {
                  const el = document.querySelector(item.href);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="font-cartoon text-lg sm:text-xl font-bold text-white hover:text-amber-300 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mb-8">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/15 hover:bg-white hover:text-red-600 transition-all duration-150 cursor-pointer"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/15 hover:bg-white hover:text-pink-600 transition-all duration-150 cursor-pointer"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/15 hover:bg-white hover:text-sky-500 transition-all duration-150 cursor-pointer"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/15 hover:bg-white hover:text-slate-950 transition-all duration-150 cursor-pointer"
            aria-label="TikTok"
          >
            <Music className="w-5 h-5" />
          </a>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="clay-button mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-950 font-cartoon font-bold text-sm backdrop-blur-xs border border-white/40 cursor-pointer transition-all"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Back to Top of Sky</span>
        </button>

        {/* Copyright & Disclaimer */}
        <div className="text-center text-xs text-sky-100/90 flex flex-col items-center gap-1.5 font-medium border-t border-white/20 pt-6 w-full">
          <p className="flex items-center gap-1">
            Inspired by beloved stop-motion art. Made with <Heart className="w-3.5 h-3.5 fill-rose-400 stroke-none inline" /> for woolly dreamers.
          </p>
          <p>© {new Date().getFullYear()} Shaun the Sleep. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
