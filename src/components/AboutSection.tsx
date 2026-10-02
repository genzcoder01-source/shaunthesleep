import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Heart, Cloud, Plus } from 'lucide-react';
import { SunburstRays, DoodleSpiral, DoodleStar } from './DoodleMarks';
import { sound } from '../utils/audio';

export const AboutSection: React.FC = () => {
  const [sheepCounted, setSheepCounted] = useState(7);
  const [bonusFluff, setBonusFluff] = useState(false);

  const handleCountSheep = () => {
    const next = sheepCounted + 1;
    setSheepCounted(next);
    sound.playPop(350 + (next % 8) * 40);

    if (next % 5 === 0) {
      sound.playBaa();
      setBonusFluff(true);
      setTimeout(() => setBonusFluff(false), 800);
    }
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Decorative sky doodles */}
      <div className="absolute top-16 right-16 pointer-events-none opacity-40">
        <DoodleSpiral size={65} color="#ffd43b" />
      </div>
      <div className="absolute bottom-12 left-10 pointer-events-none opacity-40">
        <DoodleStar size={50} color="#b8a4f9" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main Grid: Story on left, interactive dream widget on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Story */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="relative inline-flex items-center mb-3">
              <div className="absolute -left-6 top-1/2 -translate-y-1/2">
                <SunburstRays size={28} color="#ffd43b" direction="left" />
              </div>
              <div className="px-5 py-1.5 rounded-full bg-[#ffd43b] text-slate-950 font-cartoon font-extrabold text-sm sm:text-base shadow-sm">
                OUR STORY
              </div>
            </div>

            <h2 className="font-cartoon text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Adventure Starts Here
            </h2>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              Welcome to the whimsical universe of <strong className="text-slate-900">Shaun the Sleep</strong>—where counting sheep isn’t about nodding off, but the launchpad for high-flying cloud jumps, farmyard capers, and non-stop giggles!
            </p>

            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Every detail is crafted with the handcrafted, tactile warmth of clay stop-motion animation. Whether you’re scrolling through the sky to wake Shaun or jumping through fluffy constellations in our mini-games, this playground is designed to spark pure wonder.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="w-10 h-10 rounded-xl bg-[#ffd43b] flex items-center justify-center text-slate-950 font-bold mb-2">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-cartoon text-lg font-bold text-slate-950">Stop-Motion Charm</h4>
                <p className="text-xs text-slate-600 mt-1">Authentic clay texture & handcrafted feel.</p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                <div className="w-10 h-10 rounded-xl bg-sky-300 flex items-center justify-center text-slate-950 font-bold mb-2">
                  <ShieldCheck className="w-5 h-5 text-slate-900" />
                </div>
                <h4 className="font-cartoon text-lg font-bold text-slate-950">100% Family Safe</h4>
                <p className="text-xs text-slate-600 mt-1">Zero ads, pure wholesome joyful play.</p>
              </div>

              <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200">
                <div className="w-10 h-10 rounded-xl bg-[#ffccd5] flex items-center justify-center text-slate-950 font-bold mb-2">
                  <Heart className="w-5 h-5 text-slate-900" />
                </div>
                <h4 className="font-cartoon text-lg font-bold text-slate-950">Scroll-Driven</h4>
                <p className="text-xs text-slate-600 mt-1">Interactive animation at your fingertip.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Sheep Counting Toy */}
          <div className="lg:col-span-5">
            <div className="clay-card bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 p-8 rounded-3xl border-4 border-white shadow-xl flex flex-col items-center text-center relative overflow-hidden">
              {/* Background Cloud */}
              <div className="absolute -top-10 -right-10 w-44 h-24 bg-white/60 rounded-full blur-sm" />
              <div className="absolute -bottom-8 -left-8 w-44 h-24 bg-white/60 rounded-full blur-sm" />

              <span className="text-5xl sm:text-6xl mb-3 animate-float-1 select-none">
                {bonusFluff ? '🎉🐑' : '☁️🐑'}
              </span>

              <h3 className="font-cartoon text-2xl sm:text-3xl font-black text-slate-950">
                The Bedtime Sheep Counter
              </h3>

              <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1 mb-5">
                Tap the button to leap another woolly friend across the starry fence!
              </p>

              {/* Big Counter Display */}
              <div className="bg-white/90 backdrop-blur-xs px-8 py-4 rounded-2xl shadow-inner border border-white mb-6">
                <span className="font-cartoon text-5xl sm:text-6xl font-black text-amber-500 tabular-nums">
                  {sheepCounted}
                </span>
                <p className="font-cartoon font-bold text-xs uppercase tracking-wider text-slate-600 mt-1">
                  Sheep Leaping High
                </p>
              </div>

              {/* Interactive Count Button */}
              <button
                onClick={handleCountSheep}
                className="clay-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#ffd43b] hover:bg-[#ffcd1a] text-slate-950 font-cartoon font-extrabold text-lg shadow-md border-2 border-amber-300 cursor-pointer active:scale-95"
              >
                <Plus className="w-5 h-5 stroke-[3]" />
                <span>Jump Another Sheep!</span>
              </button>

              <span className="text-[11px] text-slate-700 font-semibold mt-4">
                🐑 Tip: Every 5th sheep does a celebratory double bounce!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
