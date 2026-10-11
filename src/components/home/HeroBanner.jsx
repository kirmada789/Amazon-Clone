import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const heroCards = [
  {
    id: 1,
    bgGradient: 'from-[#ff6200] via-[#ff3b00] to-[#d62000]',
    headline: 'Up to 19 hours of battery life*',
    subtext: 'Windows 11 Copilot+ PC',
    tag: 'Live Now',
    tagTitle: 'Great Indian Festival',
    bankOffer: '10% Instant Discount* on SBI Credit Card & EMI',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=80',
    link: '/search?category=Laptops',
    category: 'Laptops',
  },
  {
    id: 2,
    bgGradient: 'from-[#e65100] via-[#f57c00] to-[#ef6c00]',
    headline: 'From ₹14,499',
    subtext: 'Segment\'s fastest processor • REDMI Note 13 Pro 5G',
    tag: 'Live Now',
    tagTitle: 'Great Indian Festival',
    bankOffer: '35% cashback up to ₹150 on your first order',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    link: '/search?category=Mobiles',
    category: 'Mobiles',
  },
  {
    id: 3,
    bgGradient: 'from-[#b71c1c] via-[#c62828] to-[#9a0007]',
    headline: 'Under ₹299',
    subtext: 'Kurtas & Ethnic Sets • Free Delivery • Easy Returns',
    tag: 'Live Now',
    tagTitle: 'Great Indian Festival',
    bankOffer: 'Bank Offer: 10% Instant Discount on Debit/Credit Card',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=80',
    link: '/search?category=Fashion',
    category: 'Fashion',
  },
  {
    id: 4,
    bgGradient: 'from-[#880e4f] via-[#ad1457] to-[#7b1fa2]',
    headline: 'Under ₹399',
    subtext: 'Jeans & Denims • Free Delivery • Easy Returns',
    tag: 'Live Now',
    tagTitle: 'Great Indian Festival',
    bankOffer: 'Special Festive Coupon: Extra ₹50 off on Checkout',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=80',
    link: '/search?category=Fashion',
    category: 'Fashion',
  },
  {
    id: 5,
    bgGradient: 'from-[#00695c] via-[#00796b] to-[#004d40]',
    headline: 'Under ₹499',
    subtext: 'Festive Lights & Decor • Bestseller favourites for you',
    tag: 'Live Now',
    tagTitle: 'Great Indian Festival',
    bankOffer: '35% cashback up to ₹150 on your first order',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80',
    link: '/search?category=Home & Kitchen',
    category: 'Home & Kitchen',
  },
  {
    id: 6,
    bgGradient: 'from-[#1a237e] via-[#283593] to-[#0d47a1]',
    headline: 'Up to 60% off',
    subtext: 'Noise Cancelling Headphones & Soundbars',
    tag: 'Live Now',
    tagTitle: 'Great Indian Festival',
    bankOffer: 'No Cost EMI on HDFC & SBI Bank Cards',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    link: '/search?category=Electronics',
    category: 'Electronics',
  }
];

const HeroBanner = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full max-w-[1550px] mx-auto px-2 sm:px-4 pt-3 pb-2 select-none">
      {/* Scroll Navigation Chevrons */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-24 bg-white/80 hover:bg-white text-gray-900 items-center justify-center rounded-r-md shadow-lg border border-gray-300 hover:border-gray-400 transition-all cursor-pointer opacity-90 hover:opacity-100"
        aria-label="Previous festive banners"
      >
        <ChevronLeft className="w-8 h-8 text-gray-700" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-24 bg-white/80 hover:bg-white text-gray-900 items-center justify-center rounded-l-md shadow-lg border border-gray-300 hover:border-gray-400 transition-all cursor-pointer opacity-90 hover:opacity-100"
        aria-label="Next festive banners"
      >
        <ChevronRight className="w-8 h-8 text-gray-700" />
      </button>

      {/* Cards Row matching Screenshot 1 */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto custom-scrollbar pb-3 snap-x snap-mandatory scroll-smooth"
      >
        {heroCards.map((card) => (
          <Link
            key={card.id}
            to={card.link}
            className={`snap-start shrink-0 w-[270px] sm:w-[290px] md:w-[310px] rounded-2xl bg-gradient-to-b ${card.bgGradient} text-white p-4 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group border border-white/20`}
          >
            {/* Top Text */}
            <div className="z-10">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight drop-shadow-xs">
                {card.headline}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-white/90 mt-1 line-clamp-2 drop-shadow-xs">
                {card.subtext}
              </p>
            </div>

            {/* Product Feature Image Frame */}
            <div className="my-3 relative rounded-xl overflow-hidden bg-black/15 p-2 backdrop-blur-xs flex items-center justify-center h-48 border border-white/20">
              <img
                src={card.image}
                alt={card.headline}
                loading="lazy"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-inner"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            {/* Festive Bottom Strip */}
            <div className="bg-white text-gray-900 rounded-xl p-2.5 shadow-md z-10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="bg-[#b12704] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs tracking-wider uppercase">
                  {card.tag}
                </span>
                <span className="text-[11px] font-black text-[#b12704] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {card.tagTitle}
                </span>
              </div>
              <div className="text-[10px] text-gray-700 font-semibold line-clamp-1 border-t border-gray-100 pt-1">
                {card.bankOffer}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
