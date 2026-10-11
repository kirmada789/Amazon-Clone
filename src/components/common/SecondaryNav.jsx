import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sparkles, ChevronRight } from 'lucide-react';

const SecondaryNav = ({ onOpenMobileMenu }) => {
  const navLinks = [
    { label: 'Today\'s Deals', path: '/search?deal=festival' },
    { label: 'Mobiles', path: '/search?category=Mobiles' },
    { label: 'Electronics', path: '/search?category=Electronics' },
    { label: 'Computers', path: '/search?category=Laptops' },
    { label: 'Fashion', path: '/search?category=Fashion' },
    { label: 'Home & Kitchen', path: '/search?category=Home & Kitchen' },
    { label: 'Amazon Pay', path: '/search?deal=pay' },
    { label: 'New Releases', path: '/search?sort=newest' },
    { label: 'Customer Service', path: '/orders' },
  ];

  return (
    <nav className="bg-[#232F3E] text-white text-[13px] border-t border-gray-700/50">
      <div className="max-w-[1550px] mx-auto px-2 sm:px-4 h-[39px] flex items-center justify-between overflow-x-auto no-scrollbar">
        {/* Left Links */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* All Button */}
          <button
            onClick={onOpenMobileMenu}
            className="flex items-center gap-1 px-2 py-1 hover:outline-1 hover:outline-white rounded-xs font-bold text-white shrink-0 cursor-pointer"
          >
            <Menu className="w-4 h-4" />
            <span>All</span>
          </button>

          {/* Nav Items */}
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="px-2 py-1 hover:outline-1 hover:outline-white rounded-xs text-[#fff] hover:text-[#fff] whitespace-nowrap text-[13px] font-medium transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Festival Banner Promo (Desktop) */}
        <Link
          to="/search?deal=festival"
          className="hidden xl:flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-xs text-amber-300 hover:text-white font-bold text-xs shrink-0 group transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Great Indian Festival | Live Now</span>
          <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
        </Link>
      </div>
    </nav>
  );
};

export default SecondaryNav;
