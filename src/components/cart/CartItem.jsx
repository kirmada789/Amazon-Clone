import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice, calculateDiscount } from '../../utils/formatters';
import { Trash2, Plus, Minus, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CartItem = ({ item }) => {
  const { product, quantity, selected } = item;
  const { updateQuantity, removeFromCart, toggleSelect } = useCart();

  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleShare = () => {
    navigator.clipboard?.writeText(`${window.location.origin}/product/${product._id}`);
    toast.success('Product link copied to clipboard!');
  };

  return (
    <div className="py-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 items-start">
      {/* Selection Checkbox */}
      <div className="pt-2">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => toggleSelect(product._id)}
          className="w-4 h-4 rounded-xs border-gray-400 text-[#ff9900] focus:ring-[#ff9900] accent-[#ff9900] cursor-pointer"
        />
      </div>

      {/* Product Image */}
      <Link
        to={`/product/${product._id}`}
        className="w-28 sm:w-36 h-28 sm:h-36 shrink-0 bg-white p-2 rounded-xs flex items-center justify-center border border-gray-100"
      >
        <img
          src={product.images?.[0] || product.image}
          alt={product.title}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&auto=format&fit=crop&q=80';
          }}
        />
      </Link>

      {/* Title, Status, and Controls */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Title */}
          <Link
            to={`/product/${product._id}`}
            className="text-base font-normal text-[#0F1111] hover:text-[#007185] line-clamp-2 leading-snug"
          >
            {product.title}
          </Link>

          {/* Stock */}
          <div className="text-xs font-semibold text-[#067D62] mt-1">
            In stock
          </div>

          {/* Delivery Note */}
          <div className="text-xs text-gray-600 mt-0.5 flex items-center gap-1.5 flex-wrap">
            <span>{product.freeDelivery || 'FREE delivery available at checkout'}</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-xs">
              Fulfilled
            </span>
          </div>

          {/* Gift checkbox */}
          <label className="flex items-center gap-2 mt-1.5 text-xs text-gray-700 cursor-pointer">
            <input type="checkbox" className="accent-[#ff9900] rounded-xs w-3.5 h-3.5" />
            <span>This will be a gift <span className="text-[#007185] hover:underline">Learn more</span></span>
          </label>
        </div>

        {/* Quantity and Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-gray-300 rounded-md bg-[#F0F2F2] shadow-2xs overflow-hidden">
            <button
              onClick={() => updateQuantity(product._id, quantity - 1)}
              className="p-1.5 hover:bg-gray-200 transition-colors cursor-pointer text-gray-700"
              title="Decrease quantity or remove"
            >
              {quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
            </button>

            <span className="px-3 py-1 bg-white font-bold text-gray-900 border-x border-gray-300 min-w-7 text-center">
              {quantity}
            </span>

            <button
              onClick={() => updateQuantity(product._id, quantity + 1)}
              className="p-1.5 hover:bg-gray-200 transition-colors cursor-pointer text-gray-700"
              title="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Separator and Text Links */}
          <div className="flex items-center gap-2 text-[#007185]">
            <span className="text-gray-300">|</span>
            <button
              onClick={() => removeFromCart(product._id)}
              className="hover:text-[#c7511f] hover:underline cursor-pointer"
            >
              Delete
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => {
                removeFromCart(product._id);
                toast.success('Saved for later');
              }}
              className="hover:text-[#c7511f] hover:underline cursor-pointer"
            >
              Save for later
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={handleShare}
              className="hover:text-[#c7511f] hover:underline cursor-pointer flex items-center gap-0.5"
            >
              <Share2 className="w-3 h-3" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Price Column (Right) */}
      <div className="sm:text-right shrink-0 space-y-1">
        {product.festivalDeal && (
          <span className="inline-block bg-[#CC0C39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs">
            Great Indian Festival
          </span>
        )}
        <div className="flex sm:flex-col sm:items-end gap-2 sm:gap-0 items-baseline">
          {discount > 0 && (
            <span className="text-xs font-semibold text-[#CC0C39]">
              -{discount}%
            </span>
          )}
          <span className="text-lg font-bold text-[#0F1111]">
            {formatPrice(product.price * quantity, true)}
          </span>
        </div>
        {product.originalPrice && (
          <div className="text-[11px] text-[#565959]">
            M.R.P.: <span className="line-through">{formatPrice(product.originalPrice * quantity, true)}</span>
          </div>
        )}
        <div className="text-[10px] text-gray-600">
          10% on select bank cards
        </div>
      </div>
    </div>
  );
};

export default CartItem;
