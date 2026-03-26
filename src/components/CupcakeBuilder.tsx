'use client';
import { cupcakeFlavors } from '@/data/bakeryData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

export default function CupcakeBuilder() {
  const [box, setBox] = useState<(typeof cupcakeFlavors[0] | null)[]>([null, null, null, null]);

  const addCupcake = (flavor: typeof cupcakeFlavors[0]) => {
    const emptySlotIndex = box.findIndex(slot => slot === null);
    if (emptySlotIndex !== -1) {
      const newBox = [...box];
      newBox[emptySlotIndex] = flavor;
      setBox(newBox);
    }
  };

  const removeCupcake = (index: number) => {
    const newBox = [...box];
    newBox[index] = null;
    setBox(newBox);
  };

  const isBoxFull = box.every(slot => slot !== null);

  return (
    <section className="bg-[#FFF0F5] border border-[#FFD1DC] rounded-[2rem] p-8 md:p-12 overflow-hidden relative shadow-inner">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-['Pacifico'] text-[#2D1810] mb-3">Build Your Box</h2>
        <p className="text-[#6B5B53] max-w-lg mx-auto">
          Mix and match to create your perfect set of 4. Tap or drag flavors to build your box!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Flavors Palette */}
        <div>
          <h3 className="text-sm uppercase tracking-wider text-[#6B5B53] font-bold mb-6 mb-4">Flavors</h3>
          <div className="grid grid-cols-2 gap-4">
            {cupcakeFlavors.map(flavor => (
              <motion.div
                key={flavor.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addCupcake(flavor)}
                className="bg-white p-4 rounded-2xl cursor-pointer border border-transparent hover:border-[#FFD1DC] shadow-sm flex flex-col items-center gap-3 transition-colors"
              >
                <div
                  className="w-16 h-16 rounded-full shadow-inner border-2 border-white relative flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: flavor.color }}
                >
                  <div className="absolute top-2 w-full h-1/2 bg-white/20 rounded-full" />
                </div>
                <span className="font-bold text-[#2D1810] text-center text-sm">{flavor.name}</span>
                <button
                  className="w-8 h-8 rounded-full bg-[#FFF0F5] text-[#E63946] flex flex-center hover:bg-[#E63946] hover:text-white transition-colors"
                  aria-label={`Add ${flavor.name}`}
                >
                  <Plus className="w-5 h-5 mx-auto mt-1.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Box */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm uppercase tracking-wider text-[#6B5B53] font-bold">Your Box</h3>
            <span className="text-sm font-bold bg-white px-3 py-1 rounded-full text-[#E63946] shadow-sm">
              {box.filter(b => b !== null).length} / 4 Selected
            </span>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-lg border border-[#FFD1DC]">
            <div className="grid grid-cols-2 gap-4">
              {box.map((slot, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-[#FFF0F5] rounded-2xl border-2 border-dashed border-[#FFD1DC] flex items-center justify-center relative overflow-hidden"
                >
                  <AnimatePresence mode="popLayout">
                    {slot ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-full h-full flex flex-col items-center justify-center relative group"
                        style={{ backgroundColor: slot.color }}
                      >
                        <div className="absolute top-3 w-3/4 h-1/3 bg-white/20 rounded-full z-10" />
                        <span className="text-2xl z-20 mix-blend-overlay opacity-80 mt-4">🧁</span>

                        <button
                          onClick={() => removeCupcake(idx)}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-white text-gray-500 rounded-full shadow-md items-center justify-center hover:text-[#E63946] hover:bg-gray-50 flex opacity-0 group-hover:opacity-100 transition-opacity z-50 md:-top-2 md:-right-2 right-2 top-2 max-md:opacity-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[#FFD1DC] flex flex-col flex-center items-center"
                      >
                        <Plus className="w-8 h-8 mb-2" />
                        <span className="text-xs uppercase font-bold tracking-widest text-center">Empty</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <motion.button
              disabled={!isBoxFull}
              whileHover={isBoxFull ? { scale: 1.02 } : {}}
              whileTap={isBoxFull ? { scale: 0.98 } : {}}
              className={`w-full mt-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md ${isBoxFull
                  ? 'bg-[#E63946] text-white hover:shadow-xl hover:bg-[#c9303c]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              Confirm Box (₹1200)
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
