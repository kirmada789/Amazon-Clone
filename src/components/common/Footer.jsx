import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="mt-12 text-white text-xs select-none">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475A] hover:bg-[#485769] text-white py-3.5 text-center text-[13px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        aria-label="Back to top of page"
      >
        <ArrowUp className="w-4 h-4" />
        <span>Back to top</span>
      </button>

      {/* Main 4-Column Directory */}
      <div className="bg-[#232F3E] py-10 border-b border-gray-700">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:underline">About Amazon</Link></li>
              <li><Link to="/" className="hover:underline">Careers</Link></li>
              <li><Link to="/" className="hover:underline">Press Releases</Link></li>
              <li><Link to="/" className="hover:underline">Amazon Science</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Connect with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:underline">Sell on Amazon</Link></li>
              <li><Link to="/" className="hover:underline">Sell under Accelerator</Link></li>
              <li><Link to="/" className="hover:underline">Protect and Build Your Brand</Link></li>
              <li><Link to="/" className="hover:underline">Amazon Global Selling</Link></li>
              <li><Link to="/" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link to="/" className="hover:underline">Fulfilment by Amazon</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/orders" className="hover:underline">Your Account</Link></li>
              <li><Link to="/orders" className="hover:underline">Returns Centre</Link></li>
              <li><Link to="/orders" className="hover:underline">Recalls and Product Safety</Link></li>
              <li><Link to="/orders" className="hover:underline">100% Purchase Protection</Link></li>
              <li><Link to="/orders" className="hover:underline">Help &amp; Customer Care</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider with Brand and Country */}
        <div className="max-w-[1200px] mx-auto px-4 mt-8 pt-6 border-t border-gray-700 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-300">
          <Link to="/" className="flex items-baseline">
            <span className="text-xl font-black text-white font-sans lowercase">amazon</span>
            <span className="text-xs text-gray-400 ml-0.5">.in</span>
          </Link>

          <div className="flex items-center gap-2 border border-gray-600 rounded-sm px-3 py-1 text-gray-300">
            <Globe className="w-3.5 h-3.5" />
            <span>English</span>
          </div>

          <div className="flex items-center gap-2 border border-gray-600 rounded-sm px-3 py-1 text-gray-300">
            <span>🇮🇳 India</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-[#131921] py-8 text-center text-[11px] text-gray-400">
        <div className="max-w-[800px] mx-auto px-4 space-y-2">
          <div className="flex flex-wrap justify-center gap-4 text-gray-300">
            <Link to="/" className="hover:underline">Conditions of Use &amp; Sale</Link>
            <Link to="/" className="hover:underline">Privacy Notice</Link>
            <Link to="/" className="hover:underline">Interest-Based Ads</Link>
          </div>
          <p>© 1996–2026, Amazon.com, Inc. or its affiliates. Built for MERN Fullstack Portfolio.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
