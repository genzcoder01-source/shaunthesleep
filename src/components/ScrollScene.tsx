import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gamepad2, Home, Sparkles, Smile, ChevronDown } from 'lucide-react';
import { SunburstRays, DoodleSpiral, DoodleStar, DoodleHeart, MotionTicks } from './DoodleMarks';
import { sound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

interface ScrollSceneProps {
  onPlayGameClick: () => void;
}

export const ScrollScene: React.FC<ScrollSceneProps> = ({ onPlayGameClick }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hero 1 elements
  const hero1Ref = useRef<HTMLDivElement>(null);
  const hero1TitleRef = useRef<HTMLDivElement>(null);
  const hero1PillsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Hero 2 elements
  const hero2Ref = useRef<HTMLDivElement>(null);
  const hero2TitleRef = useRef<HTMLDivElement>(null);
  const hero2ButtonsRef = useRef<HTMLDivElement>(null);
  const hero2DoodlesRef = useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const videoUpdateRaf = useRef<number | null>(null);
  const lastScrubbedTime = useRef(0);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Video loaded callback
  const handleVideoMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      setVideoLoaded(true);
      video.pause();
      video.currentTime = 0.01; // show initial frame
    }
  }, []);

  const handleVideoCanPlay = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
  }, []);

  // Set up GSAP ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion) return;

    const scene = sceneRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;

    if (!scene || !stage) return;

    gsap.set([hero1TitleRef.current, hero1PillsRef.current, scrollIndicatorRef.current], {
      force3D: true,
      transformPerspective: 1000,
    });

    gsap.set([hero2Ref.current, hero2TitleRef.current, hero2ButtonsRef.current, hero2DoodlesRef.current], {
      force3D: true,
      transformPerspective: 1000,
    });

    const scrubVideo = (progress: number) => {
      if (!video || !video.duration || Number.isNaN(video.duration) || video.readyState < 2) {
        return;
      }

      const targetTime = Math.min(Math.max(progress * video.duration, 0.01), video.duration - 0.05);
      if (Math.abs(targetTime - lastScrubbedTime.current) < 0.02) {
        return;
      }

      lastScrubbedTime.current = targetTime;

      if (videoUpdateRaf.current !== null) {
        cancelAnimationFrame(videoUpdateRaf.current);
      }

      videoUpdateRaf.current = requestAnimationFrame(() => {
        if (video) {
          video.currentTime = targetTime;
        }
        videoUpdateRaf.current = null;
      });
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          refreshPriority: 1,
          onUpdate: (self) => {
            scrubVideo(self.progress);
          },
        },
      });

      tl.to(
        hero1TitleRef.current,
        {
          y: -70,
          opacity: 0,
          ease: 'power1.inOut',
          duration: 0.42,
          force3D: true,
        },
        0
      );

      tl.to(
        hero1PillsRef.current,
        {
          y: -40,
          scale: 0.88,
          opacity: 0,
          ease: 'power1.inOut',
          duration: 0.36,
          force3D: true,
        },
        0.06
      );

      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: 18,
          duration: 0.2,
          force3D: true,
        },
        0
      );

      tl.fromTo(
        hero2Ref.current,
        {
          opacity: 0,
          pointerEvents: 'none',
          scale: 0.98,
        },
        {
          opacity: 1,
          pointerEvents: 'auto',
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          force3D: true,
        },
        0.45
      );

      tl.fromTo(
        hero2TitleRef.current,
        {
          y: -50,
          scale: 0.9,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.42,
          ease: 'back.out(1.4)',
          force3D: true,
        },
        0.52
      );

      tl.fromTo(
        hero2ButtonsRef.current,
        {
          y: 30,
          scale: 0.92,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.5)',
          force3D: true,
        },
        0.62
      );

      tl.fromTo(
        hero2DoodlesRef.current,
        {
          scale: 0.7,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.42,
          ease: 'elastic.out(1, 0.6)',
          force3D: true,
        },
        0.58
      );
    }, scene);

    return () => {
      if (videoUpdateRaf.current !== null) {
        cancelAnimationFrame(videoUpdateRaf.current);
      }
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  // Smooth scroll back to top handler
  const handleScrollToTop = () => {
    sound.playPop(520);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sceneRef}
      className={`relative w-full ${
        prefersReducedMotion ? 'h-screen' : 'h-[240vh] sm:h-[260vh] lg:h-[300vh]'
      } bg-[#4ca8ff] select-none overflow-hidden`}
    >
      {/* Sticky Stage pinned during scroll */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-[100svh] min-h-[640px] overflow-hidden flex flex-col justify-between items-center bg-gradient-to-b from-[#3ba2ff] via-[#52adff] to-[#6cb7ff]"
      >
        {/* Realistic Cloud Layer Behind Video */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Top Left Clouds */}
          <div className="absolute -top-12 -left-20 w-96 h-64 bg-white/70 rounded-full blur-2xl cloud-drift" />
          <div className="absolute top-10 left-10 w-80 h-40 bg-white/80 rounded-full blur-xl animate-float-1" />

          {/* Top Right Clouds */}
          <div className="absolute -top-16 -right-20 w-[450px] h-72 bg-white/75 rounded-full blur-2xl cloud-drift" />
          <div className="absolute top-16 right-12 w-80 h-44 bg-white/85 rounded-full blur-xl animate-float-2" />

          {/* Mid horizon clouds */}
          <div className="absolute top-1/3 left-1/4 w-72 h-36 bg-white/50 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-1/4 w-80 h-40 bg-white/50 rounded-full blur-2xl" />
        </div>

        {/* Video Element - Scrubbed by scroll */}
        <div className="absolute inset-0 w-full h-full z-10 flex items-end justify-center pointer-events-none overflow-hidden">
          {!videoError ? (
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/s8kgvkbx/video/upload/v1790938807/Shaun_rising_upward_animation_1080p_20261002162714.mp4?utm_source=chatgpt.com"
              playsInline
              muted
              preload="metadata"
              crossOrigin="anonymous"
              onLoadedMetadata={handleVideoMetadata}
              onCanPlay={handleVideoCanPlay}
              onError={handleVideoError}
              className="w-full h-full object-cover object-bottom md:object-center pointer-events-none select-none"
              style={{
                filter: 'drop-shadow(0 20px 30px rgba(0, 50, 100, 0.15))',
                transform: 'translateZ(0)',
                objectPosition: 'center bottom',
              }}
            />
          ) : (
            /* Fallback character visual if network blocked */
            <div className="relative pb-10 flex flex-col items-center animate-bounce">
              <div className="w-56 h-56 bg-amber-50 rounded-full border-8 border-slate-900 flex items-center justify-center shadow-2xl">
                <span className="text-7xl">🐑</span>
              </div>
              <p className="font-cartoon text-lg font-bold text-white mt-4 bg-slate-900/60 px-4 py-1.5 rounded-full">
                Shaun is having a nap!
              </p>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* STATE 1: INITIAL HERO STATE (Matches Reference Image 1)                   */}
        {/* ========================================================================= */}
        <div
          ref={hero1Ref}
          className={`relative z-20 w-full max-w-5xl mx-auto pt-20 sm:pt-24 md:pt-28 lg:pt-32 px-3 sm:px-4 flex flex-col items-center text-center transition-opacity duration-300 ${
            prefersReducedMotion ? 'hidden' : 'block'
          }`}
        >
          {/* Main Title Group */}
          <div ref={hero1TitleRef} className="flex flex-col items-center">
            {/* Top kicker */}
            <span className="font-cartoon font-bold text-slate-900 tracking-wider text-sm sm:text-base md:text-lg mb-1 sm:mb-2 uppercase">
              IT'S TIME TO
            </span>

            {/* "Play with" line */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 my-1">
              {/* Play capsule button with rays */}
              <div className="relative inline-flex items-center">
                {/* 3 yellow burst rays on left */}
                <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2">
                  <SunburstRays size={28} color="#ffd43b" direction="left" />
                </div>

                <div className="px-5 sm:px-8 py-1.5 sm:py-2.5 rounded-full bg-[#ffd43b] text-slate-950 font-cartoon font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl shadow-md border-2 border-amber-300/80 transform hover:scale-105 transition-transform">
                  Play
                </div>
              </div>

              <span className="font-cartoon font-extrabold text-slate-950 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                with
              </span>
            </div>

            {/* "Shaun the Sleep" big headline */}
            <h1 className="font-cartoon font-extrabold text-slate-950 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px] tracking-tight leading-none mt-2 drop-shadow-sm">
              Shaun the Sleep
            </h1>
          </div>

          {/* Floating Colorful Pills Bar (Matches Reference Image 1) */}
          <div
            ref={hero1PillsRef}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 md:gap-4 mt-6 sm:mt-8 max-w-4xl"
          >
            {/* Pill 1: Fun! (Pastel Pink) with yellow rays */}
            <div className="relative group">
              <div className="absolute -left-4 -top-3">
                <SunburstRays size={22} color="#ffd43b" direction="top-left" />
              </div>
              <div className="animate-float-1 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#ffccd5] text-slate-900 font-cartoon font-extrabold text-base sm:text-lg shadow-md border-2 border-white/60 cursor-pointer hover:scale-110 active:scale-95 transition-all">
                Fun!
              </div>
            </div>

            {/* Pill 2: Gamepad (Pastel Purple) with 4 sparkles */}
            <div className="relative group">
              <div className="absolute -left-3 -top-2">
                <SunburstRays size={20} color="#ffffff" direction="top-left" />
              </div>
              <div className="absolute -right-3 -bottom-2">
                <SunburstRays size={20} color="#ffffff" direction="right" />
              </div>
              <div className="animate-float-2 p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl bg-[#b8a4f9] text-white shadow-md border-2 border-white/60 cursor-pointer hover:scale-110 active:scale-95 transition-all flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-none" />
              </div>
            </div>

            {/* Pill 3: Explore! (Pastel Yellow) */}
            <div className="animate-float-3 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-[#ffe066] text-slate-900 font-cartoon font-extrabold text-base sm:text-lg shadow-md border-2 border-white/60 cursor-pointer hover:scale-110 active:scale-95 transition-all">
              Explore!
            </div>

            {/* Pill 4: Smiley Face (White Circle) */}
            <div className="animate-float-1 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-slate-900 shadow-md border-2 border-slate-100 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all">
              <Smile className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </div>

            {/* Pill 5: Adventure! (Pastel Mint Green) */}
            <div className="animate-float-2 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-[#bbf7d0] text-slate-900 font-cartoon font-extrabold text-base sm:text-lg shadow-md border-2 border-white/60 cursor-pointer hover:scale-110 active:scale-95 transition-all">
              Adventure!
            </div>

            {/* Pill 6: Collect! (Pastel Peach) with yellow rays */}
            <div className="relative group">
              <div className="absolute -right-4 -top-3">
                <SunburstRays size={22} color="#ffd43b" direction="top-right" />
              </div>
              <div className="animate-float-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#fed7aa] text-slate-900 font-cartoon font-extrabold text-base sm:text-lg shadow-md border-2 border-white/60 cursor-pointer hover:scale-110 active:scale-95 transition-all">
                Collect!
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint helper for desktop & touch */}
        <div
          ref={scrollIndicatorRef}
          className={`relative z-20 mb-8 sm:mb-12 flex flex-col items-center pointer-events-auto cursor-pointer transition-opacity duration-300 ${
            prefersReducedMotion ? 'hidden' : 'flex'
          }`}
          onClick={() => {
            sound.playPop(480);
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
          }}
        >
          <div className="px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm text-slate-800 font-cartoon font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 animate-bounce">
            <span>Scroll down to wake Shaun</span>
            <ChevronDown className="w-4 h-4 text-slate-700" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STATE 2: FINAL CELEBRATORY HERO STATE (Matches Reference Image 2)          */}
        {/* ========================================================================= */}
        <div
          ref={hero2Ref}
          className={`absolute inset-0 z-20 w-full h-full flex flex-col justify-between items-center pt-24 sm:pt-28 md:pt-32 px-4 pointer-events-none ${
            prefersReducedMotion ? 'opacity-100 pointer-events-auto' : 'opacity-0'
          }`}
        >
          {/* Top Headline Group: THANKS FOR PLAYING! SEE YOU AGAIN! */}
          <div ref={hero2TitleRef} className="flex flex-col items-center text-center">
            {/* "THANKS FOR" kicker */}
            <span className="font-cartoon font-bold text-slate-950 tracking-wider text-base sm:text-lg md:text-xl uppercase mb-1">
              THANKS FOR
            </span>

            {/* "PLAYING!" in yellow capsule with sunburst rays */}
            <div className="relative inline-flex items-center my-1">
              {/* Left sunburst rays */}
              <div className="absolute -left-7 sm:-left-9 top-1/2 -translate-y-1/2">
                <SunburstRays size={32} color="#ffd43b" direction="left" />
              </div>
              {/* Right sunburst rays */}
              <div className="absolute -right-7 sm:-right-9 top-1/2 -translate-y-1/2">
                <SunburstRays size={32} color="#ffd43b" direction="right" />
              </div>

              <div className="px-6 sm:px-10 py-2 sm:py-3.5 rounded-full bg-[#ffd43b] text-slate-950 font-cartoon font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl shadow-lg border-2 border-amber-300">
                PLAYING!
              </div>
            </div>

            {/* "SEE YOU AGAIN!" line */}
            <span className="font-cartoon font-extrabold text-slate-950 text-2xl sm:text-3xl md:text-4xl mt-2 tracking-tight">
              SEE YOU AGAIN!
            </span>
          </div>

          {/* Floating Buttons: Left (Play Again) & Right (Back Home) */}
          <div
            ref={hero2ButtonsRef}
            className="w-full max-w-5xl px-2 sm:px-4 flex flex-col gap-3 sm:flex-row items-center justify-between mb-auto mt-5 sm:mt-10"
          >
            {/* Left Button: 🎮 Play Again */}
            <div className="relative group">
              <div className="absolute -left-5 -top-3">
                <SunburstRays size={24} color="#ffd43b" direction="top-left" />
              </div>
              <button
                onClick={() => {
                  sound.playFanfare();
                  onPlayGameClick();
                }}
                className="clay-button flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-[#ffd43b] hover:bg-[#ffcd1a] text-slate-950 font-cartoon font-bold text-base sm:text-xl shadow-lg border-2 border-amber-300 cursor-pointer pointer-events-auto active:scale-95 w-full sm:w-auto"
              >
                <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 fill-slate-950 stroke-none" />
                <span className="whitespace-nowrap">Play Again</span>
              </button>
            </div>

            {/* Right Button: 🏠 Back Home */}
            <div className="relative group">
              <div className="absolute -right-5 -bottom-3">
                <SunburstRays size={24} color="#ffd43b" direction="right" />
              </div>
              <button
                onClick={handleScrollToTop}
                className="clay-button flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-950 font-cartoon font-bold text-base sm:text-xl shadow-lg border-2 border-white cursor-pointer pointer-events-auto active:scale-95 w-full sm:w-auto"
              >
                <Home className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                <span className="whitespace-nowrap">Back Home</span>
              </button>
            </div>
          </div>

          {/* Surrounding Doodles & Clay Pills (Matches Reference Image 2) */}
          <div
            ref={hero2DoodlesRef}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
          >
            {/* Left: Pink Pill with smiley face */}
            <div className="absolute top-[48%] left-[6%] sm:left-[10%] animate-float-1">
              <div className="relative">
                <div className="absolute -top-3 -right-3">
                  <SunburstRays size={20} color="#ffd43b" direction="top-right" />
                </div>
                <div className="w-14 h-11 sm:w-16 sm:h-12 rounded-2xl bg-[#ffccd5] text-slate-900 shadow-md border-2 border-white/60 flex items-center justify-center">
                  <Smile className="w-6 h-6 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Left Lower: Yellow Doodle Curl */}
            <div className="absolute top-[62%] left-[12%] sm:left-[14%] animate-float-2">
              <DoodleSpiral size={48} color="#ffd43b" />
            </div>

            {/* Right: Purple Pill with Gamepad & sparkles */}
            <div className="absolute top-[48%] right-[6%] sm:right-[10%] animate-float-2">
              <div className="relative">
                <div className="absolute -left-3 -top-2">
                  <SunburstRays size={20} color="#ffffff" direction="left" />
                </div>
                <div className="absolute -right-3 -bottom-2">
                  <SunburstRays size={20} color="#ffffff" direction="right" />
                </div>
                <div className="w-14 h-11 sm:w-16 sm:h-12 rounded-2xl bg-[#b8a4f9] text-white shadow-md border-2 border-white/60 flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 fill-white stroke-none" />
                </div>
              </div>
            </div>

            {/* Right Mid: Yellow Doodle Star */}
            <div className="absolute top-[60%] right-[10%] sm:right-[12%] animate-float-1">
              <DoodleStar size={44} color="#ffd43b" />
            </div>

            {/* Right Lower: Green Doodle Heart */}
            <div className="absolute top-[70%] right-[14%] sm:right-[16%] animate-float-3">
              <DoodleHeart size={44} color="#d9f99d" />
            </div>

            {/* White motion ticks near Shaun's head/ears */}
            <div className="absolute top-[44%] left-[30%] sm:left-[32%] hidden sm:block animate-pulse-slow">
              <MotionTicks size={36} color="#ffffff" />
            </div>
            <div className="absolute top-[44%] right-[30%] sm:right-[32%] hidden sm:block animate-pulse-slow">
              <MotionTicks size={36} color="#ffffff" />
            </div>
          </div>

          {/* Bottom spacing so Shaun stays nicely in frame */}
          <div className="w-full h-8" />
        </div>
      </div>
    </section>
  );
};
