import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [shippingAddress, setShippingAddress] = useState(() => {
    try {
      const saved = localStorage.getItem('amazon_address');
      return saved ? JSON.parse(saved) : {
        fullName: 'Arib Khan',
        phone: '9876543210',
        flat: 'Flat 402, Royal Palms Residency',
        street: 'Main Road, Bartand',
        landmark: 'Near City Centre',
        city: 'Dhanbad',
        state: 'Jharkhand',
        pincode: '828109',
        isDefault: true
      };
    } catch {
      return {
        fullName: 'Arib Khan',
        phone: '9876543210',
        flat: 'Flat 402, Royal Palms Residency',
        street: 'Main Road, Bartand',
        landmark: 'Near City Centre',
        city: 'Dhanbad',
        state: 'Jharkhand',
        pincode: '828109',
        isDefault: true
      };
    }
  });

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.success) {
      setUser(res.user);
      toast.success(`Welcome back, ${res.user.name || 'Shopper'}!`);
      return { success: true };
    } else {
      toast.error(res.error || 'Login failed');
      return { success: false, error: res.error };
    }
  };

  const register = async (name, email, password) => {
    const res = await authService.register(name, email, password);
    if (res.success) {
      setUser(res.user);
      toast.success(`Account created! Welcome, ${res.user.name}!`);
      return { success: true };
    } else {
      toast.error(res.error || 'Registration failed');
      return { success: false, error: res.error };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast('Signed out from Amazon', { icon: '👋' });
  };

  const updateShippingAddress = (newAddress) => {
    setShippingAddress(newAddress);
    localStorage.setItem('amazon_address', JSON.stringify(newAddress));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        shippingAddress,
        updateShippingAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
