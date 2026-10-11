import api from './api';

export const orderService = {
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders', orderData);
      return { success: true, order: response.data.order || response.data, source: 'backend' };
    } catch (err) {
      // Local demo order creation
      const localOrders = JSON.parse(localStorage.getItem('amazon_orders') || '[]');
      const newOrder = {
        _id: 'OD-' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(100000 + Math.random() * 900000) + '-' + Math.floor(1000 + Math.random() * 9000),
        createdAt: new Date().toISOString(),
        status: 'Order Confirmed',
        expectedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          weekday: 'long',
          day: 'numeric',
          month: 'short'
        }),
        ...orderData
      };
      localOrders.unshift(newOrder);
      localStorage.setItem('amazon_orders', JSON.stringify(localOrders));
      return { success: true, order: newOrder, source: 'mock' };
    }
  },

  async getMyOrders() {
    try {
      const response = await api.get('/orders/my-orders');
      return { success: true, orders: response.data.orders || response.data, source: 'backend' };
    } catch (err) {
      const localOrders = JSON.parse(localStorage.getItem('amazon_orders') || '[]');
      return { success: true, orders: localOrders, source: 'mock' };
    }
  }
};
