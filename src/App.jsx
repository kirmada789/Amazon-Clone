import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage from './pages/OrdersPage';
import NotFoundPage from './pages/NotFoundPage';

// Wrapper for category/:categoryName route redirecting to search
const CategoryRouteWrapper = () => {
  const { categoryName } = useParams();
  return <Navigate to={`/search?category=${encodeURIComponent(categoryName)}`} replace />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <LocationProvider>
            {/* Global Toaster Notifications */}
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 2500,
                style: {
                  background: '#131921',
                  color: '#ffffff',
                  fontSize: '13px',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                },
                success: {
                  iconTheme: {
                    primary: '#FF9900',
                    secondary: '#131921',
                  },
                },
              }}
            />

            <Routes>
              {/* Standalone Authentication Pages (Screenshot 5) */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Main Marketplace Pages wrapped in MainLayout (Screenshots 1-4) */}
              <Route
                path="/"
                element={
                  <MainLayout>
                    <HomePage />
                  </MainLayout>
                }
              />
              <Route
                path="/search"
                element={
                  <MainLayout>
                    <SearchResultsPage />
                  </MainLayout>
                }
              />
              <Route
                path="/category/:categoryName"
                element={<CategoryRouteWrapper />}
              />
              <Route
                path="/product/:id"
                element={
                  <MainLayout>
                    <ProductDetailsPage />
                  </MainLayout>
                }
              />
              <Route
                path="/cart"
                element={
                  <MainLayout>
                    <CartPage />
                  </MainLayout>
                }
              />
              <Route
                path="/checkout"
                element={
                  <MainLayout>
                    <CheckoutPage />
                  </MainLayout>
                }
              />
              <Route
                path="/order-success"
                element={
                  <MainLayout>
                    <OrderSuccessPage />
                  </MainLayout>
                }
              />
              <Route
                path="/orders"
                element={
                  <MainLayout>
                    <OrdersPage />
                  </MainLayout>
                }
              />

              {/* 404 Route */}
              <Route
                path="*"
                element={
                  <MainLayout>
                    <NotFoundPage />
                  </MainLayout>
                }
              />
            </Routes>
          </LocationProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;