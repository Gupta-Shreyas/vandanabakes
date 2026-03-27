'use client';

import { menuItems, BakeryItem } from '@/data/menu';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, GripVertical } from 'lucide-react';
import { useStore } from '@/store/useStore';

// Map colors since new menu data doesn't have colors
const flavorColors: Record<string, string> = {
  'Chocolate': '#4A3022',
  'Vanilla': '#FFFDD0',
  'Blueberry': '#C9A0DC',
  'Pineapple': '#FFD700',
  'Red Velvet': '#8B0000',
  'Oreo': '#36454F',
  'Coffee': '#6F4E37',
  'Choco Chip': '#D2B48C',
};

export default function CupcakeBuilder() {
  const cupcakes = menuItems.filter(item => item.category === 'Cup Cake');
  const [boxSize, setBoxSize] = useState<4 | 6>(4);
  const [box, setBox] = useState<(BakeryItem | null)[]>([null, null, null, null]);
  const boxRef = useRef<HTMLDivElement>(null);
  
  const addToCart = useStore(state => state.addToCart);
  const toggleCart = useStore(state => state.toggleCart);

  useEffect(() => {
    setBox(Array(boxSize).fill(null));
  }, [boxSize]);

  const addCupcake = (flavor: BakeryItem) => {
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

  const handleDragEnd = (e: unknown, info: { point: { x: number; y: number } }, flavor: BakeryItem) => {
    if (!boxRef.current) return;
    const boxRect = boxRef.current.getBoundingClientRect();
    const dropX = info.point.x;
    const dropY = info.point.y;

    if (
      dropX >= boxRect.left &&
      dropX <= boxRect.right &&
      dropY >= boxRect.top &&
      dropY <= boxRect.bottom
    ) {
      addCupcake(flavor);
    }
  };

  const filledCount = box.filter(b => b !== null).length;
  const isBoxFull = filledCount === boxSize;
  const pricePerItem = 79; // simplified
  const totalPrice = filledCount * pricePerItem;

  const handleConfirm = () => {
    if (!isBoxFull) return;
    
    // Add multiple items to cart (or group as a box)
    const msg = `Custom Cupcake Box of ${boxSize}: ` + box.map(b => b?.name).join(', ');
    
    addToCart({
      productId: `box-${boxSize}`,
      name: `Assorted Cupcake Box (${boxSize})`,
      image: cupcakes[0].image,
      price: totalPrice,
      size: `${boxSize} Pieces`,
      quantity: 1,
      isEggless: true,
      instructions: msg
    });
    
    toggleCart();
    setBox(Array(boxSize).fill(null)); // reset
  };

  return (
    <section className="bg-[#FFF0F5] border border-[#FFD1DC] rounded-[2rem] p-8 md:p-12 overflow-hidden relative shadow-inner">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-['Pacifico'] text-[#E63946] mb-3">Build Your Box</h2>
        <p className="text-[#6B5B53] max-w-lg mx-auto font-['Nunito'] text-lg">
          Drag and drop flavors to build a personalized box of happiness!
        </p>
        <div className="flex justify-center mt-6 gap-4 border border-[#FFD1DC] p-1 rounded-full w-max mx-auto bg-white">
          <button onClick={() => setBoxSize(4)} className={`px-6 py-2 rounded-full font-bold text-sm ${boxSize === 4 ? 'bg-[#E63946] text-white' : 'text-[#6B5B53] hover:bg-[#FFF0F5]'}`}>Box of 4</button>
          <button onClick={() => setBoxSize(6)} className={`px-6 py-2 rounded-full font-bold text-sm ${boxSize === 6 ? 'bg-[#E63946] text-white' : 'text-[#6B5B53] hover:bg-[#FFF0F5]'}`}>Box of 6</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Flavors Palette */}
        <div>
          <h3 className="text-sm uppercase tracking-wider text-[#6B5B53] font-bold mb-6">Flavors (Drag or Click)</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {cupcakes.map(flavor => (
              <motion.div
                key={flavor.id}
                drag
                dragSnapToOrigin
                onDragEnd={(e, info) => handleDragEnd(e, info, flavor)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                whileDrag={{ scale: 1.1, zIndex: 50 }}
                onClick={() => addCupcake(flavor)}
                className="bg-white p-4 rounded-[1.5rem] cursor-grab active:cursor-grabbing border border-transparent hover:border-[#FFD1DC] shadow-sm flex flex-col items-center gap-3 transition-colors relative z-10"
              >
                <div
                  className="w-14 h-14 rounded-full shadow-inner border-2 border-white relative flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: flavorColors[flavor.name] || '#FFB6C1' }}
                >
                  <div className="absolute top-2 w-full h-1/2 bg-white/20 rounded-full" />
                </div>
                <span className="font-bold text-[#2D1810] text-center text-xs">{flavor.name}</span>
                <div className="absolute top-2 right-2 text-gray-300 pointer-events-none">
                   <GripVertical className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Box */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm uppercase tracking-wider text-[#6B5B53] font-bold">Your Box</h3>
            <span className="text-sm font-bold bg-white px-4 py-1.5 rounded-full text-[#E63946] shadow-sm border border-[#FFD1DC]">
              {filledCount} / {boxSize} Selected
            </span>
          </div>

          <div ref={boxRef} className="bg-white p-6 md:p-8 rounded-[2rem] shadow-lg border border-[#FFD1DC]">
            <div className={`grid gap-4 ${boxSize === 6 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {box.map((slot, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-[#FFF0F5] rounded-[1.5rem] border-2 border-dashed border-[#FFD1DC] flex items-center justify-center relative overflow-hidden"
                >
                  <AnimatePresence mode="popLayout">
                    {slot ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-[90%] h-[90%] rounded-[1rem] flex flex-col items-center justify-center relative group"
                        style={{ backgroundColor: flavorColors[slot.name] || '#FFB6C1' }}
                      >
                        <div className="absolute top-2 w-3/4 h-1/3 bg-white/20 rounded-full z-10" />
                        <span className="text-3xl z-20 mix-blend-overlay opacity-80 mt-2">🧁</span>

                        <button
                          onClick={() => removeCupcake(idx)}
                          className="absolute -top-1 -right-1 w-8 h-8 bg-white text-[#6B5B53] rounded-full shadow-md hover:text-[#E63946] hover:bg-[#FFF0F5] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-50 md:-top-2 md:-right-2 right-1 top-1 max-md:opacity-100 border border-[#FFD1DC]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[#FFD1DC] flex flex-col items-center"
                      >
                        <Plus className="w-8 h-8 mb-2" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-center">Empty</span>
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
              onClick={handleConfirm}
              className={`w-full mt-8 py-4 rounded-full font-bold text-lg transition-all shadow-md flex justify-center items-center gap-2 ${
                isBoxFull
                  ? 'bg-[#E63946] text-white hover:shadow-xl hover:bg-[#c9303c] shadow-[#E63946]/30'
                  : 'bg-[#FFF0F5] text-[#FFD1DC] cursor-not-allowed'
                }`}
            >
              Add Box to Cart <span className="text-sm">• ₹{totalPrice}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
