import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Trophy, Sparkles, RotateCcw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface MiniGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FallingItem {
  id: number;
  x: number; // percentage 5 - 95
  y: number; // percentage 0 - 100
  type: 'star' | 'pillow' | 'apple' | 'alarm';
  speed: number;
  emoji: string;
  points: number;
}

export const MiniGameModal: React.FC<MiniGameModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem('shaun_game_highscore') || '0');
    } catch {
      return 0;
    }
  });
  const [shaunX, setShaunX] = useState(50); // percentage 10 - 90
  const [timeLeft, setTimeLeft] = useState(30);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const itemsRef = useRef<FallingItem[]>([]);
  const [, setFrameTick] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const nextItemIdRef = useRef(1);

  // Start new game
  const startGame = useCallback(() => {
    sound.playPop(520);
    sound.playBaa();
    setScore(0);
    setCombo(0);
    setTimeLeft(30);
    setGameOver(false);
    setIsPlaying(true);
    itemsRef.current = [];
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !isPlaying || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setShaunX((prev) => Math.max(prev - 7, 8));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setShaunX((prev) => Math.min(prev + 7, 92));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying, gameOver]);

  // Mouse & Touch tracking inside game area
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPlaying || gameOver || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
    setShaunX(Math.min(Math.max(relativeX, 8), 92));
  };

  // Timer countdown
  useEffect(() => {
    if (!isOpen || !isPlaying || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          sound.playFanfare();
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch {}
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, gameOver]);

  // Game animation frame loop: spawn items & handle collision
  useEffect(() => {
    if (!isOpen || !isPlaying || gameOver) return;

    let animId: number;
    let lastSpawn = Date.now();

    const loop = () => {
      const now = Date.now();

      // Spawn falling dream goodies
      if (now - lastSpawn > 550) {
        lastSpawn = now;
        const rand = Math.random();
        let type: FallingItem['type'] = 'star';
        let emoji = '⭐';
        let points = 10;
        let speed = 1.0 + Math.random() * 0.8;

        if (rand < 0.45) {
          type = 'star';
          emoji = '⭐';
          points = 10;
        } else if (rand < 0.75) {
          type = 'pillow';
          emoji = '☁️';
          points = 15;
          speed = 0.9 + Math.random() * 0.6;
        } else if (rand < 0.9) {
          type = 'apple';
          emoji = '🍎';
          points = 25;
          speed = 1.3;
        } else {
          type = 'alarm';
          emoji = '⏰';
          points = -10;
          speed = 1.1;
        }

        itemsRef.current.push({
          id: nextItemIdRef.current++,
          x: 10 + Math.random() * 80,
          y: -5,
          type,
          speed,
          emoji,
          points,
        });
      }

      // Update positions & check catch
      const remaining: FallingItem[] = [];
      const currentShaunX = shaunX;

      for (const item of itemsRef.current) {
        const nextY = item.y + item.speed;

        // Collision check when item reaches Shaun's catch zone (y >= 80% and y <= 95%)
        if (nextY >= 80 && nextY <= 94) {
          const dist = Math.abs(item.x - currentShaunX);
          if (dist < 12) {
            // Caught item!
            if (item.type === 'alarm') {
              sound.playPop(200);
              setCombo(0);
              setScore((s) => Math.max(0, s + item.points));
            } else {
              sound.playChime(item.type === 'apple' ? 660 : 520);
              setCombo((c) => c + 1);
              setScore((s) => {
                const newScore = s + item.points;
                setHighScore((hs) => {
                  const maxScore = Math.max(hs, newScore);
                  try {
                    localStorage.setItem('shaun_game_highscore', String(maxScore));
                  } catch {}
                  return maxScore;
                });
                return newScore;
              });
            }
            continue; // don't keep this item
          }
        }

        if (nextY <= 105) {
          remaining.push({ ...item, y: nextY });
        }
      }

      itemsRef.current = remaining;
      setFrameTick((t) => t + 1);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, isPlaying, gameOver, shaunX]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shaun's Wooly Cloud Jump Game"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#49aaff] via-[#63b8ff] to-[#86cbff] rounded-3xl p-4 sm:p-6 shadow-2xl border-4 border-white flex flex-col text-slate-900 overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/40">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐑</span>
            <h2 className="font-cartoon text-xl sm:text-2xl font-extrabold text-slate-950">
              Shaun's Cloud Hop & Star Catch
            </h2>
          </div>

          <button
            onClick={() => {
              sound.playPop(400);
              onClose();
            }}
            className="p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-sm cursor-pointer transition-transform hover:scale-105 active:scale-95"
            aria-label="Close game modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Score & HUD */}
        <div className="flex items-center justify-between py-2 sm:py-3 px-2">
          {/* Current Score */}
          <div className="flex items-center gap-2 bg-white/85 px-3 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="font-cartoon font-bold text-sm sm:text-base text-slate-800">
              Score: <span className="text-amber-600 font-extrabold tabular-nums">{score}</span>
            </span>
          </div>

          {/* Time Remaining */}
          <div className="flex items-center gap-1.5 bg-[#ffd43b] px-3.5 py-1.5 rounded-full shadow-sm border border-amber-300">
            <span className="font-cartoon font-extrabold text-sm sm:text-base text-slate-950 tabular-nums">
              ⏳ {timeLeft}s
            </span>
          </div>

          {/* High Score */}
          <div className="flex items-center gap-1.5 bg-white/85 px-3 py-1.5 rounded-full shadow-sm">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="font-cartoon font-bold text-xs sm:text-sm text-slate-700">
              Best: <span className="tabular-nums font-extrabold">{highScore}</span>
            </span>
          </div>
        </div>

        {/* Game Canvas Area */}
        <div
          ref={gameAreaRef}
          onPointerMove={handlePointerMove}
          className="relative w-full h-[320px] sm:h-[380px] bg-sky-200/50 rounded-2xl border-2 border-white/60 overflow-hidden select-none cursor-ew-resize touch-none flex flex-col justify-end"
        >
          {/* Floating background clouds */}
          <div className="absolute top-6 left-6 w-24 h-12 bg-white/60 rounded-full blur-sm" />
          <div className="absolute top-16 right-10 w-32 h-14 bg-white/60 rounded-full blur-sm" />
          <div className="absolute top-36 left-1/3 w-28 h-12 bg-white/40 rounded-full blur-sm" />

          {/* Falling items */}
          {isPlaying &&
            itemsRef.current.map((item) => (
              <div
                key={item.id}
                className="absolute text-2xl sm:text-3xl select-none pointer-events-none transition-transform"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {item.emoji}
              </div>
            ))}

          {/* Shaun the Sleep Player Mascot at Bottom */}
          <div
            className="absolute bottom-2 transition-all duration-75 flex flex-col items-center pointer-events-none select-none"
            style={{
              left: `${shaunX}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {/* Combo indicator bubble */}
            {combo > 2 && (
              <div className="animate-bounce mb-1 px-2 py-0.5 rounded-full bg-amber-300 text-slate-950 font-cartoon font-extrabold text-xs shadow-sm">
                x{combo} Combo!
              </div>
            )}
            {/* Shaun face & basket */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-50 rounded-full border-4 border-slate-950 flex flex-col items-center justify-center shadow-lg relative">
              <span className="text-3xl sm:text-4xl">🐑</span>
              <div className="absolute -top-1 w-10 h-3 bg-white rounded-full border-2 border-slate-900" />
            </div>
          </div>

          {/* Overlay: Game Start / Game Over Screen */}
          {(!isPlaying || gameOver) && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
              {!isPlaying ? (
                <div className="bg-white/95 rounded-2xl p-6 shadow-xl border-2 border-amber-300 max-w-sm flex flex-col items-center">
                  <span className="text-5xl mb-2">⭐🐑</span>
                  <h3 className="font-cartoon text-2xl font-black text-slate-950 mb-1">
                    Ready to Catch Stars?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 font-medium">
                    Move your mouse, touch, or use <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border">→</kbd> keys to catch falling stars and pillows. Watch out for alarm clocks!
                  </p>
                  <button
                    onClick={startGame}
                    className="clay-button px-6 py-3 rounded-full bg-[#ffd43b] hover:bg-[#ffcd1a] text-slate-950 font-cartoon font-bold text-lg shadow-md border-2 border-amber-400 cursor-pointer"
                  >
                    Start Game! 🚀
                  </button>
                </div>
              ) : (
                <div className="bg-white/95 rounded-2xl p-6 shadow-xl border-2 border-amber-300 max-w-sm flex flex-col items-center animate-in zoom-in-95">
                  <span className="text-5xl mb-2">🎉</span>
                  <h3 className="font-cartoon text-2xl font-black text-slate-950 mb-1">
                    Sweet Dreams!
                  </h3>
                  <p className="font-cartoon text-lg font-bold text-slate-800 mb-1">
                    You scored <span className="text-amber-600 font-black text-2xl">{score}</span> points!
                  </p>
                  {score >= highScore && score > 0 && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-3">
                      🏆 NEW HIGH SCORE!
                    </span>
                  )}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={startGame}
                      className="clay-button inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#ffd43b] hover:bg-[#ffcd1a] text-slate-950 font-cartoon font-bold text-base shadow-md border-2 border-amber-400 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Play Again
                    </button>
                    <button
                      onClick={onClose}
                      className="clay-button px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-cartoon font-bold text-base cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer controls hint */}
        <div className="flex items-center justify-between pt-3 text-xs text-slate-800 font-medium">
          <span>💡 Tip: Catch ⭐ for 10pts, ☁️ for 15pts, 🍎 for 25pts!</span>
          <button
            onClick={() => sound.playBaa()}
            className="flex items-center gap-1 text-slate-900 font-bold hover:underline cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            Baa!
          </button>
        </div>
      </div>
    </div>
  );
};
