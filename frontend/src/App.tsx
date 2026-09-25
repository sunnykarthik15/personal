import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { AuthModal } from './components/common/AuthModal';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';
import { CartDrawer } from './components/cart/CartDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('');
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string | undefined>(undefined);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string>('');

  const navigateTo = (tab: string, extra?: any) => {
    if (tab === 'shop' && extra?.category) {
      setShopCategoryFilter(extra.category);
    } else if (tab === 'shop') {
      setShopCategoryFilter(undefined);
    }

    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    setCurrentTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (orderNumber: string) => {
    setCompletedOrderNumber(orderNumber);
    setCurrentTab('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#2C241E]">
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => navigateTo(tab)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={(tab, extra) => navigateTo(tab, extra)}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentTab === 'shop' && (
          <ShopPage
            initialCategory={shopCategoryFilter}
            onSelectProduct={handleSelectProduct}
            onNavigateToCheckout={() => navigateTo('checkout')}
          />
        )}

        {currentTab === 'categories' && (
          <CategoriesPage
            onSelectCategory={(slug) => navigateTo('shop', { category: slug })}
          />
        )}

        {currentTab === 'product-detail' && (
          <ProductDetailPage
            slug={selectedProductSlug}
            onBackToShop={() => navigateTo('shop')}
            onSelectProduct={handleSelectProduct}
            onNavigateToCheckout={() => navigateTo('checkout')}
          />
        )}

        {currentTab === 'cart' && (
          <CartPage
            onNavigateToShop={() => navigateTo('shop')}
            onNavigateToCheckout={() => navigateTo('checkout')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentTab === 'checkout' && (
          <CheckoutPage
            onBackToCart={() => navigateTo('cart')}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {currentTab === 'order-success' && (
          <OrderSuccessPage
            orderNumber={completedOrderNumber}
            onNavigateToShop={() => navigateTo('shop')}
            onNavigateToHome={() => navigateTo('home')}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onNavigateToShop={() => navigateTo('shop')}
            onNavigateToContact={() => navigateTo('contact')}
          />
        )}

        {currentTab === 'contact' && <ContactPage />}

        {currentTab === 'faq' && <FAQPage />}

        {currentTab === 'account' && (
          <AccountPage
            onNavigateToShop={() => navigateTo('shop')}
          />
        )}

        {currentTab === 'privacy-policy' && (
          <PrivacyPolicyPage onBack={() => navigateTo('home')} />
        )}

        {currentTab === 'terms' && (
          <TermsPage onBack={() => navigateTo('home')} />
        )}

        {currentTab === 'shipping-policy' && (
          <ShippingPolicyPage onBack={() => navigateTo('home')} />
        )}

        {currentTab === 'refund-policy' && (
          <RefundPolicyPage onBack={() => navigateTo('home')} />
        )}

        {currentTab === 'admin' && <AdminDashboardPage />}
      </main>

      {/* Footer */}
      <Footer setCurrentTab={(tab) => navigateTo(tab)} />

      {/* Shared Global Floating Elements */}
      <WhatsAppFloatingButton />
      <Toast />
      <AuthModal />
      <CartDrawer
        onNavigateToCheckout={() => navigateTo('checkout')}
        onNavigateToShop={() => navigateTo('shop')}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
