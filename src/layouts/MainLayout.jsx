import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import SecondaryNav from '../components/common/SecondaryNav';
import Footer from '../components/common/Footer';
import LocationModal from '../components/common/LocationModal';
import MobileMenuDrawer from '../components/common/MobileMenuDrawer';

const MainLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen flex flex-col bg-[#EAEDED] text-[#0F1111]">
      <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <SecondaryNav onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      <main className="flex-1 w-full max-w-[1550px] mx-auto px-2 sm:px-4 py-3">
        {children}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <LocationModal />
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
};

export default MainLayout;
