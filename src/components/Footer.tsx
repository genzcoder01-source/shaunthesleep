import React from 'react';
import { ArrowUp, Gamepad2, Heart, Mail } from 'lucide-react';
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

  return (
    <footer className="border-t border-sky-300 bg-[#b9ddff] px-4 py-5 text-slate-900 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-cartoon text-lg font-extrabold">Shaun the Sleep</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-700">
            Made with <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-600" /> for woolly dreamers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playPop(550);
              onPlayGameClick();
            }}
            className="rounded-full p-2.5 text-slate-800 transition-colors hover:bg-white/70"
            aria-label="Open game"
            title="Open game"
          >
            <Gamepad2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              sound.playPop(480);
              onOpenContact();
            }}
            className="rounded-full p-2.5 text-slate-800 transition-colors hover:bg-white/70"
            aria-label="Contact"
            title="Contact"
          >
            <Mail className="h-5 w-5" />
          </button>
          <button
            onClick={scrollToTop}
            className="rounded-full p-2.5 text-slate-800 transition-colors hover:bg-white/70"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>

        <p className="text-xs font-medium text-slate-700 sm:text-right">
          © {new Date().getFullYear()} Shaun the Sleep
        </p>
      </div>
    </footer>
  );
};
