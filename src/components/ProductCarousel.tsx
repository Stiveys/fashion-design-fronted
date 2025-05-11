import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductCarouselProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onQuickView }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {/* Left scroll button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-4 group-hover:translate-x-0 disabled:opacity-0"
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Product carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Add global CSS to hide scrollbar */}
        <style>
          {`
            /* Hide scrollbar for Chrome, Safari and Opera */
            div[class*="overflow-x-auto"]::-webkit-scrollbar {
              display: none;
            }

            /* Hide scrollbar for IE, Edge and Firefox */
            div[class*="overflow-x-auto"] {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `}
        </style>

        {products.map(product => (
          <div key={product.id} className="flex-none w-[280px] snap-start">
            <ProductCard product={product} onQuickView={onQuickView} />
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0 disabled:opacity-0"
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ProductCarousel;