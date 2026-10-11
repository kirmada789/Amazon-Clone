import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const DealQuadrantCard = ({ title, items, linkText = 'See all deals', linkTo = '/search' }) => {
  return (
    <div className="bg-white p-4 rounded-xs shadow-xs border border-gray-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        {/* Card Title */}
        <Link
          to={linkTo}
          className="group flex items-center justify-between text-base sm:text-lg font-bold text-[#0F1111] mb-3 hover:text-[#007185]"
        >
          <span>{title}</span>
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* 2x2 Quadrant Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {items.map((item, idx) => (
            <Link
              key={idx}
              to={item.link || linkTo}
              className="group/item flex flex-col space-y-1"
            >
              <div className="bg-gray-100 rounded-sm overflow-hidden aspect-square flex items-center justify-center p-1.5 border border-gray-100">
                <img
                  src={item.image}
                  alt={item.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300 rounded-xs"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
              <span className="text-[12px] font-medium text-gray-800 line-clamp-1 group-hover/item:text-[#007185]">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Action Link */}
      <div className="mt-4 pt-2 border-t border-gray-100">
        <Link
          to={linkTo}
          className="text-xs font-semibold text-[#007185] hover:text-[#c7511f] hover:underline"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default DealQuadrantCard;
