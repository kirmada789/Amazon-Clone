import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { formatPrice } from '../utils/formatters';
import { Package, Truck, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await orderService.getMyOrders();
      if (res.success) {
        setOrders(res.orders);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <div className="py-4 space-y-4 max-w-4xl mx-auto">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-3">
        <h1 className="text-2xl font-normal text-[#0F1111]">Your Orders</h1>
        <div className="text-xs text-gray-500">
          {orders.length} order{orders.length !== 1 ? 's' : ''} placed
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-12 text-center rounded-xs border border-gray-200">
          <div className="w-8 h-8 border-3 border-[#ff9900] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-600">Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-12 rounded-xs border border-gray-200 text-center space-y-4">
          <Package className="w-16 h-16 text-gray-400 mx-auto" />
          <h2 className="text-lg font-bold text-gray-900">No orders placed yet</h2>
          <p className="text-xs text-gray-600 max-w-md mx-auto">
            You have not placed any orders yet. Check out today's Great Indian Festival deals to find great savings.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold px-6 py-2.5 rounded-full text-xs transition-colors shadow-xs"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-md border border-gray-200/90 shadow-2xs overflow-hidden">
              {/* Order Metadata Header */}
              <div className="bg-gray-100/80 px-4 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-gray-500">Order Placed</span>
                    <span className="font-medium text-gray-900">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Today'}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-gray-500">Total</span>
                    <span className="font-bold text-gray-900">{formatPrice(order.totalAmount, true)}</span>
                  </div>

                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-gray-500">Ship To</span>
                    <span className="font-medium text-[#007185] hover:underline cursor-pointer">
                      {order.shippingAddress?.fullName || 'Customer'}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] text-gray-500">Order # {order._id}</span>
                  <div className="text-[11px] text-[#007185] hover:underline cursor-pointer flex items-center justify-end">
                    <span>View invoice</span>
                  </div>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-4 space-y-4">
                {/* Status Bar */}
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#067D62]" />
                  <div>
                    <h3 className="font-bold text-sm text-[#0F1111]">
                      {order.status || 'Order Confirmed'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Estimated delivery: <span className="font-semibold text-gray-800">{order.expectedDelivery || 'Monday, 12 Oct'}</span>
                    </p>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="divide-y divide-gray-100">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="py-3 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      <div className="flex gap-3 items-center">
                        <img
                          src={item.product?.image}
                          alt={item.product?.title}
                          className="w-16 h-16 object-contain bg-white border border-gray-200 rounded-xs p-1"
                        />
                        <div>
                          <Link
                            to={`/product/${item.product?._id}`}
                            className="font-medium text-xs text-[#007185] hover:text-[#c7511f] hover:underline line-clamp-2"
                          >
                            {item.product?.title}
                          </Link>
                          <div className="text-xs text-gray-600 mt-1">
                            Qty: <span className="font-bold text-gray-900">{item.quantity}</span> • Price: <span className="font-bold text-gray-900">{formatPrice(item.price)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <Link
                          to={`/product/${item.product?._id}`}
                          className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-3.5 py-1.5 rounded-full text-xs font-medium shadow-2xs transition-colors"
                        >
                          Buy it again
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
