// Utility functions for Indian marketplace currency and dates

/**
 * Format a number as Indian Currency (INR)
 * e.g., 49990 -> ₹49,990
 */
export const formatPrice = (amount, includeDecimal = false) => {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  const num = Number(amount);
  
  if (includeDecimal) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  return '₹' + num.toLocaleString('en-IN');
};

/**
 * Calculate percentage discount between original price and current price
 */
export const calculateDiscount = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

/**
 * Get dynamic estimated delivery string for Indian dates
 */
export const getDeliveryEstimate = (daysToAdd = 2) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return date.toLocaleDateString('en-IN', options);
};
