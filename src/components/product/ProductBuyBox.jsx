import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';
import { formatPrice } from '../../utils/formatters';
import {
  MapPin,
  Lock,
  RotateCcw,
  Truck,
  ShieldCheck,
  CreditCard,
  ChevronDown
} from 'lucide-react';

const ProductBuyBox = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { location, openModal } = useLocation();

  const [quantity, setQuantity] = useState(1);
  const [exchangeOption, setExchangeOption] = useState('without'); // 'with' | 'without'

  const effectivePrice = exchangeOption === 'with'
    ? Math.max(1000, product.price - 12700)
    : product.price;

  const handleAddToCart = () => {
    addToCart(product, Number(quantity));
  };

  const handleBuyNow = () => {
    addToCart(product, Number(quantity));
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-md border border-[#D5D9D9] p-4 text-xs text-[#0F1111] shadow-xs space-y-3.5">
      {/* Prime Benefit Header */}
      <div className="bg-[#f7fafc] -mx-4 -mt-4 p-3 border-b border-[#D5D9D9] rounded-t-md">
        <div className="flex items-center gap-1.5 text-xs text-[#007185] font-bold">
          <span className="text-[#00A8E1] text-base font-black">✓</span>
          <span>prime</span>
        </div>
        <p className="text-[11px] text-gray-600 mt-0.5">
          Enjoy Unlimited FREE Same-day/1-day delivery
        </p>
      </div>

      {/* Exchange Option Selector (Amazon India Style) */}
      <div className="border border-gray-200 rounded-md p-2.5 space-y-2 bg-gray-50/50">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="radio"
            name="exchange"
            value="with"
            checked={exchangeOption === 'with'}
            onChange={() => setExchangeOption('with')}
            className="mt-0.5 accent-[#ff9900]"
          />
          <div>
            <div className="font-semibold text-gray-900">With Exchange</div>
            <div className="text-[11px] text-[#B12704] font-medium">Up to ₹12,700.00 off</div>
          </div>
        </label>

        <div className="border-t border-gray-200 pt-2">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="exchange"
              value="without"
              checked={exchangeOption === 'without'}
              onChange={() => setExchangeOption('without')}
              className="mt-0.5 accent-[#ff9900]"
            />
            <div>
              <div className="font-semibold text-gray-900">Without Exchange</div>
              <div className="font-bold text-[#B12704] text-sm">
                {formatPrice(product.price)}
                {product.originalPrice && (
                  <span className="text-gray-500 font-normal text-xs line-through ml-1.5">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Delivery Schedule & Countdown */}
      <div className="space-y-1">
        <p className="text-xs text-gray-800 leading-relaxed">
          <span className="font-bold text-[#067D62]">FREE delivery</span>{' '}
          <span className="font-bold">{product.freeDelivery || 'Monday, 12 October'}</span>.
          Order within <span className="text-[#067D62] font-semibold">13 hrs 17 mins</span>.
        </p>

        {/* Delivery Location */}
        <div
          onClick={openModal}
          className="flex items-center gap-1 text-[#007185] hover:text-[#c7511f] cursor-pointer pt-1"
        >
          <MapPin className="w-3.5 h-3.5 text-gray-700 shrink-0" />
          <span className="truncate">
            Delivering to {location.city} {location.pincode} - <span className="underline">Update location</span>
          </span>
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <span className="text-base font-bold text-[#067D62]">In stock</span>
      </div>

      {/* Quantity Dropdown */}
      <div className="flex items-center gap-2">
        <label htmlFor="quantity-select" className="text-xs font-semibold text-gray-700">
          Quantity:
        </label>
        <div className="relative inline-block">
          <select
            id="quantity-select"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-[#d5d9d9] rounded-md px-3 py-1 text-xs font-semibold pr-7 appearance-none cursor-pointer outline-none shadow-2xs"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-gray-600 absolute right-2 top-2 pointer-events-none" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F2BD00] text-gray-900 py-2.5 px-4 rounded-full font-medium text-xs shadow-xs border border-[#FCD200] transition-colors cursor-pointer"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="w-full bg-[#FFA41C] hover:bg-[#FA8900] active:bg-[#F07A00] text-gray-900 py-2.5 px-4 rounded-full font-medium text-xs shadow-xs border border-[#FF8F00] transition-colors cursor-pointer"
        >
          Buy Now
        </button>
      </div>

      {/* Ships from & Sold by Info */}
      <div className="pt-2 border-t border-gray-200 text-[11px] space-y-1 text-gray-600">
        <div className="flex justify-between">
          <span>Ships from</span>
          <span className="font-medium text-gray-900">{product.shipsFrom || 'Amazon'}</span>
        </div>
        <div className="flex justify-between">
          <span>Sold by</span>
          <span className="font-medium text-[#007185] hover:underline cursor-pointer">
            {product.seller || 'Clicktech Retail Private Ltd'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Payment</span>
          <span className="font-medium text-[#007185]">Secure transaction</span>
        </div>
      </div>

      {/* Security badge */}
      <div className="flex items-center gap-1.5 text-[11px] text-[#007185] font-medium pt-1">
        <Lock className="w-3.5 h-3.5 text-gray-500" />
        <span>Secure transaction</span>
      </div>

      {/* Trust Badges 4-Grid */}
      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-gray-200 text-center text-[10px] text-gray-600">
        <div className="flex flex-col items-center">
          <RotateCcw className="w-5 h-5 text-[#007185] mb-1" />
          <span>7 days Replacement</span>
        </div>
        <div className="flex flex-col items-center">
          <Truck className="w-5 h-5 text-[#007185] mb-1" />
          <span>Free Delivery</span>
        </div>
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-5 h-5 text-[#007185] mb-1" />
          <span>1 Year Warranty</span>
        </div>
        <div className="flex flex-col items-center">
          <CreditCard className="w-5 h-5 text-[#007185] mb-1" />
          <span>Pay on Delivery</span>
        </div>
      </div>
    </div>
  );
};

export default ProductBuyBox;
