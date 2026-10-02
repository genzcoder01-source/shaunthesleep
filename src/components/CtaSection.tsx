import React from 'react';
import { Gamepad2, Sparkles } from 'lucide-react';
import { SunburstRays, DoodleSpiral, DoodleStar, DoodleHeart } from './DoodleMarks';
import { sound } from '../utils/audio';

interface CtaSectionProps {
  onPlayGameClick: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onPlayGameClick }) => {
  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50 via-[#68beff] to-[#42a3ff] overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Fluffy Background Clouds */}
      <div className="absolute top-10 left-1/4 w-80 h-36 bg-white/70 rounded-full blur-xl pointer-events-none animate-float-1" />
      <div className="absolute top-20 right-1/4 w-96 h-40 bg-white/70 rounded-full blur-xl pointer-events-none animate-float-2" />

      {/* Decorative Marks */}
      <div className="absolute top-12 left-12 pointer-events-none">
        <DoodleSpiral size={56} color="#ffd43b" />
      </div>
      <div className="absolute bottom-16 right-16 pointer-events-none">
        <DoodleStar size={50} color="#ffffff" />
      </div>
      <div className="absolute top-1/2 left-8 pointer-events-none">
        <DoodleHeart size={44} color="#ffd5df" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Playful Top Pill */}
        <div className="relative inline-flex items-center mb-4">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2">
            <SunburstRays size={28} color="#ffd43b" direction="left" />
          </div>
          <div className="px-6 py-2 rounded-full bg-white text-slate-950 font-cartoon font-extrabold text-sm sm:text-base shadow-sm">
            ✨ DON'T MISS THE FUN!
          </div>
          <div className="absolute -right-6 top-1/2 -translate-y-1/2">
            <SunburstRays size={28} color="#ffd43b" direction="right" />
          </div>
        </div>

        {/* Big Heading */}
        <h2 className="font-cartoon text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-tight max-w-3xl">
          Ready for another adventure?
        </h2>

        <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-800 max-w-xl font-medium">
          Grab your woolly boots, round up the flock, and leap right back into the sky!
        </p>

        {/* Large Yellow Play Game Button with Sunburst Rays */}
        <div className="relative inline-flex items-center mt-8 sm:mt-10">
          <div className="absolute -left-8 sm:-left-10 top-1/2 -translate-y-1/2">
            <SunburstRays size={36} color="#ffd43b" direction="left" />
          </div>
          <div className="absolute -right-8 sm:-right-10 top-1/2 -translate-y-1/2">
            <SunburstRays size={36} color="#ffd43b" direction="right" />
          </div>

          <button
            onClick={() => {
              sound.playFanfare();
              onPlayGameClick();
            }}
            className="clay-button inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-[#ffd43b] hover:bg-[#ffcd1a] text-slate-950 font-cartoon font-black text-xl sm:text-2xl lg:text-3xl shadow-xl border-3 border-amber-300 cursor-pointer active:scale-95"
          >
            <Gamepad2 className="w-7 h-7 sm:w-8 sm:h-8 fill-slate-950 stroke-none" />
            <span>Play Game</span>
          </button>
        </div>

        {/* Secondary back to top link */}
        <button
          onClick={() => {
            sound.playPop(500);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mt-6 text-sm font-cartoon font-bold text-slate-900 hover:text-slate-950 underline underline-offset-4 cursor-pointer"
        >
          Or scroll back up to wake Shaun 🐑 ⬆
        </button>
      </div>
    </section>
  );
};
