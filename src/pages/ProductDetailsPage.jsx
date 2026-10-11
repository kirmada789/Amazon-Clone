import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductGallery from '../components/product/ProductGallery';
import ProductBuyBox from '../components/product/ProductBuyBox';
import ProductOffers from '../components/product/ProductOffers';
import StarRating from '../components/common/StarRating';
import { ChoiceBadge, PrimeBadge } from '../components/common/BadgeAndPrice';
import ProductCarousel from '../components/home/ProductCarousel';
import { formatPrice } from '../utils/formatters';
import {
  ChevronRight,
  Shield,
  Zap,
  Eye,
  Award,
  Cpu,
  AlertCircle
} from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await productService.getProductById(id);
      if (res.success) {
        setProduct(res.data);
        // Also fetch related category products
        const catRes = await productService.getProducts({ category: res.data.category });
        if (catRes.success) {
          setRelatedProducts(catRes.data.filter((p) => p._id !== res.data._id));
        }
      } else {
        setProduct(null);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white p-16 rounded-xs border border-gray-200 text-center my-6">
        <div className="w-10 h-10 border-3 border-[#ff9900] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-medium text-gray-700">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white p-12 rounded-xs border border-gray-200 text-center my-6 space-y-4 max-w-lg mx-auto">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-gray-900">Product Not Found</h2>
        <p className="text-xs text-gray-600">
          The product you are looking for does not exist or has been removed from our catalog.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold px-6 py-2 rounded-full text-xs"
        >
          Return to Home Page
        </Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6 py-2">
      {/* 1. Breadcrumb navigation matching Screenshot 3 */}
      <nav className="flex items-center gap-1.5 text-xs text-[#565959] flex-wrap">
        <Link to="/" className="hover:text-[#007185] hover:underline">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/search?category=${product.category}`} className="hover:text-[#007185] hover:underline">
          {product.category || 'Electronics'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-medium truncate max-w-xs">
          {product.shortTitle || product.title}
        </span>
      </nav>

      {/* 2. Three-Column Main Product Grid (Screenshot 3 layout) */}
      <div className="bg-white p-4 sm:p-6 rounded-xs border border-gray-200 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Column 1: Image Gallery (Left - 5 cols) */}
          <div className="lg:col-span-5 sticky top-20">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Column 2: Product Info & Specs (Middle - 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              {/* Product Title */}
              <h1 className="text-xl sm:text-2xl font-medium text-[#0F1111] leading-snug">
                {product.title}
              </h1>

              {/* Brand Store Link */}
              <div className="mt-1">
                <Link
                  to={`/search?brand=${product.brand}`}
                  className="text-xs font-semibold text-[#007185] hover:text-[#c7511f] hover:underline"
                >
                  Visit the {product.brand} Store
                </Link>
              </div>

              {/* Ratings and reviews */}
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <StarRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  size="sm"
                />
                {product.badge === "Amazon's Choice" && (
                  <ChoiceBadge keyword={product.category || 'Laptop'} />
                )}
              </div>

              {/* Bought in past month */}
              {product.boughtInPastMonth && (
                <div className="text-xs text-[#565959] mt-1 font-medium">
                  {product.boughtInPastMonth}
                </div>
              )}
            </div>

            <hr className="border-gray-200" />

            {/* Price Section matching Screenshot 3 */}
            <div className="space-y-1">
              {product.festivalDeal && (
                <div className="inline-block bg-[#b12704] text-white text-[11px] font-bold px-2 py-0.5 rounded-xs mb-1">
                  Lowest price in 30 days
                </div>
              )}

              <div className="flex items-baseline gap-2">
                {discountPercent > 0 && (
                  <span className="text-2xl font-light text-[#CC0C39]">
                    -{discountPercent}%
                  </span>
                )}
                <span className="text-3xl font-bold text-[#0F1111]">
                  {formatPrice(product.price)}
                </span>
              </div>

              {product.originalPrice && (
                <div className="text-xs text-[#565959]">
                  M.R.P.: <span className="line-through">{formatPrice(product.originalPrice)}</span>
                </div>
              )}

              <div className="text-xs text-gray-700 font-medium">
                Inclusive of all taxes
              </div>

              {/* EMI Note */}
              <div className="text-xs text-gray-800 pt-1">
                <span className="font-semibold">EMI</span> starts at ₹1,758 per month.{' '}
                <span className="text-[#007185] font-semibold hover:underline cursor-pointer">
                  No Cost EMI available
                </span>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Offers Section */}
            <ProductOffers offers={product.offers} />

            {/* Feature Badges Row (Screenshot 3 Dell features) */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-gray-700">
              <div className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-xs border border-gray-100">
                <Zap className="w-4 h-4 text-[#e77600] shrink-0" />
                <span>Express Charge</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-xs border border-gray-100">
                <Eye className="w-4 h-4 text-[#e77600] shrink-0" />
                <span>ComfortView</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-xs border border-gray-100">
                <Shield className="w-4 h-4 text-[#e77600] shrink-0" />
                <span>MIL-STD-810H</span>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Product Specifications Table */}
            {product.specs && (
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-gray-900">Product Specifications</h3>
                <div className="grid grid-cols-2 gap-y-1.5 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <React.Fragment key={key}>
                      <span className="font-semibold text-gray-600">{key}</span>
                      <span className="text-gray-900 font-normal">{val}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            <hr className="border-gray-200" />

            {/* About this Item Bullets */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-gray-900">About this item</h3>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-gray-800 leading-relaxed">
                {product.features?.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                )) || (
                  <li>{product.description}</li>
                )}
              </ul>
            </div>
          </div>

          {/* Column 3: Buy Box (Right - 3 cols) */}
          <div className="lg:col-span-3 lg:sticky lg:top-20">
            <ProductBuyBox product={product} />
          </div>

        </div>
      </div>

      {/* 3. Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <ProductCarousel
          title={`Related products in ${product.category}`}
          products={relatedProducts}
          linkTo={`/search?category=${product.category}`}
          linkText="See all related products"
        />
      )}
    </div>
  );
};

export default ProductDetailsPage;
