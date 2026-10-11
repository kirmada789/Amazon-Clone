import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import { formatPrice } from '../utils/formatters';
import { ShieldCheck } from 'lucide-react';

const CartPage = () => {
  const {
    cartItems,
    selectedItems,
    selectedCount,
    subtotal,
    toggleSelectAll
  } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const allSelected = cartItems.length > 0 && cartItems.every((i) => i.selected);

  return (
    <div className="space-y-4 py-2">
      {/* Top Banner matching Screenshot 4 */}
      <div className="bg-white p-3 rounded-xs border border-gray-200/90 shadow-2xs flex items-center gap-2 text-xs text-gray-700">
        <ShieldCheck className="w-4 h-4 text-[#007185]" />
        <span>
          Add protection for eligible items and safeguard your electronics against accidental damage.
        </span>
      </div>

      {/* Main Cart Grid: Left Items + Right Summary (Screenshot 4 layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Cart Items (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white p-4 sm:p-6 rounded-xs border border-gray-200/90 shadow-xs">
          
          {/* Header Row */}
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-medium text-[#0F1111]">
                Shopping Cart
              </h1>
              <button
                onClick={() => toggleSelectAll(!allSelected)}
                className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline font-medium cursor-pointer mt-1"
              >
                {allSelected ? 'Deselect all items' : 'Select all items'}
              </button>
            </div>
            <span className="text-xs text-[#565959] font-medium hidden sm:inline">
              Price
            </span>
          </div>

          {/* Cart Items List */}
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.product._id} item={item} />
            ))}
          </div>

          {/* Bottom Subtotal line */}
          <div className="pt-4 text-right">
            <div className="text-base sm:text-lg text-[#0F1111]">
              Subtotal ({selectedCount} item{selectedCount !== 1 ? 's' : ''}):{' '}
              <span className="font-bold text-xl text-[#0F1111]">
                {formatPrice(subtotal, true)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols on lg) */}
        <div className="lg:col-span-4 sticky top-20">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
