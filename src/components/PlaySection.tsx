import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import artwork from '../../Cheerful Sheep Sky Adventure.png';
import { SunburstRays } from './DoodleMarks';

gsap.registerPlugin(ScrollTrigger);

export const PlaySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const artworkRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motion = gsap.matchMedia(section);
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const entrance = gsap.fromTo(
        artworkRef.current,
        { scale: 1.04, opacity: 0.82 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      return () => entrance.scrollTrigger?.kill();
    });

    return () => motion.revert();
  }, []);

  return (
    <section
      id="games"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#42b8f5] md:min-h-[100svh]"
      aria-labelledby="play-heading"
    >
      <img
        ref={artworkRef}
        src={artwork}
        alt="Shaun waves beside a sky-blue platform game scene filled with stars"
        className="relative z-0 block h-auto w-full md:absolute md:inset-0 md:h-full md:object-cover md:object-center"
      />
      <div className="pointer-events-none absolute inset-0 z-0 hidden bg-gradient-to-b from-sky-400/10 via-transparent to-sky-500/10 md:block" />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 text-center md:absolute md:inset-0 md:justify-start md:px-8 md:pt-[16svh]">
        <div className="w-full md:ml-[34%] md:w-[48%] md:max-w-[610px]">
          <div className="relative mx-auto w-fit max-w-full">
            <div className="absolute -left-8 top-[72%] -translate-y-1/2 sm:-left-10 md:-left-12">
              <SunburstRays size={34} color="#ffd43b" direction="left" />
            </div>
            <div className="absolute -right-8 top-[72%] -translate-y-1/2 sm:-right-10 md:-right-12">
              <SunburstRays size={34} color="#ffd43b" direction="right" />
            </div>
            <h1
              id="play-heading"
              className="font-cartoon text-5xl font-extrabold leading-[0.9] text-slate-950 drop-shadow-sm sm:text-6xl md:text-7xl lg:text-8xl"
            >
              <span className="block">Ready to</span>
              <span className="relative mx-auto mt-1 block w-fit -rotate-2 rounded-full bg-[#ffd43b] px-6 py-2.5 md:px-9">
                Play?
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};