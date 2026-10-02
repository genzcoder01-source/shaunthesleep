import React, { useState } from 'react';
import { Gamepad2, Sparkles, Star, Users, Play, Trophy } from 'lucide-react';
import { SunburstRays, DoodleSpiral, DoodleStar } from './DoodleMarks';
import { sound } from '../utils/audio';

interface GameSectionProps {
  onPlayGameClick: () => void;
}

interface GameCard {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  players: string;
  rating: number;
  bgGradient: string;
  illustration: string;
  isPlayableNow: boolean;
}

export const GameSection: React.FC<GameSectionProps> = ({ onPlayGameClick }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'popular' | 'puzzle' | 'bedtime'>('all');

  const games: GameCard[] = [
    {
      id: 'cloud-jumper',
      title: "Shaun's Cloud Hop & Catch",
      badge: 'Playable Now!',
      badgeColor: 'bg-emerald-400 text-slate-950',
      description: 'Leap across fluffy bedtime clouds and catch falling golden stars and cozy pillows!',
      players: '1 Player · Arcade',
      rating: 4.9,
      bgGradient: 'from-amber-200 via-yellow-100 to-sky-100',
      illustration: '☁️⭐🐑',
      isPlayableNow: true,
    },
    {
      id: 'wooly-dash',
      title: "Bitzer's Barnyard Dash",
      badge: 'Action',
      badgeColor: 'bg-[#ffd43b] text-slate-950',
      description: 'Help Bitzer round up the mischievous flock before the Farmer wakes up from his afternoon snooze.',
      players: '1-2 Players · Runner',
      rating: 4.8,
      bgGradient: 'from-emerald-200 via-teal-100 to-sky-100',
      illustration: '🐶💨🐑',
      isPlayableNow: true,
    },
    {
      id: 'shirley-stack',
      title: "Shirley's Haystack Feast",
      badge: 'Physics Puzzle',
      badgeColor: 'bg-[#ffccd5] text-slate-950',
      description: 'Stack bales of hay and juicy apples to satisfy Shirley’s bottomless breakfast appetite.',
      players: '1 Player · Puzzle',
      rating: 4.7,
      bgGradient: 'from-pink-200 via-rose-100 to-amber-100',
      illustration: '🌾🍎🐑',
      isPlayableNow: true,
    },
    {
      id: 'sleepy-counting',
      title: 'Counting Sleepy Sheep',
      badge: 'Cozy Bedtime',
      badgeColor: 'bg-[#b8a4f9] text-white',
      description: 'A calming musical counting game where jumping over the fence brings sweet dreams and lullabies.',
      players: 'All Ages · Bedtime',
      rating: 5.0,
      bgGradient: 'from-indigo-200 via-purple-100 to-sky-100',
      illustration: '🌙✨💤',
      isPlayableNow: true,
    },
  ];

  const filteredGames = games.filter((game) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'popular') return game.rating >= 4.8;
    if (activeCategory === 'puzzle') return game.id.includes('stack') || game.id.includes('counting');
    if (activeCategory === 'bedtime') return game.id.includes('counting') || game.id.includes('jumper');
    return true;
  });

  return (
    <section id="games" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-sky-50 overflow-hidden">
      {/* Background clouds & decorations */}
      <div className="absolute top-10 left-8 pointer-events-none opacity-60">
        <DoodleSpiral size={60} color="#ffd43b" />
      </div>
      <div className="absolute top-20 right-12 pointer-events-none opacity-60">
        <DoodleStar size={54} color="#ffd43b" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center mb-12 sm:mb-16">
          <div className="relative inline-flex items-center mb-2">
            <div className="absolute -left-6 top-1/2 -translate-y-1/2">
              <SunburstRays size={28} color="#ffd43b" direction="left" />
            </div>
            <div className="px-5 py-1.5 rounded-full bg-[#ffd43b] text-slate-950 font-cartoon font-extrabold text-sm sm:text-base shadow-sm">
              MINI-GAMES & ARCADE
            </div>
            <div className="absolute -right-6 top-1/2 -translate-y-1/2">
              <SunburstRays size={28} color="#ffd43b" direction="right" />
            </div>
          </div>

          <h2 className="font-cartoon text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight">
            Ready to Play?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl font-medium">
            Jump into bite-sized barnyard adventures, bouncing cloud hops, and sheepish fun directly in your browser.
          </p>

          {/* Category Filter Pills (Functional Buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-slate-200">
            {(['all', 'popular', 'puzzle', 'bedtime'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playPop(480);
                  setActiveCategory(cat);
                }}
                className={`px-4 sm:px-6 py-2 rounded-full font-cartoon font-bold text-sm sm:text-base capitalize transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#ffd43b] text-slate-950 shadow-sm scale-105'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'All Games' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="clay-card relative bg-white border-2 border-slate-100 p-6 sm:p-8 flex flex-col justify-between overflow-hidden group"
            >
              {/* Top Row: Thumbnail Canvas & Badge */}
              <div>
                <div
                  className={`w-full h-44 sm:h-52 rounded-2xl bg-gradient-to-br ${game.bgGradient} flex flex-col items-center justify-center relative overflow-hidden border border-slate-100 shadow-inner group-hover:scale-[1.02] transition-transform duration-300`}
                >
                  {/* Floating particles */}
                  <div className="text-6xl sm:text-7xl select-none transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                    {game.illustration}
                  </div>

                  <span className={`absolute top-4 left-4 font-cartoon font-extrabold text-xs px-3 py-1 rounded-full shadow-sm ${game.badgeColor}`}>
                    {game.badge}
                  </span>

                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span>{game.rating}</span>
                  </div>
                </div>

                {/* Game Title & Description */}
                <h3 className="font-cartoon text-2xl sm:text-3xl font-extrabold text-slate-950 mt-5 group-hover:text-amber-600 transition-colors">
                  {game.title}
                </h3>
                <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {game.description}
                </p>
              </div>

              {/* Bottom Row: Metadata & Play Button */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{game.players}</span>
                </div>

                <button
                  onClick={() => {
                    sound.playPop(550);
                    onPlayGameClick();
                  }}
                  className="clay-button inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ffd43b] hover:bg-[#ffcd1a] text-slate-950 font-cartoon font-bold text-sm sm:text-base shadow-sm border border-amber-300 cursor-pointer active:scale-95"
                >
                  <Play className="w-4 h-4 fill-slate-950 stroke-none" />
                  <span>Play Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Trophy */}
        <div className="mt-12 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-amber-300 shadow-md">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl shrink-0">
              🏆
            </div>
            <div>
              <h4 className="font-cartoon text-xl sm:text-2xl font-black text-slate-950">
                Flock Champions Leaderboard
              </h4>
              <p className="text-slate-700 text-xs sm:text-sm font-medium">
                Collect sweet dream stars, beat your personal high score, and unlock fluffy bonuses!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playFanfare();
              onPlayGameClick();
            }}
            className="clay-button whitespace-nowrap px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-[#ffd43b] font-cartoon font-extrabold text-base shadow-md cursor-pointer"
          >
            Launch Game Room 🎮
          </button>
        </div>
      </div>
    </section>
  );
};
