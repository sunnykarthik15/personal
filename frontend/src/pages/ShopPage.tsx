import React, { useState, useEffect } from 'react';
import { 
  Search, SlidersHorizontal, Grid, List, X, 
  ArrowUpDown, Check, Sparkles, Filter 
} from 'lucide-react';
import { Product, Category, ProductVariant } from '../types';
import { api } from '../services/api';
import { ProductCard } from '../components/shop/ProductCard';
import { QuickViewModal } from '../components/shop/QuickViewModal';
import { useCart } from '../context/CartContext';

interface ShopPageProps {
  initialCategory?: string;
  onSelectProduct: (slug: string) => void;
  onNavigateToCheckout: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory,
  onSelectProduct,
  onNavigateToCheckout,
}) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Controls
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Load Categories once
  useEffect(() => {
    api.getCategories().then(setCategories).catch(console.error);
  }, []);

  // Sync initialCategory prop if passed
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Fetch Products based on current filters
  useEffect(() => {
    setIsLoading(true);
    api.getProducts({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      search: searchQuery.trim() || undefined,
      max_price: maxPrice,
      sort: sortOption,
      limit: 100,
    })
      .then((res) => {
        setProducts(res.items);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedCategory, searchQuery, maxPrice, sortOption]);

  const handleBuyNowDirect = (product: Product, variant?: ProductVariant) => {
    onNavigateToCheckout();
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(1500);
    setSortOption('featured');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest text-[#785338] uppercase">
            Pure & Natural Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B3D2B] mt-1">
            Shop Traditional Essentials
          </h1>
          <p className="text-xs sm:text-sm text-[#785338] mt-1">
            Handpicked dry fruits, nutrient seeds, stone-ground whole spices, cold-pressed oils, and natural jaggery sweets.
          </p>
        </div>

        {/* Top Control Bar: Search & Sort */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE2D5] shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#A89F91]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Badam, Palli Oil, Sunnundalu..."
              className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B] focus:ring-1 focus:ring-[#1B3D2B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 p-0.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Layout Toggle & Mobile Filter Button */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs font-semibold text-[#1B3D2B] flex items-center gap-1.5"
            >
              <Filter className="w-4 h-4 text-[#C5A059]" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-[#785338] hidden sm:inline-block" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-[#FAF7F2] border border-[#EAE2D5] text-xs font-semibold text-[#1B3D2B] rounded-xl px-3 py-2 focus:outline-hidden focus:border-[#1B3D2B]"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
              </select>
            </div>

            {/* Grid / List View Toggle */}
            <div className="hidden sm:flex items-center bg-[#FAF7F2] border border-[#EAE2D5] rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-[#1B3D2B]' : 'text-[#785338]'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-xs text-[#1B3D2B]' : 'text-[#785338]'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#EAE2D5] shadow-xs space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#F4EFE6]">
                <h3 className="font-serif font-bold text-lg text-[#1B3D2B] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
                  <span>Filters</span>
                </h3>
                {(selectedCategory !== 'all' || searchQuery || maxPrice < 1500) && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs text-[#785338] hover:text-[#1B3D2B] underline"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === 'all'
                        ? 'bg-[#1B3D2B] text-white font-semibold'
                        : 'text-[#4A3B32] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[10px] opacity-75">40</span>
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? 'bg-[#1B3D2B] text-white font-semibold'
                          : 'text-[#4A3B32] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      {cat.product_count !== undefined && (
                        <span className="text-[10px] opacity-75">{cat.product_count}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter Slider */}
              <div className="pt-2 border-t border-[#F4EFE6]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#4A3B32] uppercase tracking-wider">
                    Max Price
                  </span>
                  <span className="font-bold text-[#1B3D2B]">Up to ₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#1B3D2B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#A89F91] mt-1">
                  <span>₹50</span>
                  <span>₹750</span>
                  <span>₹1500+</span>
                </div>
              </div>

              {/* Quality Seal */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] text-xs text-[#785338] space-y-1">
                <p className="font-bold text-[#1B3D2B]">The Vaishno Karthik Promise</p>
                <p className="text-[11px] leading-relaxed">
                  No artificial coloring, no synthetic polishing on dry fruits, and no refined additives.
                </p>
              </div>

            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            
            {/* Status bar */}
            <div className="flex items-center justify-between mb-6 text-xs text-[#785338]">
              <p>
                Showing <strong className="text-[#1B3D2B]">{products.length}</strong> items
                {selectedCategory !== 'all' && (
                  <span> in <span className="font-semibold text-[#1B3D2B] capitalize">{selectedCategory.replace(/-/g, ' ')}</span></span>
                )}
              </p>
              {products.length > 0 && (
                <span className="text-green-700 font-medium">✓ In Stock & Ready to Dispatch</span>
              )}
            </div>

            {/* Products List */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-3xl h-80 border border-[#EAE2D5]" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#EAE2D5] p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#785338] mx-auto">
                  <Search className="w-7 h-7 text-[#1B3D2B]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1B3D2B]">No products match your filters</h3>
                <p className="text-xs text-[#785338] max-w-sm mx-auto">
                  Try clearing your search query or adjusting your price slider to see more items.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#1B3D2B] text-white text-xs font-semibold hover:bg-[#2A543A]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={onSelectProduct}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onBuyNowDirect={handleBuyNowDirect}
                  />
                ))}
              </div>
            ) : (
              /* List Mode */
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product.slug)}
                    className="group bg-white rounded-3xl border border-[#EAE2D5] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-6 shadow-premium hover:shadow-premium-hover transition-all cursor-pointer"
                  >
                    <img
                      src={product.image || 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=300&q=80'}
                      alt={product.name}
                      className="w-full sm:w-36 h-36 object-cover rounded-2xl bg-[#F4EFE6] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#785338] uppercase tracking-wider">
                        {product.category?.name}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-[#1B3D2B] group-hover:text-[#2A543A] transition-colors mt-0.5">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#785338] mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description || product.short_description}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-lg font-bold text-[#1B3D2B]">₹{product.price.toFixed(0)}</span>
                        <span className="text-xs text-[#785338] bg-[#F4EFE6] px-2 py-0.5 rounded-md">
                          {product.weight}
                        </span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, undefined, 1);
                        }}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#1B3D2B] text-white text-xs font-semibold hover:bg-[#2A543A] transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyNowDirect(product);
                        }}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#FAF7F2] text-[#1B3D2B] text-xs font-semibold hover:bg-[#EAE2D5] border border-[#EAE2D5] transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </main>
        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D5]">
                <h3 className="font-serif font-bold text-lg text-[#1B3D2B]">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-[#4A3B32] uppercase mb-2">Category</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs ${
                        selectedCategory === 'all' ? 'bg-[#1B3D2B] text-white font-bold' : 'text-gray-700'
                      }`}
                    >
                      All Products
                    </button>
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.slug)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs ${
                          selectedCategory === c.slug ? 'bg-[#1B3D2B] text-white font-bold' : 'text-gray-700'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAE2D5]">
                  <h4 className="text-xs font-bold text-[#4A3B32] uppercase mb-2">
                    Max Price: ₹{maxPrice}
                  </h4>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#1B3D2B]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EAE2D5] space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[#1B3D2B] text-white text-xs font-bold"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  handleClearFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2 text-xs text-gray-500 underline"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewFullDetails={(slug) => {
          setQuickViewProduct(null);
          onSelectProduct(slug);
        }}
        onBuyNow={handleBuyNowDirect}
      />
    </div>
  );
};
