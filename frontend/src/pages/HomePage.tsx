import React, { useEffect, useState } from 'react';
import { Hero } from '../components/home/Hero';
import { TrustCards } from '../components/home/TrustCards';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { ColdPressedOilsSpotlight } from '../components/home/ColdPressedOilsSpotlight';
import { NaturalJaggerySweetsSpotlight } from '../components/home/NaturalJaggerySweetsSpotlight';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { StorySection } from '../components/home/StorySection';
import { CustomerCTA } from '../components/home/CustomerCTA';
import { QuickViewModal } from '../components/shop/QuickViewModal';
import { Product, ProductVariant } from '../types';
import { api } from '../services/api';

interface HomePageProps {
  onNavigate: (tab: string, extra?: any) => void;
  onSelectProduct: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      api.getFeaturedProducts(12),
      api.getProducts({ limit: 40 }),
    ])
      .then(([featured, catalog]) => {
        setFeaturedProducts(featured);
        setAllProducts(catalog.items);
      })
      .catch((err) => {
        console.error('Failed to load home page products', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleBuyNowDirect = (product: Product, variant?: ProductVariant) => {
    onNavigate('checkout');
  };

  return (
    <div>
      {/* 1. Hero */}
      <Hero
        onShopClick={() => onNavigate('shop')}
        onExploreClick={() => onNavigate('categories')}
      />

      {/* 2. Trust Cards */}
      <TrustCards />

      {/* 3. Shop by Category */}
      <CategorySection
        onSelectCategory={(categorySlug) => onNavigate('shop', { category: categorySlug })}
      />

      {/* 4. Featured Products Grid */}
      <FeaturedProducts
        products={featuredProducts.length > 0 ? featuredProducts : allProducts}
        isLoading={isLoading}
        onProductClick={onSelectProduct}
        onQuickView={(product) => setQuickViewProduct(product)}
        onViewAllClick={() => onNavigate('shop')}
        onBuyNowDirect={handleBuyNowDirect}
      />

      {/* 5. Cold Pressed Oils Spotlight */}
      <ColdPressedOilsSpotlight
        products={allProducts}
        onProductClick={onSelectProduct}
        onExploreOils={() => onNavigate('shop', { category: 'cold-pressed-oils' })}
      />

      {/* 6. Natural Jaggery Sweets Spotlight */}
      <NaturalJaggerySweetsSpotlight
        products={allProducts}
        onProductClick={onSelectProduct}
        onExploreSweets={() => onNavigate('shop', { category: 'natural-jaggery-sweets' })}
      />

      {/* 7. Why Choose Us */}
      <WhyChooseUs />

      {/* 8. Story Section */}
      <StorySection onLearnMore={() => onNavigate('about')} />

      {/* 9. Customer CTA */}
      <CustomerCTA
        onShopClick={() => onNavigate('shop')}
        onContactClick={() => onNavigate('contact')}
      />

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
