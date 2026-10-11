import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductFilters from '../components/product/ProductFilters';
import ProductListItem from '../components/product/ProductListItem';
import SortDropdown from '../components/product/SortDropdown';
import { Filter, SearchX, Sparkles, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query parameters
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const dealParam = searchParams.get('deal') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [festivalOnly, setFestivalOnly] = useState(dealParam === 'festival');
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);
  const [minRating, setMinRating] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Products state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from productService
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const params = {
        search: queryParam,
        category: categoryParam,
        sort: sortParam,
      };
      const res = await productService.getProducts(params);
      if (res.success) {
        setProducts(res.data);
      }
      setLoading(false);
    };

    fetchResults();
  }, [queryParam, categoryParam, sortParam]);

  // Client-side active filtering for responsive immediate feedback
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.some((b) => b.toLowerCase() === p.brand?.toLowerCase())
      );
    }

    if (minPrice !== '') {
      result = result.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice !== '') {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (festivalOnly) {
      result = result.filter((p) => p.festivalDeal);
    }

    if (freeDeliveryOnly) {
      result = result.filter((p) => p.primeEligible);
    }

    if (minRating !== '') {
      result = result.filter((p) => p.rating >= Number(minRating));
    }

    // Sort
    if (sortParam === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortParam === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortParam === 'rating_desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedBrands, minPrice, maxPrice, festivalOnly, freeDeliveryOnly, minRating, sortParam]);

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setFestivalOnly(false);
    setFreeDeliveryOnly(false);
    setMinRating('');
  };

  const handleSortChange = (newSort) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('sort', newSort);
    setSearchParams(nextParams);
  };

  // Top sponsored spotlight row matching Screenshot 2 "Explore the collection"
  const sponsoredCollection = useMemo(() => {
    return products.filter((p) => p.category === 'Laptops').slice(1, 4);
  }, [products]);

  const activeHeadingText = queryParam
    ? `"${queryParam}"`
    : categoryParam
    ? categoryParam
    : dealParam === 'festival'
    ? 'Great Indian Festival Deals'
    : 'All Products';

  return (
    <div className="py-2">
      {/* Top Status & Sorting Bar matching Screenshot 2 */}
      <div className="bg-white px-3 sm:px-4 py-2.5 rounded-xs border border-gray-200 shadow-2xs mb-3 flex flex-wrap items-center justify-between gap-3">
        {/* Results Count Line */}
        <div className="text-xs sm:text-sm text-[#0F1111]">
          <span>
            1-{filteredProducts.length} of over {filteredProducts.length > 0 ? (filteredProducts.length * 120).toLocaleString('en-IN') : '0'} results for{' '}
          </span>
          <span className="font-bold text-[#C45500]">{activeHeadingText}</span>
        </div>

        {/* Controls: Mobile filter button & Sort Dropdown */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#f0f2f2] border border-[#d5d9d9] rounded-md text-xs font-semibold text-gray-800"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters ({selectedBrands.length + (minPrice ? 1 : 0) + (festivalOnly ? 1 : 0)})</span>
          </button>

          <SortDropdown currentSort={sortParam} onSortChange={handleSortChange} />
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Results Area */}
      <div className="flex gap-6 items-start">
        {/* Left Filter Sidebar */}
        <ProductFilters
          selectedBrands={selectedBrands}
          onBrandToggle={handleBrandToggle}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
          festivalOnly={festivalOnly}
          onFestivalToggle={setFestivalOnly}
          freeDeliveryOnly={freeDeliveryOnly}
          onFreeDeliveryToggle={setFreeDeliveryOnly}
          minRating={minRating}
          onRatingChange={setMinRating}
          onClearFilters={handleClearFilters}
          isMobileOpen={isMobileFiltersOpen}
          onMobileClose={() => setIsMobileFiltersOpen(false)}
        />

        {/* Right Search Results Column */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* "Explore the collection" Top Sponsored Spotlight (Screenshot 2) */}
          {(categoryParam === 'Laptops' || queryParam.toLowerCase().includes('laptop') || (!categoryParam && !queryParam)) && sponsoredCollection.length > 0 && (
            <div className="bg-white p-4 rounded-xs border border-gray-200/90 shadow-xs">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900">
                    Explore the collection
                  </h3>
                  <div className="text-[11px] text-[#565959]">
                    Sponsored ⓘ | Top best-selling brand in laptops
                  </div>
                </div>
                <div className="text-xs font-semibold text-[#007185] hover:underline flex items-center gap-0.5">
                  <span>Shop INTEL LAPTOPS</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>

              {/* 3 Featured Horizontal items */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sponsoredCollection.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item._id}`}
                    className="flex flex-col justify-between p-2.5 rounded-sm border border-gray-100 hover:border-gray-300 hover:shadow-xs transition-all group"
                  >
                    <div className="aspect-video bg-[#fafafa] p-2 flex items-center justify-center mb-2">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="max-h-28 object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900 line-clamp-1 group-hover:text-[#007185]">
                        {item.shortTitle || item.title}
                      </div>
                      <div className="text-sm font-bold text-[#0F1111] mt-1">
                        {formatPrice(item.price)}
                      </div>
                      {item.originalPrice && (
                        <div className="text-[10px] text-gray-500 line-through">
                          M.R.P.: {formatPrice(item.originalPrice)}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="border-b border-gray-200 pb-2">
            <h2 className="text-lg font-bold text-[#0F1111]">Results</h2>
            <p className="text-xs text-[#565959]">Check each product page for other buying options.</p>
          </div>

          {/* Product Items List or Empty State */}
          {loading ? (
            <div className="bg-white p-12 text-center rounded-xs border border-gray-200">
              <div className="w-8 h-8 border-3 border-[#ff9900] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              {filteredProducts.map((product) => (
                <ProductListItem key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 text-center rounded-xs border border-gray-200 space-y-3">
              <SearchX className="w-12 h-12 text-gray-400 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">No matching products found</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                We couldn't find any items matching your selected criteria. Try checking spelling, clearing filters, or exploring our festive deals.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-5 py-2 rounded-full text-xs font-semibold transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
