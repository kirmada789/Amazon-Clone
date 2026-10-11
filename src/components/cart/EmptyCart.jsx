import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-xs border border-gray-200 text-center shadow-xs max-w-3xl mx-auto my-6">
      <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#ff9900]">
        <ShoppingCart className="w-10 h-10" />
      </div>

      <h2 className="text-2xl font-bold text-[#0F1111] mb-2">
        Your Amazon Cart is empty
      </h2>

      <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
        Your shopping cart is waiting. Give it purpose — fill it with laptops, phones, electronics, fashion, and festive deals.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold px-6 py-2.5 rounded-full text-sm shadow-xs transition-colors flex items-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/search?deal=festival"
          className="bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-[#d5d9d9] text-gray-800 font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          Explore Great Indian Festival Deals
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
