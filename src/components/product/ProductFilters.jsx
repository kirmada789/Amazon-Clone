import React, { useState } from 'react';
import { brandsList } from '../../data/products';
import { Star, X, Check } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

const priceRanges = [
  { label: 'Under ₹20,000', min: '', max: 20000 },
  { label: '₹20,000 - ₹40,000', min: 20000, max: 40000 },
  { label: '₹40,000 - ₹60,000', min: 40000, max: 60000 },
  { label: '₹60,000 - ₹80,000', min: 60000, max: 80000 },
  { label: 'Over ₹80,000', min: 80000, max: '' },
];

const ProductFilters = ({
  selectedBrands = [],
  onBrandToggle,
  minPrice = '',
  maxPrice = '',
  onPriceChange,
  festivalOnly = false,
  onFestivalToggle,
  freeDeliveryOnly = false,
  onFreeDeliveryToggle,
  minRating = '',
  onRatingChange,
  onClearFilters,
  isMobileOpen = false,
  onMobileClose
}) => {
  const [customMin, setCustomMin] = useState(minPrice);
  const [customMax, setCustomMax] = useState(maxPrice);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const handleCustomPriceSubmit = (e) => {
    e.preventDefault();
    onPriceChange(customMin, customMax);
  };

  const displayedBrands = showAllBrands ? brandsList : brandsList.slice(0, 6);

  const filterContent = (
    <div className="space-y-6 text-xs text-[#0F1111]">
      {/* Deals & Discounts */}
      <div>
        <h4 className="font-bold text-sm text-gray-900 mb-2">Deals &amp; Discounts</h4>
        <label className="flex items-center gap-2 cursor-pointer hover:text-[#c7511f]">
          <input
            type="checkbox"
            checked={festivalOnly}
            onChange={(e) => onFestivalToggle(e.target.checked)}
            className="w-4 h-4 rounded-xs border-gray-400 text-[#ff9900] focus:ring-[#ff9900] accent-[#ff9900]"
          />
          <span className="font-medium text-gray-800">Great Indian Festival Deals</span>
        </label>
      </div>

      {/* Eligible for Free Delivery */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-bold text-sm text-gray-900 mb-2">Eligible for Free Delivery</h4>
        <label className="flex items-center gap-2 cursor-pointer hover:text-[#c7511f]">
          <input
            type="checkbox"
            checked={freeDeliveryOnly}
            onChange={(e) => onFreeDeliveryToggle(e.target.checked)}
            className="w-4 h-4 rounded-xs border-gray-400 text-[#ff9900] focus:ring-[#ff9900] accent-[#ff9900]"
          />
          <div className="text-xs">
            <span className="font-medium text-gray-800">Free Shipping</span>
            <span className="block text-[11px] text-[#565959]">Get FREE Shipping on eligible orders</span>
          </div>
        </label>
      </div>

      {/* Brands */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-bold text-sm text-gray-900 mb-2">Brands</h4>
        <div className="space-y-1.5">
          {displayedBrands.map((brand) => {
            const isChecked = selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-2 cursor-pointer hover:text-[#c7511f]"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onBrandToggle(brand)}
                  className="w-4 h-4 rounded-xs border-gray-400 text-[#ff9900] focus:ring-[#ff9900] accent-[#ff9900]"
                />
                <span className="font-normal text-gray-800">{brand}</span>
              </label>
            );
          })}
        </div>
        {brandsList.length > 6 && (
          <button
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="mt-2 text-xs font-semibold text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer"
          >
            {showAllBrands ? '▲ See less' : '▼ See more'}
          </button>
        )}
      </div>

      {/* Price */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-bold text-sm text-gray-900 mb-2">Price</h4>
        <div className="space-y-1 mb-3">
          {priceRanges.map((r, i) => (
            <button
              key={i}
              onClick={() => {
                setCustomMin(r.min);
                setCustomMax(r.max);
                onPriceChange(r.min, r.max);
              }}
              className={`block text-left text-xs hover:text-[#c7511f] hover:underline cursor-pointer ${
                minPrice === r.min && maxPrice === r.max
                  ? 'font-bold text-[#0F1111]'
                  : 'text-gray-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Custom Price Range Inputs */}
        <form onSubmit={handleCustomPriceSubmit} className="flex items-center gap-1.5">
          <input
            type="number"
            placeholder="₹ Min"
            value={customMin}
            onChange={(e) => setCustomMin(e.target.value)}
            className="w-16 px-2 py-1 border border-gray-300 rounded-sm text-xs outline-none focus:border-[#ff9900]"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="₹ Max"
            value={customMax}
            onChange={(e) => setCustomMax(e.target.value)}
            className="w-16 px-2 py-1 border border-gray-300 rounded-sm text-xs outline-none focus:border-[#ff9900]"
          />
          <button
            type="submit"
            className="bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-[#d5d9d9] text-gray-800 px-2.5 py-1 rounded-sm text-xs font-medium cursor-pointer shadow-2xs"
          >
            Go
          </button>
        </form>
      </div>

      {/* Customer Reviews */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-bold text-sm text-gray-900 mb-2">Customer Reviews</h4>
        <div className="space-y-1.5">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              onClick={() => onRatingChange(minRating === stars ? '' : stars)}
              className={`flex items-center gap-1.5 text-xs hover:text-[#c7511f] cursor-pointer ${
                minRating === stars ? 'font-bold' : ''
              }`}
            >
              <div className="flex items-center text-[#DE7921]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= stars
                        ? 'fill-[#DE7921] text-[#DE7921]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-700">&amp; Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear All Filters */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={onClearFilters}
          className="w-full text-center py-2 px-3 border border-gray-300 rounded-md text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-60 shrink-0 pr-4">
        {filterContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={onMobileClose}
          />
          <div className="relative w-80 max-w-[85%] bg-white h-full p-5 overflow-y-auto z-10 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
              <h3 className="font-bold text-base text-gray-900">Filters</h3>
              <button
                onClick={onMobileClose}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;
