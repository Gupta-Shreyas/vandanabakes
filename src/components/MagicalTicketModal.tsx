'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';

export default function MagicalTicketModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Show only on "first visit" (simulated by a 3s delay on mount)
    const hasSeen = localStorage.getItem('seenTicket');
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('seenTicket', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm relative"
          />
          
          <motion.div
            initial={{ scale: 0.8, y: 100, rotate: -5 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.8, y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative w-full max-w-sm"
          >
            {/* The Envelope */}
            <div className={`relative bg-[#FFF0F5] border-2 border-[#FFD1DC] rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center aspect-[4/3] overflow-hidden transition-all duration-700 ${isRevealed ? 'bg-white border-[#E63946]' : 'cursor-pointer'}`}
                 onClick={() => !isRevealed && setIsRevealed(true)}
            >
              {/* Decorative Envelope Flap (CSS pseudo element simulation) */}
              {!isRevealed && (
                <div className="absolute inset-0 border-[3rem] border-transparent border-t-[#FFE4E1] z-10 pointer-events-none" />
              )}
              
              <button onClick={(e) => { e.stopPropagation(); handleClose(); }} className="absolute top-2 right-2 text-[#6B5B53] z-20 hover:bg-[#FFD1DC] rounded-full p-1 transition-colors">
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode='wait'>
                {!isRevealed ? (
                  <motion.div
                    key="unrevealed"
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex flex-col items-center gap-3 z-0"
                  >
                    <div className="w-16 h-16 bg-[#E63946] text-white rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-[#E63946]/50">
                      <Gift className="w-8 h-8" />
                    </div>
                    <p className="font-['Pacifico'] text-2xl text-[#2D1810]">A gift for you!</p>
                    <p className="font-bold text-sm text-[#E63946] animate-pulse">Tap to reveal</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="revealed"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="flex flex-col items-center text-center space-y-4 z-0"
                  >
                    <h3 className="font-['Pacifico'] text-3xl text-[#E63946]">Surprise! 🎉</h3>
                    <p className="text-[#6B5B53] font-['Nunito'] font-bold">Enjoy 10% off your first custom bake.</p>
                    <div className="bg-[#FFF0F5] border-2 border-dashed border-[#FFD1DC] px-6 py-3 rounded-lg text-2xl font-black text-[#2D1810] tracking-widest w-full">
                      SWEET10
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleClose(); }}
                      className="w-full bg-[#E63946] text-white rounded-full py-2 font-bold shadow-md hover:bg-[#c9303c] transition-colors"
                    >
                      Use Code Now
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
