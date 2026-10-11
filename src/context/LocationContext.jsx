import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('amazon_location');
      return saved ? JSON.parse(saved) : { city: 'Dhanbad', pincode: '828109' };
    } catch {
      return { city: 'Dhanbad', pincode: '828109' };
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateLocation = (city, pincode) => {
    const newLoc = { city, pincode };
    setLocation(newLoc);
    localStorage.setItem('amazon_location', JSON.stringify(newLoc));
    setIsModalOpen(false);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        updateLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
