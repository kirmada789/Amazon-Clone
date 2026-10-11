import React, { useState } from 'react';
import { useLocation } from '../../context/LocationContext';
import { MapPin, X } from 'lucide-react';

const popularCities = [
  { city: 'Dhanbad', pincode: '828109', state: 'Jharkhand' },
  { city: 'New Delhi', pincode: '110001', state: 'Delhi' },
  { city: 'Mumbai', pincode: '400001', state: 'Maharashtra' },
  { city: 'Bengaluru', pincode: '560001', state: 'Karnataka' },
  { city: 'Kolkata', pincode: '700001', state: 'West Bengal' },
  { city: 'Hyderabad', pincode: '500001', state: 'Telangana' },
  { city: 'Chennai', pincode: '600001', state: 'Tamil Nadu' },
  { city: 'Pune', pincode: '411001', state: 'Maharashtra' },
];

const LocationModal = () => {
  const { isModalOpen, closeModal, updateLocation, location } = useLocation();
  const [pincodeInput, setPincodeInput] = useState('');
  const [cityInput, setCityInput] = useState('');

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pincodeInput.trim()) {
      updateLocation(cityInput.trim() || 'Selected Area', pincodeInput.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-[#f0f2f2] px-5 py-3.5 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#ff9900]" />
            <h3 className="font-semibold text-gray-900 text-base">Choose your location</h3>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-900 p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs text-gray-600 mb-4 leading-relaxed">
            Select a delivery location to see product availability and delivery options for your area.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-5">
            <label className="block text-xs font-semibold text-gray-800 mb-1">
              Enter an Indian pincode
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 828109"
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-3 py-2 text-sm border border-gray-400 rounded-md focus:border-[#e77600] focus:ring-2 focus:ring-[#e77600]/30 outline-none"
              />
              <button
                type="submit"
                disabled={pincodeInput.length !== 6}
                className="bg-[#ffd814] hover:bg-[#f7ca00] disabled:bg-gray-200 disabled:text-gray-400 text-gray-900 text-sm font-medium px-4 py-2 rounded-md shadow-xs transition-colors"
              >
                Apply
              </button>
            </div>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-3 text-xs text-gray-500 font-medium">or select popular delivery hubs</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Popular Cities Grid */}
          <div className="grid grid-cols-2 gap-2 mt-3 max-h-48 overflow-y-auto pr-1">
            {popularCities.map((item) => (
              <button
                key={item.pincode}
                onClick={() => updateLocation(item.city, item.pincode)}
                className={`text-left p-2.5 rounded-md border text-xs transition-all ${
                  location.pincode === item.pincode
                    ? 'border-[#ff9900] bg-amber-50/50 font-medium text-gray-900 shadow-xs'
                    : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="font-semibold text-gray-900">{item.city}</div>
                <div className="text-[11px] text-gray-500">{item.pincode} ({item.state})</div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-right">
          <button
            onClick={closeModal}
            className="text-xs font-semibold text-[#007185] hover:text-[#c7511f] hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
