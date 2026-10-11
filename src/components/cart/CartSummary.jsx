import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { mockProducts } from '../../data/products';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

const CartSummary = () => {
  const navigate = useNavigate();
  const { selectedCount, subtotal, isFreeDeliveryEligible, addToCart } = useCart();
  const [isGift, setIsGift] = useState(false);
  const [isEmiOpen, setIsEmiOpen] = useState(false);

  // Suggested accessories
  const recommendedItems = mockProducts.filter(
    (p) => p._id === 'logitech-mx-master-3s' || p._id === 'boat-airdopes-141-earbuds'
  );

  const handleProceedToBuy = () => {
    if (selectedCount === 0) return;
    navigate('/checkout');
  };

  return (
    <div className="space-y-4">
      {/* Primary Checkout Card */}
      <div className="bg-white p-5 rounded-xs border border-gray-200/90 shadow-xs space-y-4">
        {/* Free Delivery Status Banner */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#067D62] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#067D62]" />
              {isFreeDeliveryEligible ? 'Your order is eligible for FREE Delivery.' : 'Add ₹499 for FREE Delivery.'}
            </span>
            <span className="text-gray-500 text-[11px]">₹499</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#067D62] h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-[#565959]">
            Choose <span className="font-semibold text-gray-800">FREE Delivery</span> option at checkout.
          </p>
        </div>

        {/* Subtotal Display */}
        <div className="border-t border-gray-100 pt-3">
          <div className="text-lg text-[#0F1111]">
            Subtotal ({selectedCount} item{selectedCount !== 1 ? 's' : ''}):{' '}
            <span className="font-bold text-xl text-[#0F1111]">
              {formatPrice(subtotal, true)}
            </span>
          </div>

          {/* Gift Checkbox */}
          <label className="flex items-center gap-2 mt-2 text-xs text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={isGift}
              onChange={(e) => setIsGift(e.target.checked)}
              className="accent-[#ff9900] rounded-xs w-4 h-4"
            />
            <span>This order contains a gift</span>
          </label>
        </div>

        {/* Proceed to Buy Yellow Button */}
        <button
          onClick={handleProceedToBuy}
          disabled={selectedCount === 0}
          className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F2BD00] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-900 py-2.5 px-4 rounded-lg font-medium text-sm shadow-xs border border-[#FCD200] transition-colors cursor-pointer"
        >
          Proceed to Buy
        </button>

        {/* EMI Available Accordion */}
        <div className="border-t border-gray-200 pt-2 text-xs">
          <button
            onClick={() => setIsEmiOpen(!isEmiOpen)}
            className="w-full flex items-center justify-between text-gray-700 font-semibold py-1 hover:text-[#007185]"
          >
            <span>EMI Available</span>
            {isEmiOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {isEmiOpen && (
            <p className="text-[11px] text-gray-600 mt-1 leading-relaxed bg-gray-50 p-2 rounded-xs border border-gray-100">
              No Cost EMI and standard EMI available on major bank credit cards starting from ₹1,758/month.
            </p>
          )}
        </div>
      </div>

      {/* Cross-Sell Recommendations Card */}
      <div className="bg-white p-4 rounded-xs border border-gray-200/90 shadow-xs">
        <h4 className="text-xs font-bold text-gray-900 mb-3">
          Customers who bought items in your cart also bought:
        </h4>

        <div className="space-y-3">
          {recommendedItems.map((rec) => (
            <div key={rec._id} className="flex gap-3 items-center text-xs border-b border-gray-100 pb-2.5 last:border-b-0">
              <Link to={`/product/${rec._id}`} className="w-14 h-14 shrink-0 bg-white p-1 border border-gray-200 rounded-xs">
                <img src={rec.images[0]} alt={rec.title} className="w-full h-full object-contain" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${rec._id}`} className="font-medium text-gray-900 hover:text-[#007185] line-clamp-1">
                  {rec.shortTitle || rec.title}
                </Link>
                <div className="font-bold text-red-700 mt-0.5">{formatPrice(rec.price)}</div>
                <button
                  onClick={() => addToCart(rec, 1)}
                  className="mt-1 text-[11px] bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-2.5 py-0.5 rounded-full font-medium shadow-2xs"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
