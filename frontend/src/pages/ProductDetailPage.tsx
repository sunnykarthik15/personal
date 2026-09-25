import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ShoppingBag, Zap, MessageCircle, ShieldCheck, 
  Leaf, Clock, Truck, Check, Share2 
} from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/shop/ProductCard';

interface ProductDetailPageProps {
  slug: string;
  onBackToShop: () => void;
  onSelectProduct: (slug: string) => void;
  onNavigateToCheckout: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onBackToShop,
  onSelectProduct,
  onNavigateToCheckout,
}) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    api.getProductBySlug(slug)
      .then((p) => {
        setProduct(p);
        setActiveImage(p.image || '');
        const defaultVar = p.variants?.find((v) => v.is_default) || p.variants?.[0];
        setSelectedVariant(defaultVar);

        // Fetch related products from same category
        if (p.category?.slug) {
          api.getProducts({ category: p.category.slug, limit: 4 })
            .then((res) => {
              setRelatedProducts(res.items.filter((item) => item.id !== p.id));
            })
            .catch(console.error);
        }
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-16 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#1B3D2B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#785338]">Loading product harvest details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-[#1B3D2B]">Product Not Found</h2>
        <p className="text-xs text-[#785338]">This item may no longer be available in our current catalog.</p>
        <button
          onClick={onBackToShop}
          className="px-6 py-2.5 rounded-xl bg-[#1B3D2B] text-white text-xs font-semibold"
        >
          Back to Shop Catalog
        </button>
      </div>
    );
  }

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const comparePrice = selectedVariant?.compare_at_price || product.compare_at_price;
  const currentWeight = selectedVariant ? selectedVariant.weight_label : product.weight;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    onNavigateToCheckout();
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `*Order Inquiry - Vaishno Karthik*\n\nProduct: *${product.name}*\nPack Size: ${currentWeight}\nQuantity: ${quantity}\nTotal: ₹${(currentPrice * quantity).toFixed(0)}\n\nPlease advise delivery schedule and address confirmation.`
    );
    window.open(`https://wa.me/919848856787?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#785338] hover:text-[#1B3D2B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Products</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-[#785338] hover:text-[#1B3D2B] px-3 py-1.5 rounded-xl bg-white border border-[#EAE2D5] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Product'}</span>
          </button>
        </div>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#EAE2D5] p-6 sm:p-10 shadow-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Left: Product Images */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F4EFE6] border border-[#EAE2D5]">
                <img
                  src={activeImage || product.image || 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.is_featured && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1B3D2B] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Vaishno Karthik Signature
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails (if gallery exists) */}
              {product.gallery && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  <button
                    onClick={() => setActiveImage(product.image || '')}
                    className={`w-18 h-18 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === product.image ? 'border-[#1B3D2B]' : 'border-transparent'
                    }`}
                  >
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </button>
                </div>
              )}

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-3 text-center border-t border-[#F4EFE6]">
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5]">
                  <Leaf className="w-5 h-5 text-[#C5A059] mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-[#1B3D2B]">100% Pure</p>
                  <p className="text-[9px] text-[#785338]">No adulteration</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5]">
                  <ShieldCheck className="w-5 h-5 text-[#C5A059] mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-[#1B3D2B]">Quality Tested</p>
                  <p className="text-[9px] text-[#785338]">Hand-sorted lot</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5]">
                  <Truck className="w-5 h-5 text-[#C5A059] mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-[#1B3D2B]">Free Over ₹999</p>
                  <p className="text-[9px] text-[#785338]">Safe doorstep delivery</p>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Purchase Controls */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#785338] uppercase">
                    {product.category?.name}
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1B3D2B] mt-1">
                    {product.name}
                  </h1>
                  {product.sku && (
                    <span className="text-[10px] text-[#A89F91] tracking-wider uppercase">
                      SKU: {product.sku}
                    </span>
                  )}
                </div>

                {/* Pricing Box */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#1B3D2B]">
                    ₹{currentPrice.toFixed(0)}
                  </span>
                  {comparePrice && comparePrice > currentPrice && (
                    <>
                      <span className="text-base text-[#A89F91] line-through">
                        ₹{comparePrice.toFixed(0)}
                      </span>
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-md">
                        Save {Math.round(((comparePrice - currentPrice) / comparePrice) * 100)}%
                      </span>
                    </>
                  )}
                  <span className="text-xs text-[#785338] ml-auto">
                    (Inclusive of all taxes)
                  </span>
                </div>

                {/* Weight / Pack Variant Selector */}
                {product.variants && product.variants.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-2">
                      Choose Pack Size / Weight:
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                            selectedVariant?.id === v.id
                              ? 'bg-[#1B3D2B] text-white border-[#1B3D2B] shadow-md scale-102'
                              : 'bg-white text-[#4A3B32] border-[#EAE2D5] hover:border-[#1B3D2B]'
                          }`}
                        >
                          {v.weight_label} — ₹{v.price.toFixed(0)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity and Availability */}
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider">
                      Quantity:
                    </label>
                    <div className="flex items-center border border-[#EAE2D5] rounded-xl bg-[#FAF7F2]">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3.5 py-1.5 text-base font-bold text-[#1B3D2B] hover:bg-[#EAE2D5] rounded-l-xl transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 text-sm font-bold text-[#1B3D2B]">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3.5 py-1.5 text-base font-bold text-[#1B3D2B] hover:bg-[#EAE2D5] rounded-r-xl transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                    <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                    In Stock & Fresh Batch
                  </span>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-3 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className={`py-3.5 px-6 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-md ${
                        isAdded
                          ? 'bg-green-700 text-white'
                          : 'bg-[#1B3D2B] text-white hover:bg-[#2A543A]'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isAdded ? 'Added to Cart!' : 'Add to Cart'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleBuyNow}
                      className="py-3.5 px-6 rounded-2xl text-sm font-semibold bg-[#C5A059] text-[#1B3D2B] hover:bg-[#D4AF37] flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                    >
                      <Zap className="w-4 h-4 fill-[#1B3D2B]" />
                      <span>Buy Now</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="w-full py-3 px-4 rounded-2xl bg-[#25D366]/15 text-[#137333] border border-[#25D366]/30 font-semibold text-xs hover:bg-[#25D366]/25 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-[#25D366] text-transparent" />
                    <span>Order this item directly on WhatsApp</span>
                  </button>
                </div>

                {/* Detailed Informational Accordions */}
                <div className="pt-6 border-t border-[#F4EFE6] space-y-4 text-xs text-[#5A493E]">
                  <div>
                    <h4 className="font-bold text-[#1B3D2B] text-sm mb-1">Product Description</h4>
                    <p className="leading-relaxed">{product.description || product.short_description}</p>
                  </div>

                  {product.ingredients && (
                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE2D5]">
                      <h4 className="font-bold text-[#1B3D2B] mb-1">Ingredients</h4>
                      <p className="leading-relaxed">{product.ingredients}</p>
                    </div>
                  )}

                  {product.storage_info && (
                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE2D5]">
                      <h4 className="font-bold text-[#1B3D2B] mb-1">Storage & Freshness Tips</h4>
                      <p className="leading-relaxed">{product.storage_info}</p>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-serif font-bold text-[#1B3D2B] mb-6">
              You May Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onProductClick={onSelectProduct}
                  onBuyNowDirect={() => onNavigateToCheckout()}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
