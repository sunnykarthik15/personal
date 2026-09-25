import React, { useState } from 'react';
import { 
  ShoppingBag, Search, User as UserIcon, Menu, X, 
  Phone, Sparkles, ShieldCheck, Heart 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onSearchOpen?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onSearchOpen }) => {
  const { itemCount, setIsCartOpen } = useCart();
  const { user, isAuthenticated, isAdmin, setIsAuthModalOpen, setAuthModalMode, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Catalog' },
    { id: 'categories', label: 'Categories' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE2D5] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#1B3D2B] text-[#FAF7F2] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
            <span className="font-medium tracking-wide">
              Free Delivery on orders above ₹999 | Traditional Cold Pressed Oils & Natural Jaggery Sweets
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#E8DFC8]">
            <a href="tel:9848856787" className="hover:text-white flex items-center gap-1 transition-colors">
              <Phone className="w-3 h-3 text-[#C5A059]" />
              <span>9848856787</span>
            </a>
            <span className="text-[#C5A059]/50">|</span>
            <a href="tel:9642145789" className="hover:text-white flex items-center gap-1 transition-colors">
              <span>9642145789</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="cursor-pointer group flex flex-col"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#1B3D2B] tracking-tight group-hover:text-[#2A543A] transition-colors">
                VAISHNO KARTHIK
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#1B3D2B]/10 text-[#1B3D2B] border border-[#1B3D2B]/15">
                ESTD. 2026
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-widest text-[#785338] uppercase">
              Dry Fruits, Spices & Cold Pressed Oils
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-all px-3 py-1.5 rounded-full ${
                  currentTab === link.id
                    ? 'bg-[#1B3D2B] text-[#FAF7F2] shadow-xs'
                    : 'text-[#3E3228] hover:text-[#1B3D2B] hover:bg-[#F3EDE2]'
                }`}
              >
                {link.label}
              </button>
            ))}

            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  currentTab.startsWith('admin')
                    ? 'bg-[#C5A059] text-[#1B3D2B]'
                    : 'bg-[#1B3D2B]/10 text-[#1B3D2B] border border-[#C5A059]/40 hover:bg-[#C5A059]/20'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                Admin Panel
              </button>
            )}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search */}
            <button
              onClick={() => {
                if (currentTab !== 'shop') handleNavClick('shop');
                if (onSearchOpen) onSearchOpen();
              }}
              title="Search Catalog"
              className="p-2.5 rounded-full text-[#3E3228] hover:text-[#1B3D2B] hover:bg-[#F3EDE2] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Account / Login */}
            <div className="relative">
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    setIsUserDropdownOpen(!isUserDropdownOpen);
                  } else {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }
                }}
                title={isAuthenticated ? user?.full_name : 'Sign In'}
                className="p-2.5 rounded-full text-[#3E3228] hover:text-[#1B3D2B] hover:bg-[#F3EDE2] transition-colors flex items-center gap-1.5"
              >
                <UserIcon className="w-5 h-5" />
                {isAuthenticated && (
                  <span className="hidden lg:inline-block text-xs font-medium max-w-[85px] truncate">
                    {user?.full_name.split(' ')[0]}
                  </span>
                )}
              </button>

              {/* User Dropdown */}
              {isUserDropdownOpen && isAuthenticated && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#EAE2D5] py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#F4EFE6]">
                    <p className="text-sm font-semibold text-[#1B3D2B]">{user?.full_name}</p>
                    <p className="text-xs text-[#785338] truncate">{user?.email}</p>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-[#1B3D2B]/10 text-[#1B3D2B] font-medium capitalize">
                      {user?.role}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      handleNavClick('account');
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[#3E3228] hover:bg-[#FAF7F2] transition-colors"
                  >
                    My Orders & Profile
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        handleNavClick('admin');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[#1B3D2B] font-medium hover:bg-[#FAF7F2] transition-colors"
                    >
                      Admin Dashboard
                    </button>
                  )}

                  <div className="border-t border-[#F4EFE6] my-1"></div>

                  <button
                    onClick={() => {
                      logout();
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#1B3D2B] text-white hover:bg-[#2A543A] transition-transform active:scale-95 shadow-md flex items-center justify-center"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C5A059] text-[#1B3D2B] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#3E3228] hover:bg-[#F3EDE2] transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EAE2D5] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                currentTab === link.id
                  ? 'bg-[#1B3D2B] text-[#FAF7F2]'
                  : 'text-[#3E3228] hover:bg-[#F3EDE2]'
              }`}
            >
              {link.label}
            </button>
          ))}

          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold bg-[#C5A059]/20 text-[#1B3D2B] border border-[#C5A059]/40"
            >
              Admin Dashboard
            </button>
          )}

          <div className="pt-4 border-t border-[#EAE2D5] flex items-center justify-between text-xs text-[#785338]">
            <a href="tel:9848856787" className="flex items-center gap-1 font-semibold text-[#1B3D2B]">
              <Phone className="w-3.5 h-3.5" /> 9848856787
            </a>
            <a href="tel:9642145789" className="flex items-center gap-1 font-semibold text-[#1B3D2B]">
              <Phone className="w-3.5 h-3.5" /> 9642145789
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
