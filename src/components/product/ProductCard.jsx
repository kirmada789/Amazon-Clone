import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import StarRating from '../common/StarRating';
import { PriceTag, PrimeBadge, ChoiceBadge, DealBadge } from '../common/BadgeAndPrice';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-xs border border-gray-200/90 p-3.5 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group relative">
      {/* Top Badges */}
      <div className="h-6 mb-1">
        {product.badge === "Amazon's Choice" ? (
          <ChoiceBadge keyword={product.category || 'Product'} />
        ) : product.badge === "Best Seller" ? (
          <span className="bg-[#E67A00] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase">
            #1 Best Seller
          </span>
        ) : product.festivalDeal ? (
          <DealBadge text="Festival Deal" />
        ) : null}
      </div>

      {/* Product Image */}
      <Link
        to={`/product/${product._id}`}
        className="block relative aspect-square w-full overflow-hidden mb-3 bg-white p-2 rounded-sm"
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

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Product Title */}
          <Link
            to={`/product/${product._id}`}
            className="text-sm font-normal text-[#0F1111] hover:text-[#007185] line-clamp-2 leading-snug mb-1.5"
            title={product.title}
          >
            {product.title}
          </Link>

          {/* Rating */}
          <div className="mb-2">
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="sm"
            />
          </div>

          {/* Price */}
          <div className="mb-2">
            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              size="sm"
            />
          </div>

          {/* Prime and Delivery */}
          <div className="text-[12px] text-gray-700 space-y-0.5 mb-3">
            <div className="flex items-center gap-1.5">
              <PrimeBadge />
              <span className="text-gray-900 font-medium">
                {product.freeDelivery || 'FREE Delivery'}
              </span>
            </div>
            {product.boughtInPastMonth && (
              <div className="text-[11px] text-[#565959]">
                {product.boughtInPastMonth}
              </div>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F2BD00] text-[#0F1111] text-xs font-medium py-2 px-3 rounded-full shadow-xs border border-[#FCD200] hover:border-[#F2C200] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-gray-800" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
