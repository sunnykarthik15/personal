import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product, ProductVariant } from '../../types';
import { ProductCard } from '../shop/ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  isLoading: boolean;
  onProductClick: (slug: string) => void;
  onQuickView: (product: Product) => void;
  onViewAllClick: () => void;
  onBuyNowDirect: (product: Product, variant?: ProductVariant) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  isLoading,
  onProductClick,
  onQuickView,
  onViewAllClick,
  onBuyNowDirect,
}) => {
  return (
    <section className="py-20 bg-white border-b border-[#EAE2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#785338] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B3D2B] mt-1">
              Featured Products
            </h2>
          </div>

          <button
            onClick={onViewAllClick}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#1B3D2B] hover:text-[#2A543A] group transition-colors"
          >
            <span>View All 40 Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-[#FAF7F2] rounded-3xl h-80 border border-[#EAE2D5]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-[#785338] text-sm">
            Products are loading from database...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
                onQuickView={onQuickView}
                onBuyNowDirect={onBuyNowDirect}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
