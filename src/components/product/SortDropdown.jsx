import React from 'react';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Avg. Customer Review' },
  { value: 'newest', label: 'Newest Arrivals' }
];

const SortDropdown = ({ currentSort = 'featured', onSortChange }) => {
  return (
    <div className="relative inline-flex items-center text-xs text-gray-800">
      <span className="text-[#565959] mr-1.5 hidden sm:inline">Sort by:</span>
      <div className="relative bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-[#d5d9d9] rounded-md shadow-xs">
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-transparent pl-3 pr-7 py-1.5 font-medium text-gray-900 cursor-pointer outline-none text-xs"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-2 pointer-events-none" />
      </div>
    </div>
  );
};

export default SortDropdown;
