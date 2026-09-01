import React from 'react';
import { ShieldCheck, ShoppingBag, SlidersHorizontal, Search, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { CartItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentView: 'customer' | 'admin';
  onViewChange: (view: 'customer' | 'admin') => void;
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenOrderLookup: () => void;
  pendingOrdersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  cart,
  onOpenCart,
  onOpenOrderLookup,
  pendingOrdersCount
}) => {
  const { currentUser, userProfile, signIn, signOut, isAdmin } = useAuth();
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#111827]/10 transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-[#111827] text-[#FBF9F5] text-[11px] sm:text-xs font-medium py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#16A34A] shrink-0 animate-pulse" />
        <span>Launch Batch #1 Pre-Orders Open • Free Delivery Across India • Zero Advance Required</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Brand Logo & Identity */}
          <div 
            id="brand-logo-btn"
            onClick={() => onViewChange('customer')}
            className="flex items-center cursor-pointer select-none py-2 pr-4 focus:outline-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onViewChange('customer')}
          >
            <BrandLogo variant="navbar" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          {currentView === 'customer' && (
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <a
                href="#products-section"
                className="text-xs sm:text-sm font-semibold text-[#111827]/80 hover:text-[#111827] transition-colors"
              >
                Testing Kits
              </a>
              <a
                href="#simulator-section"
                className="text-xs sm:text-sm font-semibold text-[#111827]/80 hover:text-[#111827] transition-colors"
              >
                Color Simulator
              </a>
              <a
                href="#adulteration-info-section"
                className="text-xs sm:text-sm font-semibold text-[#111827]/80 hover:text-[#111827] flex items-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Adulteration Guide</span>
              </a>
              <button
                id="track-order-header-btn"
                onClick={onOpenOrderLookup}
                className="text-xs sm:text-sm font-semibold text-[#111827]/80 hover:text-[#111827] flex items-center gap-1.5 transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-[#111827]/60" />
                <span>Track Pre-Order</span>
              </button>
            </nav>
          )}

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Google Authentication Control */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-[#F4EFE6] pl-2 pr-2.5 py-1 rounded-xl border border-[#111827]/10">
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName || 'User'} 
                    className="w-6 h-6 rounded-full border border-[#111827]/20 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#111827] text-white text-[11px] font-bold flex items-center justify-center">
                    {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                  </div>
                )}
                <span className="hidden sm:inline text-xs font-semibold text-[#111827] max-w-[90px] truncate">
                  {currentUser.displayName?.split(' ')[0] || 'Account'}
                </span>
                <button
                  id="sign-out-btn"
                  onClick={signOut}
                  title="Sign Out"
                  className="text-[#111827]/60 hover:text-[#E53935] p-0.5 rounded transition-colors"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="google-signin-btn"
                onClick={signIn}
                className="flex items-center gap-1.5 bg-white hover:bg-white/90 text-[#111827] px-3 py-1.5 sm:py-2 rounded-xl font-semibold text-xs border border-[#111827]/15 transition-all shadow-xs shrink-0"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Cart Button (Customer View) */}
            {currentView === 'customer' && (
              <button
                id="cart-toggle-btn"
                onClick={onOpenCart}
                className="relative inline-flex items-center justify-center gap-2 bg-[#111827] hover:bg-[#111827]/90 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs active:scale-97 shrink-0"
                aria-label="View Pre-order Cart"
              >
                <ShoppingBag className="w-4 h-4 text-[#FBF9F5]" />
                <span className="hidden sm:inline">Pre-Order Cart</span>
                <span className="sm:hidden">Cart</span>
                {totalCartCount > 0 && (
                  <span className="bg-[#E53935] text-white text-[10px] sm:text-xs font-extrabold px-1.5 py-0.2 rounded-full min-w-5 h-5 flex items-center justify-center shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </button>
            )}

            {/* Subtle Divider */}
            <div className="h-6 w-px bg-[#111827]/15 hidden xs:block" />

            {/* View Switcher (Customer Store <-> Admin Portal) */}
            <div className="flex items-center bg-[#F4EFE6] p-1 rounded-xl border border-[#111827]/10 text-xs font-semibold shrink-0">
              <button
                id="view-customer-tab"
                onClick={() => onViewChange('customer')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  currentView === 'customer'
                    ? 'bg-white text-[#111827] shadow-xs font-bold'
                    : 'text-[#111827]/70 hover:text-[#111827]'
                }`}
              >
                Store
              </button>
              <button
                id="view-admin-tab"
                onClick={() => onViewChange('admin')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  currentView === 'admin'
                    ? 'bg-[#111827] text-white shadow-xs font-bold'
                    : 'text-[#111827]/70 hover:text-[#111827]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Admin</span>
                {pendingOrdersCount > 0 && (
                  <span className="bg-[#E53935] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {pendingOrdersCount}
                  </span>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

