import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, X, ChevronRight, ShoppingBag, Laptop, Smartphone, Tv, Shirt, Home, Tag } from 'lucide-react';

const MobileMenuDrawer = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-[365px] bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-slideRight">
        {/* User Header */}
        <div className="bg-[#232f3e] text-white px-6 py-4 flex items-center justify-between">
          <Link
            to={user ? "/orders" : "/login"}
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-300">Hello,</div>
              <div className="font-bold text-base text-white">
                {user ? user.name : 'Sign in'}
              </div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Categories Section */}
        <div className="p-4 space-y-6 text-sm text-gray-800">
          <div>
            <h4 className="font-bold text-gray-900 text-base mb-2 px-3">Trending</h4>
            <div className="space-y-1">
              <Link
                to="/search?deal=festival"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-gray-100 font-medium text-amber-700"
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-amber-600" />
                  <span>Great Indian Festival Deals</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/search?deal=bestsellers"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-gray-100"
              >
                <span>Bestsellers</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/search?sort=newest"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-gray-100"
              >
                <span>New Releases</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h4 className="font-bold text-gray-900 text-base mb-2 px-3">Shop by Category</h4>
            <div className="space-y-1">
              <Link
                to="/search?category=Laptops"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Laptop className="w-4 h-4 text-gray-500" />
                  <span>Laptops &amp; Computers</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/search?category=Mobiles"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-gray-500" />
                  <span>Mobiles &amp; Tablets</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/search?category=Electronics"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Tv className="w-4 h-4 text-gray-500" />
                  <span>TV &amp; Electronics</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/search?category=Fashion"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Shirt className="w-4 h-4 text-gray-500" />
                  <span>Men &amp; Women Fashion</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/search?category=Home & Kitchen"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Home className="w-4 h-4 text-gray-500" />
                  <span>Home &amp; Kitchen Appliances</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h4 className="font-bold text-gray-900 text-base mb-2 px-3">Help &amp; Settings</h4>
            <div className="space-y-1">
              <Link
                to="/orders"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-gray-100"
              >
                <span>Your Orders</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-gray-100"
              >
                <span>Your Shopping Cart</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2.5 text-red-600 font-semibold hover:bg-red-50 rounded-sm"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={onClose}
                  className="block px-3 py-2.5 text-[#007185] font-semibold hover:bg-blue-50 rounded-sm"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuDrawer;
