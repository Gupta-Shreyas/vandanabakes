'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  image: string;
  description?: string;
  customizableToppings?: string[];
  cancellationPolicy?: string;
}

export default function ProductCard({
  name,
  price,
  originalPrice,
  rating,
  image,
  description,
  customizableToppings,
  cancellationPolicy
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-shadow border border-[#FFD1DC] flex flex-col"
    >
      <div className="aspect-square bg-[#FFF0F5] rounded-3xl mb-6 relative overflow-hidden flex items-center justify-center">
        <picture className="w-full h-full relative z-10">
           <img src={image} alt={name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
        </picture>
        {/* Fallback Emoji behind the image */}
        <span className="absolute inset-0 flex items-center justify-center text-6xl drop-shadow-md z-0">🎂</span>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-sm text-[#2D1810] z-20">
          <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
          {rating}
        </div>
      </div>

      <div className="flex-grow space-y-4">
        <div>
          <h3 className="text-2xl font-bold font-['Nunito'] text-[#2D1810] mb-1 leading-tight">{name}</h3>
          {description && <p className="text-sm text-[#6B5B53] line-clamp-2">{description}</p>}
        </div>

        {customizableToppings && (
        <div className="flex flex-wrap gap-2">
          {customizableToppings.map(topping => (
            <span key={topping} className="text-xs px-3 py-1 bg-[#FFF0F5] text-[#6B5B53] rounded-full border border-[#FFD1DC]">
              + {topping}
            </span>
          ))}
        </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-[#FFF0F5] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-extrabold text-[#2D1810]">₹{price}</p>
            {originalPrice && (
              <p className="text-lg text-[#6B5B53] line-through decoration-[#E63946] opacity-70">₹{originalPrice}</p>
            )}
          </div>
          <button className="bg-[#E63946] hover:bg-[#c9303c] transition-colors text-white px-5 py-2 md:px-6 md:py-3 rounded-full font-bold shadow-md hover:shadow-lg">
            Customize
          </button>
        </div>
      </div>
    </motion.div>
  );
}
