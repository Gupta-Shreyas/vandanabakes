'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems, BakeryItem } from '@/data/menu';
import ProductCard from './ProductCard';
import InteractiveWeightSelector from './InteractiveWeightSelector';

const CATEGORIES = ['All', 'Cake', 'Premium Cake', 'Cup Cake', 'Jar Cake'];

export default function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<BakeryItem | null>(null);

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold font-['Pacifico'] text-[#E63946]">Our Menu</h2>
        <p className="text-[#6B5B53] max-w-xl mx-auto font-['Nunito'] text-lg">
          Baked fresh. Crafted with love. Discover your next favorite treat.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`relative px-6 py-3 rounded-full font-bold font-['Nunito'] transition-all ${
              selectedCategory === category 
              ? 'text-white shadow-lg shadow-[#E63946]/30' 
              : 'bg-white text-[#6B5B53] hover:bg-[#FFF0F5] border border-[#FFD1DC]'
            }`}
          >
            {selectedCategory === category && (
              <motion.div
                layoutId="category-pill"
                className="absolute inset-0 bg-[#E63946] rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode='popLayout'>
          {filteredItems.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Product Detail Modal */}
      <InteractiveWeightSelector 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
}
