import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HelpCircle, Search, Home } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="py-12 px-4 max-w-2xl mx-auto text-center space-y-6">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-[#e77600]">
        <HelpCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1111]">
          Looking for something?
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          We're sorry. The Web address you entered is not a functioning page on our site.
        </p>
      </div>

      {/* Quick Search Box */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex items-center shadow-xs">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Amazon for items..."
          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-l-md outline-none focus:border-[#ff9900]"
        />
        <button
          type="submit"
          className="bg-[#febd69] hover:bg-[#f3a847] px-4 py-2 rounded-r-md text-gray-900 flex items-center justify-center"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold px-6 py-2.5 rounded-full text-xs shadow-xs transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Go to Amazon's Home Page</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
