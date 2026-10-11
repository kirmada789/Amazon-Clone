import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import StarRating from '../common/StarRating';
import { PriceTag, PrimeBadge, ChoiceBadge, DealBadge } from '../common/BadgeAndPrice';
import { ShoppingCart } from 'lucide-react';

const ProductListItem = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white p-4 rounded-xs border border-gray-200 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 lg:gap-6 items-start">
      {/* Product Image Frame */}
      <Link
        to={`/product/${product._id}`}
        className="shrink-0 w-full md:w-56 lg:w-64 aspect-square bg-[#f8f8f8] p-3 rounded-sm flex items-center justify-center overflow-hidden group"
      >
        <img
          src={product.images?.[0] || product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80';
          }}
        />
      </Link>

      {/* Product Details Column */}
      <div className="flex-1 flex flex-col justify-between h-full space-y-2">
        <div>
          {/* Badge */}
          <div className="mb-1">
            {product.badge === "Amazon's Choice" ? (
              <ChoiceBadge keyword={product.category || 'Laptop'} />
            ) : product.badge === "Best Seller" ? (
              <span className="bg-[#E67A00] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase">
                #1 Best Seller
              </span>
            ) : null}
          </div>

          {/* Title */}
          <Link
            to={`/product/${product._id}`}
            className="text-base lg:text-lg font-normal text-[#0F1111] hover:text-[#007185] line-clamp-2 leading-snug"
          >
            {product.title}
          </Link>

          {/* Ratings */}
          <div className="flex items-center gap-2 mt-1">
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="sm"
            />
            {product.boughtInPastMonth && (
              <span className="text-xs text-[#565959]">
                • {product.boughtInPastMonth}
              </span>
            )}
          </div>

          {/* Deal Tag */}
          {product.festivalDeal && (
            <div className="mt-1.5">
              <DealBadge text="Great Indian Festival" />
            </div>
          )}

          {/* Price Tag */}
          <div className="mt-2">
            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              size="md"
            />
          </div>

          {/* Delivery & Prime */}
          <div className="mt-2 text-xs text-gray-700 space-y-1">
            <div className="flex items-center gap-1.5">
              <PrimeBadge />
              <span className="font-semibold text-gray-900">
                {product.freeDelivery || 'FREE Delivery by Prime'}
              </span>
            </div>
            {product.fastestDelivery && (
              <div className="text-[11px] text-[#565959]">
                Or fastest delivery <span className="font-semibold text-gray-800">{product.fastestDelivery}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button & Stock */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={handleAddToCart}
            className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-xs font-semibold py-2 px-5 rounded-full shadow-xs border border-[#FCD200] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to cart</span>
          </button>

          <Link
            to={`/product/${product._id}`}
            className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline font-medium"
          >
            View product specifications &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
