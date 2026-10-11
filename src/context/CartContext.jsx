import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('amazon_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('amazon_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        toast.success(`Updated quantity for ${product.shortTitle || product.title.slice(0, 30)}...`, {
          icon: '🛒',
          style: {
            borderRadius: '6px',
            background: '#131921',
            color: '#fff',
            fontSize: '13px'
          }
        });
        return updated;
      } else {
        toast.success(`Added to Cart: ${product.shortTitle || product.title.slice(0, 30)}...`, {
          icon: '✅',
          style: {
            borderRadius: '6px',
            background: '#131921',
            color: '#fff',
            fontSize: '13px'
          }
        });
        return [...prevItems, { product, quantity, selected: true }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.product._id === productId);
      if (itemToRemove) {
        toast('Item removed from Shopping Cart', {
          icon: '🗑️',
          style: {
            borderRadius: '6px',
            background: '#37475A',
            color: '#fff',
            fontSize: '13px'
          }
        });
      }
      return prevItems.filter((item) => item.product._id !== productId);
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleSelect = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = (selectState) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: selectState }))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const selectedItems = cartItems.filter((item) => item.selected);
  const selectedCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = selectedItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const originalSubtotal = selectedItems.reduce(
    (acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );

  const savings = Math.max(0, originalSubtotal - subtotal);
  const isFreeDeliveryEligible = subtotal >= 499;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCount,
        selectedItems,
        selectedCount,
        subtotal,
        originalSubtotal,
        savings,
        isFreeDeliveryEligible,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSelect,
        toggleSelectAll,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
