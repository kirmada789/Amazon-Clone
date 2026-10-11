import React from 'react';
import { formatPrice, calculateDiscount } from '../../utils/formatters';

export const PriceTag = ({ price, originalPrice, size = 'md' }) => {
  const discount = calculateDiscount(price, originalPrice);

  if (size === 'lg') {
    return (
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          {discount > 0 && (
            <span className="text-2xl font-light text-[#CC0C39]">
              -{discount}%
            </span>
          )}
          <span className="text-3xl font-bold text-[#0F1111] tracking-tight">
            {formatPrice(price)}
          </span>
        </div>
        {originalPrice && originalPrice > price && (
          <div className="text-xs text-[#565959]">
            M.R.P.: <span className="line-through">{formatPrice(originalPrice)}</span>
          </div>
        )}
      </div>
    );
  }

  if (size === 'sm') {
    return (
      <div className="leading-tight">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-bold text-[#0F1111]">
            {formatPrice(price)}
          </span>
          {discount > 0 && (
            <span className="text-xs font-semibold text-[#CC0C39]">
              ({discount}% off)
            </span>
          )}
        </div>
        {originalPrice && originalPrice > price && (
          <div className="text-[11px] text-[#565959]">
            M.R.P.: <span className="line-through">{formatPrice(originalPrice)}</span>
          </div>
        )}
      </div>
    );
  }

  // Default 'md'
  return (
    <div className="leading-tight">
      <div className="flex items-baseline gap-2 flex-wrap">
        {discount > 0 && (
          <span className="text-lg font-normal text-[#CC0C39]">
            -{discount}%
          </span>
        )}
        <span className="text-xl font-bold text-[#0F1111]">
          {formatPrice(price)}
        </span>
      </div>
      {originalPrice && originalPrice > price && (
        <div className="text-xs text-[#565959]">
          M.R.P.: <span className="line-through">{formatPrice(originalPrice)}</span>
        </div>
      )}
    </div>
  );
};

export const PrimeBadge = () => {
  return (
    <span className="inline-flex items-center text-xs font-bold text-[#007185] italic tracking-tight">
      <span className="text-[#00A8E1] font-black not-italic text-sm mr-0.5">✓</span>prime
    </span>
  );
};

export const DealBadge = ({ text = "Great Indian Festival" }) => {
  return (
    <span className="inline-block bg-[#CC0C39] text-white text-[11px] font-bold px-2 py-0.5 rounded-xs tracking-wide">
      {text}
    </span>
  );
};

export const ChoiceBadge = ({ keyword = "Laptop" }) => {
  return (
    <div className="inline-flex items-center bg-[#232F3E] text-white text-[11px] font-medium rounded-xs overflow-hidden shadow-xs">
      <span className="bg-[#E77600] text-black font-extrabold px-1.5 py-0.5 text-[10px] tracking-tight">
        Amazon's
      </span>
      <span className="px-2 py-0.5 text-white font-semibold">
        Choice <span className="text-gray-300 font-normal">for "{keyword}"</span>
      </span>
    </div>
  );
};
