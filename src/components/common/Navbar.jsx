import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import { categoriesList } from '../../data/products';
import {
  Search,
  ShoppingCart,
  MapPin,
  ChevronDown,
  Menu,
  User,
  LogOut,
  Package,
  Heart
} from 'lucide-react';

const Navbar = ({ onOpenMobileMenu }) => {
  const navigate = useNavigate();
  const { totalCount } = useCart();
  const { user, logout } = useAuth();
  const { location, openModal } = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('q', searchQuery.trim());
    if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <header className="bg-[#131921] text-white  top-0 z-40 select-none shadow-md">
      {/* Top Navbar Row */}
      <div className="max-w-[1550px] mx-auto px-2 sm:px-4 h-[60px] flex items-center justify-between gap-2 lg:gap-4">
        
        {/* Left: Mobile Menu & Brand Logo */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={onOpenMobileMenu}
            className="p-1.5 hover:outline-1 hover:outline-white rounded-xs text-gray-200 hover:text-white md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo / Wordmark */}
          <Link
            to="/"
            className="flex items-center p-1.5 hover:outline-1 hover:outline-white rounded-xs transition-all group"
          >
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans lowercase">amazon</span>
                <span className="text-[11px] text-[#ccc] font-normal ml-0.5">.in</span>
              </div>
              {/* Smile curve accent */}
              <div className="w-full flex justify-start -mt-0.5">
                <svg className="w-16 h-2 text-[#FF9900]" viewBox="0 0 70 8" fill="none">
                  <path d="M2 2C22 7 48 7 68 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M60 4L68 2L64 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Delivery Location selector (Desktop) */}
        <div
          onClick={openModal}
          className="hidden md:flex items-center gap-1 p-1.5 hover:outline-1 hover:outline-white rounded-xs cursor-pointer text-left shrink-0 transition-all"
          title="Change delivery location"
        >
          <MapPin className="w-4 h-4 text-white mt-2 shrink-0" />
          <div className="text-[12px] leading-tight">
            <span className="text-[#ccc] block text-[11px]">
              Delivering to {location.city} {location.pincode}
            </span>
            <span className="font-bold text-white block text-[13px] hover:text-[#FF9900]">
              Update location
            </span>
          </div>
        </div>

        {/* Search Bar (Desktop / Tablet) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden sm:flex flex-1 max-w-[850px] items-center h-10 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#FF9900] shadow-inner"
        >
          {/* Category Dropdown */}
          <div className="relative bg-[#e6e6e6] hover:bg-[#dadada] text-[#0f1111] h-full flex items-center border-r border-[#cdcdcd] transition-colors">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-[12px] font-normal pl-2 pr-6 h-full cursor-pointer appearance-none outline-none focus:outline-none"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat} className="bg-white text-gray-900">
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-1.5 pointer-events-none" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Amazon.in (e.g. laptop, redmi, kurtas, headphones...)"
            className="flex-1 px-3 text-[14px] text-gray-900 placeholder-gray-500 outline-none h-full bg-white"
          />

          {/* Search Submit Button */}
          <button
            type="submit"
            className="bg-[#febd69] hover:bg-[#f3a847] text-[#131921] h-full px-4 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Submit search"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Language selector (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 p-1.5 hover:outline-1 hover:outline-white rounded-xs cursor-pointer">
            <span className="text-base">🇮🇳</span>
            <span className="text-[13px] font-bold text-white">EN</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          {/* Account & Lists Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsAccountMenuOpen(true)}
            onMouseLeave={() => setIsAccountMenuOpen(false)}
          >
            <Link
              to={user ? "/orders" : "/login"}
              className="flex flex-col justify-center p-1.5 hover:outline-1 hover:outline-white rounded-xs leading-tight transition-all"
            >
              <span className="text-[11px] text-[#ccc] block truncate max-w-[110px]">
                {user ? `Hello, ${user.name}` : 'Hello, sign in'}
              </span>
              <div className="flex items-center gap-0.5">
                <span className="text-[13px] font-bold text-white block">
                  Account &amp; Lists
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
            </Link>

            {/* Hover Account Popover */}
            {isAccountMenuOpen && (
              <div className="absolute right-0 top-full pt-1.5 w-64 z-50 animate-fadeIn">
                <div className="bg-white text-gray-900 rounded-sm shadow-2xl border border-gray-200 p-4">
                  {!user ? (
                    <div className="text-center pb-3 border-b border-gray-200">
                      <Link
                        to="/login"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="block w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-medium py-1.5 rounded-md text-xs shadow-xs mb-2 transition-colors"
                      >
                        Sign in
                      </Link>
                      <p className="text-[11px] text-gray-600">
                        New customer?{' '}
                        <Link
                          to="/register"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="text-[#007185] hover:text-[#c7511f] hover:underline"
                        >
                          Start here.
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div className="pb-2 border-b border-gray-200">
                      <div className="font-bold text-sm text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  )}

                  <div className="pt-2 space-y-1 text-xs">
                    <Link
                      to="/orders"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-2 py-1.5 px-2 hover:bg-gray-100 rounded-xs text-gray-700 hover:text-gray-900"
                    >
                      <Package className="w-4 h-4 text-gray-500" />
                      Your Orders
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-2 py-1.5 px-2 hover:bg-gray-100 rounded-xs text-gray-700 hover:text-gray-900"
                    >
                      <ShoppingCart className="w-4 h-4 text-gray-500" />
                      Shopping Cart
                    </Link>

                    {user && (
                      <button
                        onClick={() => {
                          logout();
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 py-1.5 px-2 hover:bg-gray-100 rounded-xs text-red-600 hover:text-red-700 text-left mt-2 border-t border-gray-100 pt-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <Link
            to="/orders"
            className="hidden sm:flex flex-col justify-center p-1.5 hover:outline-1 hover:outline-white rounded-xs leading-tight transition-all"
          >
            <span className="text-[11px] text-[#ccc] block">Returns</span>
            <span className="text-[13px] font-bold text-white block">&amp; Orders</span>
          </Link>

          {/* Cart Icon & Badge */}
          <Link
            to="/cart"
            className="flex items-center p-1.5 hover:outline-1 hover:outline-white rounded-xs transition-all relative group"
            aria-label="View shopping cart"
          >
            <div className="relative flex items-center">
              <ShoppingCart className="w-8 h-8 text-white group-hover:text-amber-300 transition-colors" />
              <span className="absolute -top-1 left-3.5 bg-[#FF9900] text-black font-extrabold text-[12px] px-1.5 py-0.2 rounded-full min-w-5 text-center leading-tight shadow-xs">
                {totalCount}
              </span>
            </div>
            <span className="hidden sm:inline font-bold text-[14px] text-white ml-1 self-end mb-0.5">
              Cart
            </span>
          </Link>

        </div>
      </div>

      {/* Mobile Location Subbar */}
      <div
        onClick={openModal}
        className="md:hidden bg-[#232f3e] px-3 py-1.5 flex items-center gap-1.5 text-xs text-gray-200 cursor-pointer border-t border-gray-700"
      >
        <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
        <span className="truncate">
          Deliver to {location.city} {location.pincode} - <span className="font-semibold text-white underline">Update location</span>
        </span>
      </div>

      {/* Mobile Search Bar Row (Under 640px) */}
      <div className="sm:hidden p-2 bg-[#131921] border-t border-gray-800">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center h-10 rounded-md overflow-hidden bg-white shadow-inner"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Amazon.in..."
            className="flex-1 px-3 text-sm text-gray-900 outline-none"
          />
          <button
            type="submit"
            className="bg-[#febd69] text-[#131921] h-full px-3.5 flex items-center justify-center"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
