import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Truck, Home } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  return (
    <div className="py-6 max-w-3xl mx-auto space-y-6">
      {/* Success Hero Card */}
      <div className="bg-white p-6 sm:p-8 rounded-xs border border-gray-200 shadow-xs text-center space-y-3">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#067D62]">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1111]">
          Thank you, your order has been placed!
        </h1>

        <p className="text-sm text-gray-600">
          A confirmation email has been sent to{' '}
          <span className="font-semibold text-gray-800">{order.user?.email || 'your registered email'}</span>.
        </p>

        <div className="inline-block bg-gray-100 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-gray-800 mt-2">
          Order # {order._id}
        </div>
      </div>

      {/* Order Details Card */}
      <div className="bg-white p-6 rounded-xs border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#067D62]" />
            <span className="font-bold text-sm text-gray-900">
              Estimated Delivery: {order.expectedDelivery || 'Monday, 12 Oct'}
            </span>
          </div>
          <span className="text-xs font-bold text-[#067D62] bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
            {order.status || 'Order Placed'}
          </span>
        </div>

        {/* Shipping details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Shipping Address</h4>
            <p className="font-medium text-gray-800">{order.shippingAddress?.fullName}</p>
            <p>{order.shippingAddress?.flat}, {order.shippingAddress?.street}</p>
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
            <p className="mt-1">Phone: {order.shippingAddress?.phone}</p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-1">Payment &amp; Summary</h4>
            <p>Payment: <span className="font-semibold uppercase">{order.paymentMethod || 'Cash on Delivery'}</span></p>
            <p className="text-base font-bold text-[#B12704] mt-2">
              Total Amount: {formatPrice(order.totalAmount, true)}
            </p>
          </div>
        </div>

        {/* Ordered items */}
        <div className="border-t border-gray-100 pt-4 space-y-2">
          <h4 className="font-bold text-xs text-gray-900 mb-2">Items in this shipment:</h4>
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex gap-3 text-xs items-center bg-gray-50 p-2.5 rounded-sm">
              <img
                src={item.product?.image}
                alt={item.product?.title}
                className="w-12 h-12 object-contain bg-white border border-gray-200 rounded-xs p-1"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{item.product?.title}</div>
                <div className="text-gray-500 text-[11px]">Qty: {item.quantity} • {formatPrice(item.price)} each</div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 pt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
          <Link
            to="/orders"
            className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-5 py-2 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1.5"
          >
            <Package className="w-4 h-4" />
            <span>View Your Orders</span>
          </Link>
          <Link
            to="/"
            className="bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-[#d5d9d9] text-gray-800 px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
