import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [favoriteSheep, setFavoriteSheep] = useState('Shaun the Sleep');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playFanfare();
    sound.playBaa();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    sound.playPop(400);
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Send a Postcard to Mossy Bottom Farm"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-amber-50 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 text-slate-900 overflow-hidden">
        {/* Postcard Stamp in corner */}
        <div className="absolute top-4 right-14 w-12 h-14 bg-white border-2 border-dashed border-amber-400 rounded flex flex-col items-center justify-center shadow-xs rotate-6 pointer-events-none select-none">
          <span className="text-xl">🐑</span>
          <span className="text-[9px] font-black text-amber-600">FARM AIR</span>
        </div>

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-amber-200/80 hover:bg-amber-300 text-slate-900 transition-transform active:scale-95 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-amber-800 bg-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
                Postcard to Mossy Bottom Farm
              </span>
              <h3 className="font-cartoon text-3xl font-black text-slate-950 mt-2">
                Say Hello to the Flock!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Drop Bitzer, Shaun, and the sheep a note. We reply between nap times!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name / Farm Nickname
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farmer Alex"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-amber-200 focus:border-amber-400 focus:outline-none text-slate-900 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@meadow.fun"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-amber-200 focus:border-amber-400 focus:outline-none text-slate-900 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Favorite Flock Companion
                </label>
                <select
                  value={favoriteSheep}
                  onChange={(e) => setFavoriteSheep(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-amber-200 focus:border-amber-400 focus:outline-none text-slate-900 text-sm font-medium"
                >
                  <option>Shaun the Sleep</option>
                  <option>Bitzer the Sheepdog</option>
                  <option>Shirley the Huge Sheep</option>
                  <option>Timmy the Baby Lamb</option>
                  <option>The Naughty Pigs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Message or Dream Idea
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write something nice or tell us your favourite adventure..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-amber-200 focus:border-amber-400 focus:outline-none text-slate-900 text-sm font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="clay-button mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#ffd43b] hover:bg-[#ffcd1a] text-slate-950 font-cartoon font-extrabold text-base shadow-md border-2 border-amber-300 cursor-pointer active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Send Farm Postcard! 🐑</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-cartoon text-3xl font-black text-slate-950">
              Postcard Delivered!
            </h3>
            <p className="font-cartoon text-base text-slate-700 mt-2 max-w-sm">
              Thanks <strong>{name}</strong>! Bitzer has placed your postcard directly in Shaun’s hay basket. Baaa!
            </p>
            <button
              onClick={handleResetAndClose}
              className="clay-button mt-6 px-6 py-2.5 rounded-full bg-[#ffd43b] hover:bg-[#ffcd1a] text-slate-950 font-cartoon font-bold text-base shadow-md cursor-pointer"
            >
              Back to Farm 🌾
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
