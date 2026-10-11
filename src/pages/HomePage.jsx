import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/home/HeroBanner';
import DealQuadrantCard from '../components/home/DealQuadrantCard';
import ProductCarousel from '../components/home/ProductCarousel';
import { productService } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { Laptop, Smartphone, Headphones, Shirt, Home, Sparkles, ShieldCheck, Truck, Clock } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      setLoading(true);
      const res = await productService.getProducts();
      if (res.success) {
        setProducts(res.data);
      }
      setLoading(false);
    };
    fetchHomeProducts();
  }, []);

  const laptopProducts = products.filter((p) => p.category === 'Laptops');
  const mobileProducts = products.filter((p) => p.category === 'Mobiles');
  const electronicsProducts = products.filter((p) => p.category === 'Electronics');
  const fashionProducts = products.filter((p) => p.category === 'Fashion');

  // Quadrant Data matching Screenshot 1
  const trendingDealsItems = [
    { label: 'Laptops | Up to 45% off', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&auto=format&fit=crop&q=80', link: '/search?category=Laptops' },
    { label: 'Smartphones | From ₹14,499', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&auto=format&fit=crop&q=80', link: '/search?category=Mobiles' },
    { label: 'Headphones | Up to 70% off', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80', link: '/search?category=Electronics' },
    { label: 'Kurtas & Sarees | Under ₹299', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&auto=format&fit=crop&q=80', link: '/search?category=Fashion' },
  ];

  const fashionDealsItems = [
    { label: 'Kurtas | Under ₹299', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&auto=format&fit=crop&q=80', link: '/search?category=Fashion' },
    { label: 'Denim Jeans | Under ₹399', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&auto=format&fit=crop&q=80', link: '/search?category=Fashion' },
    { label: 'Festive Lights | Under ₹499', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=80', link: '/search?category=Home & Kitchen' },
    { label: 'Casual Shirts | Under ₹499', image: 'https://images.unsplash.com/photo-1603252109303-2751441ec157?w=300&auto=format&fit=crop&q=80', link: '/search?category=Fashion' },
  ];

  const alexaDealsItems = [
    { label: 'Fire TV Stick 4K | ₹3,499', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&auto=format&fit=crop&q=80', link: '/product/fire-tv-stick-4k-select' },
    { label: 'Echo Dot (5th Gen) | ₹4,449', image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=300&auto=format&fit=crop&q=80', link: '/product/echo-dot-5th-gen-speaker' },
    { label: 'Smart LED Bulbs | From ₹499', image: 'https://images.unsplash.com/photo-1550524514-9b5d3811fcfd?w=300&auto=format&fit=crop&q=80', link: '/search?category=Electronics' },
    { label: 'Smart Home Security Plug', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=300&auto=format&fit=crop&q=80', link: '/search?category=Electronics' },
  ];

  const foodBeveragesItems = [
    { label: 'Premium Roasted Coffee', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80', link: '/search?category=Home & Kitchen' },
    { label: 'Organic Dry Fruits & Nuts', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&auto=format&fit=crop&q=80', link: '/search?category=Home & Kitchen' },
    { label: 'Healthy Breakfast Muesli', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&auto=format&fit=crop&q=80', link: '/search?category=Home & Kitchen' },
    { label: 'Gourmet Festive Sweets', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80', link: '/search?category=Home & Kitchen' },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Festive Hero Carousel Cards (Screenshot 1 top) */}
      <HeroBanner />

      {/* 2. Four Quadrant Deal Cards Grid (Screenshot 1 bottom) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DealQuadrantCard
          title="Trending deals"
          items={trendingDealsItems}
          linkText="See all festival deals"
          linkTo="/search?deal=festival"
        />

        <DealQuadrantCard
          title="Deals on fashion, home & more"
          items={fashionDealsItems}
          linkText="Explore budget finds"
          linkTo="/search?category=Fashion"
        />

        <DealQuadrantCard
          title="Deals that unlock Alexa+"
          items={alexaDealsItems}
          linkText="Shop Echo & Fire TV"
          linkTo="/search?category=Electronics"
        />

        {/* 4th Card: If user not logged in, show Amazon Sign-in Box or Food Deals */}
        {!user ? (
          <div className="bg-white p-5 rounded-xs border border-gray-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0F1111] mb-2">
                Sign in for your best experience
              </h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Personalized deals, faster checkout, track orders, and exclusive Great Indian Festival offers.
              </p>
              <Link
                to="/login"
                className="block text-center bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold py-2 px-4 rounded-lg text-xs shadow-xs border border-[#FCD200] transition-colors mb-3"
              >
                Sign in securely
              </Link>
              <div className="text-[11px] text-gray-500 text-center">
                New to Amazon?{' '}
                <Link to="/register" className="text-[#007185] hover:underline font-medium">
                  Create an account
                </Link>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-around text-gray-600 text-center text-[10px]">
              <div>
                <Truck className="w-4 h-4 mx-auto text-[#007185] mb-1" />
                <span>Fast Free Delivery</span>
              </div>
              <div>
                <ShieldCheck className="w-4 h-4 mx-auto text-[#007185] mb-1" />
                <span>100% Genuine</span>
              </div>
              <div>
                <Clock className="w-4 h-4 mx-auto text-[#007185] mb-1" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        ) : (
          <DealQuadrantCard
            title="Starting ₹149 | Food & beverages"
            items={foodBeveragesItems}
            linkText="See more pantry items"
            linkTo="/search?category=Home & Kitchen"
          />
        )}
      </section>

      {/* 3. Category Icons Navigation Bar */}
      <div className="bg-white p-3 rounded-xs border border-gray-200/90 shadow-xs overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between min-w-[650px] gap-4 px-2">
          <Link
            to="/search?category=Laptops"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Laptops</div>
              <div className="text-[10px] text-gray-500">Up to 45% off</div>
            </div>
          </Link>

          <Link
            to="/search?category=Mobiles"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Mobiles</div>
              <div className="text-[10px] text-gray-500">From ₹14,499</div>
            </div>
          </Link>

          <Link
            to="/search?category=Electronics"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Audio &amp; TV</div>
              <div className="text-[10px] text-gray-500">Top Brands</div>
            </div>
          </Link>

          <Link
            to="/search?category=Fashion"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 group-hover:scale-110 transition-transform">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Fashion</div>
              <div className="text-[10px] text-gray-500">Under ₹299</div>
            </div>
          </Link>

          <Link
            to="/search?category=Home & Kitchen"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Home &amp; Kitchen</div>
              <div className="text-[10px] text-gray-500">Starting ₹499</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. Product Carousel: Bestselling Laptops (Screenshot 2 preview) */}
      <ProductCarousel
        title="Bestselling Laptops & Computers | Up to 45% off"
        products={laptopProducts}
        linkTo="/search?category=Laptops"
        linkText="See all laptops"
      />

      {/* 5. Product Carousel: Mobile Phones & 5G Smartphones */}
      <ProductCarousel
        title="Top 5G Smartphones & Bestseller Mobiles"
        products={mobileProducts}
        linkTo="/search?category=Mobiles"
        linkText="See all mobiles"
      />

      {/* 6. Product Carousel: Audio & Smart Electronics */}
      <ProductCarousel
        title="Echo, Fire TV, Noise-Cancelling Headphones & Accessories"
        products={electronicsProducts}
        linkTo="/search?category=Electronics"
        linkText="See all electronics"
      />

      {/* 7. Product Carousel: Festive Ethnic Wear & Denim */}
      <ProductCarousel
        title="Budget Festive Fashion | Kurtas, Denim & Essentials"
        products={fashionProducts}
        linkTo="/search?category=Fashion"
        linkText="Explore festive wardrobe"
      />
    </div>
  );
};

export default HomePage;
