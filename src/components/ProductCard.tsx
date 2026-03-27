'use client';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { BakeryItem } from '@/data/menu';

interface ProductCardProps {
  product: BakeryItem;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  // If it's a jar or cupcake, price is just the single variant.
  // If cake, we show "Starts from ₹..."
  const lowestPrice = Math.min(...product.variants.map(v => v.price));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer border border-[#FFD1DC] flex flex-col"
    >
      {/* HighResZoom Image Container */}
      <div className="aspect-square bg-[#FFF0F5] rounded-[1.5rem] mb-6 relative overflow-hidden flex items-center justify-center">
        <picture className="w-full h-full relative z-10 overflow-hidden">
           <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" 
            onError={(e) => { e.currentTarget.style.opacity = '0.5' }} 
          />
        </picture>
        
        {/* Placeholder Emoji behind the image */}
        <span className="absolute inset-0 flex items-center justify-center text-6xl drop-shadow-md z-0">🎂</span>

        {/* Dietary Badges */}
        {product.isEggless && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm z-20" title="Eggless / 100% Veg">
            <Leaf className="w-4 h-4 text-green-500 fill-green-500" />
          </div>
        )}

      </div>

      <div className="p-5 flex flex-col gap-1 flex-grow">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-[#E63946] font-['Nunito'] mb-1 block">
            {product.category}
          </span>
          <h3 className="text-2xl font-bold font-['Nunito'] text-[#2D1810] leading-tight">{product.name}</h3>
        </div>

        {/* Variants Preview */}
        <div className="flex flex-wrap gap-2">
          {product.variants.map(v => (
            <span key={v.size} className="text-xs px-3 py-1 bg-[#FFF0F5] text-[#6B5B53] font-bold rounded-full border border-[#FFD1DC]">
              {v.size}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#FFD1DC] flex items-center justify-between">
        <div>
          {product.variants.length > 1 && <span className="text-xs text-[#6B5B53] font-bold">Starts at</span>}
          <p className="text-2xl font-extrabold text-[#2D1810]">₹{lowestPrice}</p>
        </div>
        <button className="bg-[#E63946] shrink-0 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-md shadow-[#E63946]/30 group-hover:bg-[#c9303c] transition-colors">
          +
        </button>
      </div>
    </motion.div>
  );
}
