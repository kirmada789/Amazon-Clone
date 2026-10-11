import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 4.0, reviewCount = 0, size = 'sm', showCount = true }) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {/* Stars Row */}
      <div className="flex items-center text-[#DE7921]">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const filled = starIndex <= Math.floor(rating);
          const half = !filled && starIndex <= Math.ceil(rating) && rating % 1 >= 0.3;

          return (
            <div key={starIndex} className="relative inline-block">
              <Star
                className={`${iconSize} ${
                  filled
                    ? 'fill-[#DE7921] text-[#DE7921]'
                    : half
                    ? 'fill-[#DE7921] text-[#DE7921] opacity-70'
                    : 'text-gray-300'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Numerical Rating & Review Count */}
      {showCount && (
        <span className="text-xs text-[#007185] hover:text-[#c7511f] font-normal hover:underline cursor-pointer">
          {rating ? Number(rating).toFixed(1) : ''} {reviewCount ? `(${reviewCount.toLocaleString('en-IN')})` : ''}
        </span>
      )}
    </div>
  );
};

export default StarRating;
