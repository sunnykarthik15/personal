import React, { useState } from 'react';
import { ShoppingBag, Eye, Zap, Check, MessageCircle } from 'lucide-react';
import { Product, ProductVariant } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onProductClick: (slug: string) => void;
  onQuickView?: (product: Product) => void;
  onBuyNowDirect?: (product: Product, variant?: ProductVariant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onQuickView,
  onBuyNowDirect,
}) => {
  const { addToCart } = useCart();
  
  // Default variant
  const defaultVariant = product.variants?.find((v) => v.is_default) || product.variants?.[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(defaultVariant);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const comparePrice = selectedVariant?.compare_at_price || product.compare_at_price;
  const currentWeight = selectedVariant ? selectedVariant.weight_label : product.weight;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    if (onBuyNowDirect) {
      onBuyNowDirect(product, selectedVariant);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      onClick={() => onProductClick(product.slug)}
      className="group relative bg-white rounded-3xl border border-[#EAE2D5] overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F4EFE6]">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Featured / Offer Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.is_featured && (
            <span className="px-2.5 py-1 rounded-full bg-[#1B3D2B] text-[#FAF7F2] text-[10px] font-bold tracking-wider uppercase shadow-xs">
              Bestseller
            </span>
          )}
          {comparePrice && comparePrice > currentPrice && (
            <span className="px-2.5 py-1 rounded-full bg-[#C5A059] text-[#1B3D2B] text-[10px] font-bold tracking-wider uppercase shadow-xs">
              Save {Math.round(((comparePrice - currentPrice) / comparePrice) * 100)}%
            </span>
          )}
        </div>

        {/* Quick View Floating Button */}
        {onQuickView && (
          <button
            onClick={handleQuickView}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#1B3D2B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white shadow-md"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] font-bold tracking-widest text-[#785338] uppercase">
            {product.category?.name || 'Vaishno Karthik'}
          </span>

          {/* Product Title */}
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#1B3D2B] line-clamp-1 group-hover:text-[#2A543A] transition-colors mt-0.5">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#785338] line-clamp-2 mt-1 leading-relaxed">
            {product.short_description || product.description}
          </p>

          {/* Variant Selector (if variants exist) */}
          {product.variants && product.variants.length > 1 && (
            <div
              className="mt-3 flex flex-wrap gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-lg border transition-colors ${
                    selectedVariant?.id === v.id
                      ? 'bg-[#1B3D2B] text-white border-[#1B3D2B]'
                      : 'bg-[#FAF7F2] text-[#4A3B32] border-[#EAE2D5] hover:border-[#1B3D2B]'
                  }`}
                >
                  {v.weight_label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Area */}
        <div className="mt-4 pt-3 border-t border-[#F4EFE6]">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold text-[#1B3D2B]">
                ₹{currentPrice.toFixed(0)}
              </span>
              {comparePrice && comparePrice > currentPrice && (
                <span className="text-xs text-[#A89F91] line-through">
                  ₹{comparePrice.toFixed(0)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium text-[#785338] bg-[#F4EFE6] px-2 py-0.5 rounded-md">
              {currentWeight}
            </span>
          </div>

          {/* Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                isAddedRecently
                  ? 'bg-green-700 text-white'
                  : 'bg-[#1B3D2B] text-white hover:bg-[#2A543A]'
              }`}
            >
              {isAddedRecently ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="py-2 px-3 rounded-xl text-xs font-semibold bg-[#F4EFE6] text-[#1B3D2B] hover:bg-[#EAE2D5] border border-[#EAE2D5] flex items-center justify-center gap-1 transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
