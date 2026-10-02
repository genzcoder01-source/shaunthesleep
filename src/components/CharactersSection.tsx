import React, { useState } from 'react';
import { Volume2, Sparkles, Heart } from 'lucide-react';
import { SunburstRays, DoodleSpiral, DoodleHeart } from './DoodleMarks';
import { sound } from '../utils/audio';

interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string;
  avatarBg: string;
  tagColor: string;
  quote: string;
  description: string;
  soundType: 'baa' | 'whistle' | 'giggle' | 'snort' | 'yawn';
  soundFreq: number;
}

export const CharactersSection: React.FC = () => {
  const [lovedCharacters, setLovedCharacters] = useState<Record<string, number>>({});
  const [activeWobble, setActiveWobble] = useState<string | null>(null);

  const characters: Character[] = [
    {
      id: 'shaun',
      name: 'Shaun the Sleep',
      role: 'The Flock Leader & Mastermind',
      avatar: '🐑',
      avatarBg: 'bg-amber-100 border-amber-300',
      tagColor: 'bg-[#ffd43b] text-slate-950',
      quote: '“Why sleep when you can turn bedtime into an epic adventure?”',
      description: 'Clever, enthusiastic, and curious. Shaun leads the flock through wild escapades, solving every farm puzzle with cheeky ingenuity.',
      soundType: 'baa',
      soundFreq: 220,
    },
    {
      id: 'bitzer',
      name: 'Bitzer the Dog',
      role: 'Chief Farm Referee & Loyal Pal',
      avatar: '🐶',
      avatarBg: 'bg-sky-100 border-sky-300',
      tagColor: 'bg-sky-400 text-slate-950',
      quote: '“Just keep the flock in check before the Farmer checks his watch!”',
      description: 'With his trusty blue beanie and whistle, Bitzer tries his best to maintain order—though he usually joins Shaun’s fun in the end.',
      soundType: 'whistle',
      soundFreq: 640,
    },
    {
      id: 'shirley',
      name: 'Shirley the Sheep',
      role: 'The Giant Woolly Softie',
      avatar: '☁️🐑',
      avatarBg: 'bg-pink-100 border-pink-300',
      tagColor: 'bg-[#ffccd5] text-slate-950',
      quote: '“Is that an apple? Or an entire bale of sweet clover hay?”',
      description: 'The heavyweight member of the flock. Shirley is four times the size of any sheep and can be rolled, bounced, or used as a soft trampoline.',
      soundType: 'baa',
      soundFreq: 160,
    },
    {
      id: 'timmy',
      name: 'Timmy the Lamb',
      role: 'The Toddler Adventurer',
      avatar: '🧸',
      avatarBg: 'bg-purple-100 border-purple-300',
      tagColor: 'bg-[#b8a4f9] text-white',
      quote: '“Baaa-baaa! (Where did I leave my yellow teddy bear?)”',
      description: 'The baby of the flock. Timmy loves thumb-sucking, mischief, and getting into hilarious sticky situations only Shaun can rescue.',
      soundType: 'giggle',
      soundFreq: 580,
    },
    {
      id: 'pigs',
      name: 'The Naughty Pigs',
      role: 'Cheeky Troublemakers Next Door',
      avatar: '🐷',
      avatarBg: 'bg-rose-100 border-rose-300',
      tagColor: 'bg-rose-300 text-slate-950',
      quote: '“Oink! If the sheep are having fun, let’s ruin their picnic!”',
      description: 'Living right across the fence, these three mischievous porkers love playing pranks and causing hilarious chaos.',
      soundType: 'snort',
      soundFreq: 190,
    },
    {
      id: 'farmer',
      name: 'The Sleepy Farmer',
      role: 'Mossy Bottom Farm Owner',
      avatar: '👨‍🌾',
      avatarBg: 'bg-emerald-100 border-emerald-300',
      tagColor: 'bg-[#bbf7d0] text-slate-950',
      quote: '“Just another quiet, ordinary day on the farm... Zzz.”',
      description: 'Utterly oblivious to the flock’s daily acrobatics, inventions, and pizza parties. He loves his tea and taking long afternoon catnaps.',
      soundType: 'yawn',
      soundFreq: 330,
    },
  ];

  const handleSound = (char: Character) => {
    setActiveWobble(char.id);
    if (char.soundType === 'baa') {
      sound.playBaa();
    } else {
      sound.playPop(char.soundFreq);
    }
    setTimeout(() => setActiveWobble(null), 400);
  };

  const handleLike = (charId: string) => {
    sound.playChime(600);
    setLovedCharacters((prev) => ({
      ...prev,
      [charId]: (prev[charId] || 0) + 1,
    }));
  };

  return (
    <section id="characters" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-sky-100/60 overflow-hidden">
      {/* Decorative Marks */}
      <div className="absolute top-12 left-12 pointer-events-none opacity-50">
        <DoodleHeart size={50} color="#bbf7d0" />
      </div>
      <div className="absolute bottom-16 right-16 pointer-events-none opacity-50">
        <DoodleSpiral size={55} color="#ffd43b" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center flex flex-col items-center mb-16">
          <div className="relative inline-flex items-center mb-2">
            <div className="absolute -left-6 top-1/2 -translate-y-1/2">
              <SunburstRays size={28} color="#ffd43b" direction="left" />
            </div>
            <div className="px-5 py-1.5 rounded-full bg-white text-slate-950 font-cartoon font-extrabold text-sm sm:text-base shadow-sm border border-slate-200">
              MEET THE RESIDENTS
            </div>
            <div className="absolute -right-6 top-1/2 -translate-y-1/2">
              <SunburstRays size={28} color="#ffd43b" direction="right" />
            </div>
          </div>

          <h2 className="font-cartoon text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight">
            Meet the Flock
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl font-medium">
            Get to know the cleverest, cuddliest, and craziest companions at Mossy Bottom Farm.
          </p>
        </div>

        {/* Character Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {characters.map((char) => {
            const likes = (lovedCharacters[char.id] || 0) + 24;
            const isWobbling = activeWobble === char.id;

            return (
              <div
                key={char.id}
                className={`clay-card bg-white p-6 sm:p-7 flex flex-col justify-between border-2 border-slate-100 group transition-all duration-300 ${
                  isWobbling ? 'animate-bounce' : ''
                }`}
              >
                <div>
                  {/* Avatar Showcase */}
                  <div
                    className={`w-full h-44 rounded-2xl ${char.avatarBg} border-2 flex items-center justify-center relative overflow-hidden group-hover:scale-102 transition-transform shadow-inner`}
                  >
                    <span className="text-6xl sm:text-7xl select-none filter drop-shadow-md transform group-hover:scale-110 transition-transform">
                      {char.avatar}
                    </span>

                    {/* Role Pill */}
                    <span className={`absolute top-3 left-3 font-cartoon font-bold text-xs px-3 py-1 rounded-full shadow-sm ${char.tagColor}`}>
                      {char.role}
                    </span>

                    {/* Like heart button */}
                    <button
                      onClick={() => handleLike(char.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-rose-500 shadow-sm cursor-pointer transition-transform hover:scale-110 active:scale-95 flex items-center gap-1 text-xs font-bold"
                      title="Cheer for character"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span className="tabular-nums">{likes}</span>
                    </button>
                  </div>

                  {/* Character Name & Quote */}
                  <h3 className="font-cartoon text-2xl font-black text-slate-950 mt-4 group-hover:text-amber-600 transition-colors">
                    {char.name}
                  </h3>
                  <p className="font-cartoon italic text-xs sm:text-sm text-amber-700 mt-1">
                    {char.quote}
                  </p>

                  {/* Description */}
                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                    {char.description}
                  </p>
                </div>

                {/* Bottom Sound Interaction Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleSound(char)}
                    className="clay-button inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 hover:bg-amber-100 text-slate-900 font-cartoon font-bold text-xs sm:text-sm border border-amber-200 cursor-pointer active:scale-95"
                  >
                    <Volume2 className="w-4 h-4 text-amber-600" />
                    <span>Say Hello!</span>
                  </button>

                  <span className="text-xs font-semibold text-slate-400">
                    Mossy Bottom Farm
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
