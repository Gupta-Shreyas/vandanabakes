'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '@/store/useStore';
import { MapPin, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PincodeChecker() {
  const [pincode, setPincode] = useState('');
  const { validatePincode, isPincodeValid } = useStore();

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode) return;
    
    validatePincode(pincode);
    
    // Simulate valid if exactly 6 digits
    if (/^\d{6}$/.test(pincode)) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.1 },
        colors: ['#FFF0F5', '#E63946', '#FFD1DC', '#FFFFFF']
      });
    }
  };

  return (
    <div className="bg-[#FFF0F5] border-b border-[#FFD1DC] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#E63946] text-sm font-bold font-['Nunito']">
          <MapPin className="w-4 h-4" />
          <span>Check delivery availability in your area</span>
        </div>
        
        <form onSubmit={checkPincode} className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter Pincode"
              className="px-4 py-1.5 rounded-full text-sm border border-[#FFD1DC] focus:outline-none focus:border-[#E63946] w-36 md:w-48 text-[#2D1810]"
            />
            <AnimatePresence>
              {isPincodeValid !== null && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute right-2 top-1.5"
                >
                  {isPincodeValid ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            type="submit"
            className="bg-[#E63946] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md shadow-[#E63946]/30 hover:bg-[#c9303c] transition-colors"
          >
            Check
          </button>
        </form>

        <AnimatePresence>
          {isPincodeValid === false && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-red-500 font-bold bg-white px-3 py-1 rounded-full shadow-sm absolute -bottom-8 md:static"
            >
              Pick-up Only
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
