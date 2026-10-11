import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { formatPrice } from '../utils/formatters';
import {
  MapPin,
  CreditCard,
  ShieldCheck,
  Truck,
  CheckCircle,
  AlertCircle,
  Lock
} from 'lucide-react';

const indianStates = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab',
  'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Jharkhand'
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { selectedItems, subtotal, clearCart } = useCart();
  const { user, shippingAddress, updateShippingAddress } = useAuth();

  const [addressForm, setAddressForm] = useState(shippingAddress);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (selectedItems.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xs border border-gray-200 text-center my-8 max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-2">No items selected for checkout</h2>
        <p className="text-xs text-gray-600 mb-4">Please return to your cart and select items to proceed.</p>
        <Link to="/cart" className="bg-[#ffd814] px-5 py-2 rounded-full text-xs font-semibold">
          Return to Cart
        </Link>
      </div>
    );
  }

  const validate = () => {
    const err = {};
    if (!addressForm.fullName?.trim()) err.fullName = 'Enter full name';
    if (!addressForm.phone?.trim() || addressForm.phone.length < 10) err.phone = 'Enter 10-digit mobile number';
    if (!addressForm.flat?.trim()) err.flat = 'Enter flat/house no.';
    if (!addressForm.street?.trim()) err.street = 'Enter street address';
    if (!addressForm.city?.trim()) err.city = 'Enter city';
    if (!addressForm.state?.trim()) err.state = 'Select state';
    if (!addressForm.pincode?.trim() || addressForm.pincode.length !== 6) err.pincode = 'Enter 6-digit PIN code';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    updateShippingAddress(addressForm);

    const orderPayload = {
      user: user ? { name: user.name, email: user.email } : { name: addressForm.fullName, email: 'guest@amazon.in' },
      shippingAddress: addressForm,
      paymentMethod,
      items: selectedItems.map((item) => ({
        product: {
          _id: item.product._id,
          title: item.product.title,
          price: item.product.price,
          image: item.product.images?.[0] || item.product.image
        },
        quantity: item.quantity,
        price: item.product.price
      })),
      subtotal,
      shippingFee: 0,
      totalAmount: subtotal,
    };

    const res = await orderService.createOrder(orderPayload);
    setLoading(false);

    if (res.success) {
      clearCart();
      navigate('/order-success', { state: { order: res.order } });
    }
  };

  return (
    <div className="py-4">
      {/* Checkout Header */}
      <div className="bg-white p-4 rounded-xs border border-gray-200/90 shadow-2xs mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-baseline">
            <span className="text-2xl font-black text-[#131921] font-sans lowercase">amazon</span>
            <span className="text-xs text-gray-500 ml-0.5">.in</span>
          </Link>
          <span className="text-xl font-light text-gray-400 mx-2">|</span>
          <h1 className="text-xl sm:text-2xl font-normal text-gray-900">
            Checkout ({selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''})
          </h1>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Lock className="w-4 h-4 text-[#007185]" />
          <span className="hidden sm:inline">256-bit Secure Checkout</span>
        </div>
      </div>

      {/* Main Grid: Forms Left + Order Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form Sections (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* 1. Delivery Address Card */}
          <div className="bg-white p-5 rounded-xs border border-gray-200/90 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200">
              <span className="w-6 h-6 rounded-full bg-[#131921] text-white flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#0F1111]">
                Delivery Address
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-gray-800 mb-1">Full Name</label>
                <input
                  type="text"
                  value={addressForm.fullName || ''}
                  onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                  placeholder="e.g. Arib Khan"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-sm outline-none focus:border-[#ff9900]"
                />
                {errors.fullName && <p className="text-red-600 text-[11px] mt-0.5">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">Mobile Number (10 digits)</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={addressForm.phone || ''}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value.replace(/\D/g, '') })}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-sm outline-none focus:border-[#ff9900]"
                />
                {errors.phone && <p className="text-red-600 text-[11px] mt-0.5">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-800 mb-1">Flat, House no., Building, Company, Apartment</label>
                <input
                  type="text"
                  value={addressForm.flat || ''}
                  onChange={(e) => setAddressForm({ ...addressForm, flat: e.target.value })}
                  placeholder="e.g. Flat 402, Royal Palms Residency"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-sm outline-none focus:border-[#ff9900]"
                />
                {errors.flat && <p className="text-red-600 text-[11px] mt-0.5">{errors.flat}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-800 mb-1">Area, Street, Sector, Village</label>
                <input
                  type="text"
                  value={addressForm.street || ''}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  placeholder="e.g. Main Road, Bartand"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-sm outline-none focus:border-[#ff9900]"
                />
                {errors.street && <p className="text-red-600 text-[11px] mt-0.5">{errors.street}</p>}
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">Town / City</label>
                <input
                  type="text"
                  value={addressForm.city || ''}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  placeholder="e.g. Dhanbad"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-sm outline-none focus:border-[#ff9900]"
                />
                {errors.city && <p className="text-red-600 text-[11px] mt-0.5">{errors.city}</p>}
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">State</label>
                <select
                  value={addressForm.state || 'Jharkhand'}
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-sm outline-none focus:border-[#ff9900] bg-white cursor-pointer"
                >
                  {indianStates.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                {errors.state && <p className="text-red-600 text-[11px] mt-0.5">{errors.state}</p>}
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">6 digits PIN code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={addressForm.pincode || ''}
                  onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value.replace(/\D/g, '') })}
                  placeholder="e.g. 828109"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-sm outline-none focus:border-[#ff9900]"
                />
                {errors.pincode && <p className="text-red-600 text-[11px] mt-0.5">{errors.pincode}</p>}
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  value={addressForm.landmark || ''}
                  onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                  placeholder="e.g. Near City Centre"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-sm outline-none focus:border-[#ff9900]"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method Card (Demo Mode) */}
          <div className="bg-white p-5 rounded-xs border border-gray-200/90 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200">
              <span className="w-6 h-6 rounded-full bg-[#131921] text-white flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#0F1111]">
                Payment Method (Demo Mode)
              </h2>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-900 mb-3">
              ℹ️ <strong>Demo Notice:</strong> No real payment is required or processed. Select your simulated payment method below to complete the test purchase.
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-0.5 accent-[#ff9900]"
                />
                <div>
                  <div className="font-bold text-gray-900">Cash on Delivery / Pay on Delivery (Recommended)</div>
                  <div className="text-gray-500 text-[11px]">Pay via cash, UPI, or card when your package arrives at your doorstep.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mt-0.5 accent-[#ff9900]"
                />
                <div>
                  <div className="font-bold text-gray-900">UPI (Google Pay, PhonePe, Paytm, BHIM)</div>
                  <div className="text-gray-500 text-[11px]">Simulated instant transfer via virtual payment address.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-0.5 accent-[#ff9900]"
                />
                <div>
                  <div className="font-bold text-gray-900">Credit or Debit Card (Demo)</div>
                  <div className="text-gray-500 text-[11px]">Simulated sandbox card transaction without asking for real card details.</div>
                </div>
              </label>
            </div>
          </div>

          {/* 3. Review Items Card */}
          <div className="bg-white p-5 rounded-xs border border-gray-200/90 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200">
              <span className="w-6 h-6 rounded-full bg-[#131921] text-white flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#0F1111]">
                Review items and delivery
              </h2>
            </div>

            <div className="space-y-3">
              {selectedItems.map((item) => (
                <div key={item.product._id} className="flex gap-3 text-xs border-b border-gray-100 pb-3 last:border-b-0">
                  <img
                    src={item.product.images?.[0] || item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 object-contain bg-white border border-gray-200 rounded-xs p-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 line-clamp-1">{item.product.title}</div>
                    <div className="text-gray-500 text-[11px] mt-0.5">Quantity: {item.quantity}</div>
                    <div className="font-bold text-gray-900 mt-1">{formatPrice(item.product.price * item.quantity)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Order Summary (4 cols) */}
        <div className="lg:col-span-4 sticky top-20">
          <div className="bg-white p-5 rounded-xs border border-gray-200/90 shadow-xs space-y-4">
            
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F2BD00] disabled:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium text-sm shadow-xs border border-[#FCD200] transition-colors cursor-pointer"
            >
              {loading ? 'Processing Order...' : 'Place Your Order in Demo Mode'}
            </button>

            <p className="text-[11px] text-gray-500 text-center leading-tight">
              By placing your order, you agree to Amazon's privacy notice and conditions of use.
            </p>

            <hr className="border-gray-200" />

            <h3 className="font-bold text-sm text-gray-900">Order Summary</h3>

            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>Items ({selectedItems.length}):</span>
                <span>{formatPrice(subtotal, true)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="text-[#067D62] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Promotion Applied:</span>
                <span className="text-[#067D62]">₹0.00</span>
              </div>

              <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-bold text-[#B12704]">
                <span>Order Total:</span>
                <span>{formatPrice(subtotal, true)}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-xs border border-gray-200 text-[11px] text-gray-600 space-y-1">
              <div className="font-semibold text-gray-900">Guaranteed Delivery:</div>
              <div>Estimated by Monday, 12 October with Fast Delivery.</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
