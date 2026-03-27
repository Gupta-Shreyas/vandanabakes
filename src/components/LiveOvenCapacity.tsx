'use client';
import { motion } from 'framer-motion';

export default function LiveOvenCapacity() {
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md border border-[#FFD1DC] px-4 py-2 rounded-full shadow-lg flex items-center gap-3"
    >
      <div className="relative flex items-center justify-center w-3 h-3">
        {/* Pulsing Dot */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E63946] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E63946]"></span>
      </div>
      <span className="text-sm font-bold text-[#2D1810] font-['Nunito']">
        Only 2 custom slots left for today!
      </span>
    </motion.div>
  );
}
