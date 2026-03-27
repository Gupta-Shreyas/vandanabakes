'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BakeryItem } from '@/data/menu';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { X, Sparkles, Leaf } from 'lucide-react';

interface Props {
  product: BakeryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InteractiveWeightSelector({ product, isOpen, onClose }: Props) {
  const [selectedVariantId, setSelectedVariantId] = useState<number>(0);
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [message, setMessage] = useState('');
  const [instructions, setInstructions] = useState('');
  
  const addToCart = useStore(state => state.addToCart);
  const toggleCart = useStore(state => state.toggleCart);

  if (!product) return null;

  const variant = product.variants[selectedVariantId] || product.variants[0];
  const egglessSurcharge = 50;
  const finalPrice = variant.price + (isEggless ? egglessSurcharge : 0);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: finalPrice,
      size: variant.size,
      quantity: 1,
      isEggless,
      message,
      instructions
    });
    onClose();
    toggleCart();
  };

  // Dummy pairing guides
  const pairingGuides: Record<string, string> = {
    'Cake': 'Pairs wonderfully with our custom Birthday Toppers!',
    'Premium Cake': 'Best enjoyed chilled. Try pairing with Sparkle Candles.',
    'Cup Cake': 'Mix and match 4 cupcakes for a perfect box!',
    'Jar Cake': 'Grab a wooden spoon and dive right in!'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header / Image Area */}
            <div className="h-48 bg-[#FFF0F5] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-[#2D1810]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Title */}
              <div>
                <h2 className="text-3xl font-['Pacifico'] text-[#E63946]">{product.name}</h2>
                <p className="text-[#6B5B53] font-bold mt-1 text-xl">₹{finalPrice}</p>
              </div>

              {/* Interactive Sizes */}
              {product.variants.length > 1 && (
                <div className="space-y-3">
                  <label className="font-['Nunito'] font-bold text-[#2D1810] text-sm uppercase tracking-wide">Select Size</label>
                  <div className="flex gap-3">
                    {product.variants.map((v, idx) => (
                      <button
                        key={v.size}
                        onClick={() => setSelectedVariantId(idx)}
                        className={`relative px-6 py-3 rounded-full font-bold transition-all ${
                          selectedVariantId === idx 
                          ? 'text-white shadow-md shadow-[#E63946]/30' 
                          : 'bg-[#FFF0F5] text-[#2D1810] hover:bg-[#FFD1DC]'
                        }`}
                      >
                        {selectedVariantId === idx && (
                          <motion.div
                            layoutId="pill"
                            className="absolute inset-0 bg-[#E63946] rounded-full -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dietary Toggle */}
              {(product.category === 'Cake' || product.category === 'Premium Cake') && (
                <div className="flex items-center justify-between bg-[#FFF0F5] p-4 rounded-[1.5rem] border border-[#FFD1DC]">
                  <div className="flex items-center gap-2">
                    <Leaf className={`w-5 h-5 ${isEggless ? 'text-green-500' : 'text-[#6B5B53]'}`} />
                    <span className="font-bold text-[#2D1810]">Eggless (+₹50)</span>
                  </div>
                  <button
                    onClick={() => setIsEggless(!isEggless)}
                    className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      isEggless ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      className="bg-white w-6 h-6 rounded-full shadow-md"
                      layout
                      animate={{ x: isEggless ? 24 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              )}

              {/* Personalization Inputs */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-['Nunito'] font-bold text-[#2D1810] text-sm">Message on Cake (Optional)</label>
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Happy Birthday Jane!"
                    maxLength={30}
                    className="w-full px-4 py-3 rounded-[1rem] border border-[#FFD1DC] focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-['Nunito'] font-bold text-[#2D1810] text-sm">Special Instructions (Optional)</label>
                  <textarea 
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Less sweet, extra chocolate chips..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-[1rem] border border-[#FFD1DC] focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Flavor Pairing Guide */}
              <div className="bg-[#FFF0F5]/50 flex items-start gap-3 p-4 rounded-[1rem] text-sm text-[#6B5B53]">
                <Sparkles className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#2D1810]">Baker&apos;s Tip:</strong> {pairingGuides[product.category]}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#FFD1DC] bg-white">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#E63946] text-white rounded-full font-bold shadow-lg shadow-[#E63946]/30 hover:shadow-[#E63946]/50 transition-shadow active:scale-[0.98]"
              >
                Add to Cart — ₹{finalPrice}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
