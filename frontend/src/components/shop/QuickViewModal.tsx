import React, { useState } from 'react';
import { X, ShoppingBag, Zap, MessageCircle, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Product, ProductVariant } from '../../types';
import { useCart } from '../../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onViewFullDetails: (slug: string) => void;
  onBuyNow: (product: Product, variant?: ProductVariant) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onViewFullDetails,
  onBuyNow,
}) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const defaultVariant = product.variants?.find((v) => v.is_default) || product.variants?.[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(defaultVariant);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const price = selectedVariant ? selectedVariant.price : product.price;
  const comparePrice = selectedVariant?.compare_at_price || product.compare_at_price;
  const weight = selectedVariant ? selectedVariant.weight_label : product.weight;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello Vaishno Karthik! I would like to order:\n\n*${product.name}*\nPack Size: ${weight}\nQuantity: ${quantity}\nPrice: ₹${price * quantity}\n\nPlease confirm availability!`
    );
    window.open(`https://wa.me/919848856787?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#EAE2D5] overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#785338] shadow-md transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-[#F4EFE6] overflow-hidden">
            <img
              src={product.image || 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.is_featured && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1B3D2B] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                Featured Heritage
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#785338] uppercase">
                {product.category?.name}
              </span>
              <h2 className="font-serif font-bold text-2xl text-[#1B3D2B] mt-1">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-bold text-[#1B3D2B]">
                  ₹{price.toFixed(0)}
                </span>
                {comparePrice && comparePrice > price && (
                  <span className="text-sm text-[#A89F91] line-through">
                    ₹{comparePrice.toFixed(0)}
                  </span>
                )}
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F4EFE6] text-[#785338]">
                  Pack: {weight}
                </span>
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 1 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1.5 uppercase tracking-wider">
                    Select Pack Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-xl border transition-all ${
                          selectedVariant?.id === v.id
                            ? 'bg-[#1B3D2B] text-white border-[#1B3D2B] shadow-xs'
                            : 'bg-white text-[#4A3B32] border-[#EAE2D5] hover:border-[#1B3D2B]'
                        }`}
                      >
                        {v.weight_label} - ₹{v.price.toFixed(0)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="mt-4 text-xs text-[#785338] leading-relaxed">
                {product.description || product.short_description}
              </p>

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-4">
                <label className="text-xs font-semibold text-[#4A3B32] uppercase tracking-wider">
                  Quantity:
                </label>
                <div className="flex items-center border border-[#EAE2D5] rounded-xl bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-sm font-bold text-[#1B3D2B] hover:bg-[#F4EFE6] rounded-l-xl transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-bold text-[#1B3D2B]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 text-sm font-bold text-[#1B3D2B] hover:bg-[#F4EFE6] rounded-r-xl transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-[#EAE2D5] space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
                    added ? 'bg-green-700 text-white' : 'bg-[#1B3D2B] text-white hover:bg-[#2A543A]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBuyNow(product, selectedVariant);
                  }}
                  className="py-3 px-4 rounded-xl text-xs font-semibold bg-[#C5A059] text-[#1B3D2B] hover:bg-[#D4AF37] flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-[#1B3D2B]" />
                  <span>Buy Now</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366]/15 text-[#137333] border border-[#25D366]/30 font-semibold text-xs hover:bg-[#25D366]/25 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-[#25D366] text-transparent" />
                <span>Quick WhatsApp Order</span>
              </button>

              <div className="text-center pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onViewFullDetails(product.slug);
                  }}
                  className="text-xs font-semibold text-[#1B3D2B] hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <span>View Complete Product Details & Storage Info</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
