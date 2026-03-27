'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems } from '@/data/menu';

const locations = ['Bandra', 'Juhu', 'Andheri', 'South Bombay', 'Powai'];

export default function LiveBakingToast() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Pick random items that aren't the empty list if data unloads
    const items = menuItems.filter(i => i.category === 'Cake' || i.category === 'Premium Cake');
    if (items.length === 0) return;

    const triggerToast = () => {
      const location = locations[Math.floor(Math.random() * locations.length)];
      const cake = items[Math.floor(Math.random() * items.length)].name;
      setToastMessage(`Someone in ${location} just ordered a ${cake}!`);

      setTimeout(() => setToastMessage(null), 4000); // Hide after 4s
    };

    // Trigger every 25-30s
    const interval = setInterval(() => {
      triggerToast();
    }, Math.random() * 5000 + 25000);
    
    // Initial delayed trigger
    const initialTimeout = setTimeout(triggerToast, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-6 left-6 bg-white shadow-xl rounded-[1.5rem] p-4 border border-[#FFD1DC] z-50 flex items-center gap-4 max-w-sm"
        >
          <div className="bg-[#FFF0F5] p-2 rounded-full border border-[#FFD1DC]">
            <span className="text-xl">🍰</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#E63946] mb-0.5">Fresh out of the oven</p>
            <p className="text-xs text-[#2D1810] font-['Nunito']">{toastMessage}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
