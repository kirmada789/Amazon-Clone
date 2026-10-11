import React, { useState } from 'react';
import { Share2, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductGallery = ({ images = [], title = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const imageList = images && images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=700&auto=format&fit=crop&q=80'
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Product link copied to clipboard!');
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast(isWishlisted ? 'Removed from Wish List' : 'Added to your Wish List', {
      icon: isWishlisted ? '🤍' : '❤️',
      style: {
        background: '#131921',
        color: '#fff',
        fontSize: '12px'
      }
    });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      {/* Thumbnails Column */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0 py-1">
        {imageList.map((img, idx) => (
          <button
            key={idx}
            onMouseEnter={() => setActiveIndex(idx)}
            onClick={() => setActiveIndex(idx)}
            className={`w-14 h-14 rounded-xs border-2 p-1 bg-white cursor-pointer transition-all ${
              activeIndex === idx
                ? 'border-[#e77600] shadow-sm'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&auto=format&fit=crop&q=80';
              }}
            />
          </button>
        ))}
      </div>

      {/* Main Image Stage */}
      <div className="flex-1 relative bg-white border border-gray-200/80 rounded-sm p-4 flex items-center justify-center min-h-[350px] lg:min-h-[440px] group">
        {/* Floating Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={handleShare}
            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
            title="Share this product"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleWishlist}
            className={`p-2 bg-white/90 hover:bg-white rounded-full shadow-sm border border-gray-200 transition-colors ${
              isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
            title="Add to Wish List"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Active Image */}
        <img
          src={imageList[activeIndex]}
          alt={title}
          className="max-h-[380px] lg:max-h-[430px] w-auto max-w-full object-contain cursor-zoom-in group-hover:scale-102 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80';
          }}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
