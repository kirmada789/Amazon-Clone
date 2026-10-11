import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductCarousel = ({ title, products = [], linkTo = '/search', linkText = 'See all deals' }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xs border border-gray-200/90 shadow-xs relative">
      {/* Header Row */}
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-[#0F1111] tracking-tight">
          {title}
        </h3>
        <Link
          to={linkTo}
          className="text-xs sm:text-sm font-semibold text-[#007185] hover:text-[#c7511f] hover:underline"
        >
          {linkText}
        </Link>
      </div>

      {/* Navigation Chevrons */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-20 bg-white/90 hover:bg-white text-gray-800 items-center justify-center rounded-r-md shadow-md border border-gray-300 transition-all cursor-pointer opacity-80 hover:opacity-100"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-20 bg-white/90 hover:bg-white text-gray-800 items-center justify-center rounded-l-md shadow-md border border-gray-300 transition-all cursor-pointer opacity-80 hover:opacity-100"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Product items scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
      >
        {products.map((product) => (
          <div key={product._id} className="w-[230px] sm:w-[250px] shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
