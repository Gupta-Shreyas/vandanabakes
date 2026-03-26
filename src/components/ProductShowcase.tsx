import { cakeProducts } from '@/data/bakeryData';
import ProductCard from './ProductCard';

export default function ProductShowcase() {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-xl md:text-2xl font-bold font-['Pacifico'] text-[#E63946]">Bestsellers</h2>
        <p className="text-[#6B5B53] max-w-xl mx-auto">
          Our signature cakes, baked fresh to order using premium ingredients.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cakeProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
