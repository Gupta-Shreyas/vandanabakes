'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cakeProducts } from '@/data/bakeryData';

const locations = ['Bandra', 'Juhu', 'Andheri', 'South Bombay', 'Powai'];

export default function LiveBakingToast() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const triggerToast = () => {
      const location = locations[Math.floor(Math.random() * locations.length)];
      const cake = cakeProducts[Math.floor(Math.random() * cakeProducts.length)].name;
      setToastMessage(`Someone in ${location} just ordered a ${cake}!`);

      setTimeout(() => setToastMessage(null), 4000); // Hide after 4s
    };

    // Trigger every 15-20s
    const interval = setInterval(() => {
      triggerToast();
    }, Math.random() * 5000 + 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-6 left-6 bg-white shadow-xl rounded-2xl p-4 border border-[#FFD1DC] z-50 flex items-center gap-4 max-w-sm"
        >
          <div className="bg-[#FFF0F5] p-2 rounded-full">
            <span className="text-xl">🍰</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2D1810]">Fresh out of the oven</p>
            <p className="text-xs text-[#6B5B53] mt-1">{toastMessage}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
