'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronUp, ChevronDown, Heart, Share2, MessageCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  reels: string[]; // dummy data for images/videos
}

export default function BakeCamReels({ isOpen, onClose, reels = ['/cakes/chocolate-truffle.jpg', '/cakes/rasmalai-fusion.jpg'] }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % reels.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-xl">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full h-full md:w-[400px] md:h-[800px] md:max-h-[90vh] bg-black md:rounded-[2rem] overflow-hidden relative shadow-2xl flex flex-col justify-center"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 left-6 text-white z-50 p-2 bg-black/30 backdrop-blur rounded-full hover:bg-black/50 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Content Area */}
            <div className="relative h-full w-full flex items-center justify-center">
              <AnimatePresence mode="popLayout" custom={currentIndex}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                >
                  <picture className="w-full h-full"> 
                    <img src={reels[currentIndex] || '/cakes/placeholder.jpg'} alt="Reel" className="w-full h-full object-cover" />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* UI Overlay */}
            <div className="absolute bottom-6 left-4 right-4 z-40 flex justify-between items-end">
              <div className="text-white space-y-2 max-w-[70%]">
                <h3 className="font-['Nunito'] font-bold text-lg flex items-center gap-2">
                  @vandanabakes 
                  <span className="text-[10px] bg-[#E63946] px-2 py-0.5 rounded-full font-bold">Follow</span>
                </h3>
                <p className="text-sm opacity-90">Watch the magic come alive! Mixing these exotic layers line by line. ✨🎂 #baking #fresh</p>
                <div className="flex items-center gap-2 text-xs opacity-80 pt-2">
                  <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white">🎵 Original Audio - Vandana</span>
                </div>
              </div>

              <div className="flex flex-col gap-6 text-white pb-6 items-center">
                <button className="flex flex-col items-center gap-1 group">
                  <div className="p-3 bg-black/20 backdrop-blur rounded-full group-hover:bg-[#E63946] transition-colors">
                    <Heart className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold">12k</span>
                </button>
                <button className="flex flex-col items-center gap-1 group">
                  <div className="p-3 bg-black/20 backdrop-blur rounded-full group-hover:bg-white/30 transition-colors">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold">148</span>
                </button>
                <button className="flex flex-col items-center gap-1 group">
                  <div className="p-3 bg-black/20 backdrop-blur rounded-full group-hover:bg-white/30 transition-colors">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold">Share</span>
                </button>
              </div>
            </div>

            {/* Navigation Overlays */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden md:flex">
              <button onClick={handlePrev} className="p-3 bg-black/30 backdrop-blur text-white rounded-full hover:bg-black/50 transition-colors">
                <ChevronUp className="w-6 h-6" />
              </button>
              <button onClick={handleNext} className="p-3 bg-black/30 backdrop-blur text-white rounded-full hover:bg-black/50 transition-colors">
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
            
            {/* Mobile Touch Area (Invisible split) */}
            <div className="absolute inset-x-0 top-0 h-1/4 z-30" onClick={handlePrev} />
            <div className="absolute inset-x-0 bottom-[30%] h-1/2 z-30" onClick={handleNext} />
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
