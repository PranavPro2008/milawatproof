import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Sparkles, CheckCircle2, FlaskConical, HelpCircle, ChevronDown, ArrowRight, Droplets, BookOpen } from 'lucide-react';
import { Product, ProductCategory, CartItem } from '../types';
import { ProductCard } from './ProductCard';
import { ChemicalSolutionSimulator } from './ChemicalSolutionSimulator';
import { AdulterationInfoSection } from './AdulterationInfoSection';
import { BrandLogo } from './BrandLogo';

interface CustomerStoreProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onQuickPreOrder: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onOpenOrderLookup: () => void;
}

export const CustomerStore: React.FC<CustomerStoreProps> = ({
  products,
  cart,
  onAddToCart,
  onQuickPreOrder,
  onViewDetails,
  onOpenOrderLookup
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredProducts = products.filter(p => {
    if (!p.active) return false;
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const categories: Array<{ id: ProductCategory | 'all'; label: string; icon: string }> = [
    { id: 'all', label: 'All Kits', icon: '✨' },
    { id: 'milk', label: 'Milk Vials', icon: '🥛' },
    { id: 'paneer', label: 'Paneer Vials', icon: '🧀' },
    { id: 'ghee', label: 'Desi Ghee Vials', icon: '🧈' },
    { id: 'combo', label: 'All-in-1 Packs', icon: '🛡️' }
  ];

  const faqs = [
    {
      q: 'How does the chemical solution test work?',
      a: 'Add a small dairy sample into the pre-filled solution vial and gently swirl. The liquid changes color within 45–60 seconds if synthetic adulterants (urea, detergent, starch, or vanaspati) are present.'
    },
    {
      q: 'What colors indicate pure vs adulterated dairy?',
      a: 'Pure dairy keeps the solution clear, pale green, or golden amber. Chemical adulterants like detergent or urea turn it Crimson Red, while starch turns it Indigo Blue.'
    },
    {
      q: 'Is any advance payment required for pre-ordering?',
      a: 'Zero upfront payment! Reserve your kit from Launch Batch #1 today and pay via Cash on Delivery or UPI upon dispatch.'
    },
    {
      q: 'Are the solutions safe to handle at home?',
      a: 'Yes, each solution is sealed in leak-proof micro-vials formulated specifically for non-hazardous household testing.'
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-[#FBF9F5] border-b border-[#111827]/10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#E53935]/10 border border-[#E53935]/20 text-[#E53935] px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  <FlaskConical className="w-3.5 h-3.5 shrink-0" />
                  <span>1-Minute Chemical Home Test</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-[#16A34A]/10 border border-[#16A34A]/25 text-[#16A34A] px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Zero Upfront Advance</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.2]">
                Put Dairy in the Solution. <span className="text-[#16A34A]">Instant Color Change</span> Exposes Adulteration.
              </h1>

              <p className="text-xs sm:text-base text-[#111827]/75 max-w-xl leading-relaxed">
                Over 68% of commercial dairy fails purity tests. Drop milk, paneer, or ghee into pre-filled solution vials to verify safety before you feed your family.
              </p>

              {/* 3 Steps Strip */}
              <div className="grid grid-cols-3 gap-2 pt-1 max-w-lg">
                <div className="p-2.5 rounded-lg bg-white border border-[#111827]/10 text-center">
                  <span className="text-xs font-bold text-[#111827] block">1. Add Sample</span>
                  <span className="text-[10px] text-[#111827]/60">A few drops in vial</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#111827]/10 text-center">
                  <span className="text-xs font-bold text-[#111827] block">2. Swirl 45s</span>
                  <span className="text-[10px] text-[#111827]/60">Chemical reaction</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#111827]/10 text-center">
                  <span className="text-xs font-bold text-[#16A34A] block">3. Check Color</span>
                  <span className="text-[10px] text-[#111827]/60">Instant verdict</span>
                </div>
              </div>

              {/* Pre-Order CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href="#products-section"
                  className="inline-flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-98"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Pre-Order Solution Kits</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>

                <a
                  href="#chemical-solution-section"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F4EFE6] text-[#111827] px-4 py-2.5 sm:py-3 rounded-xl font-semibold text-xs border border-[#111827]/20 transition-colors"
                >
                  <FlaskConical className="w-3.5 h-3.5 text-[#E53935] shrink-0" />
                  <span>Color Simulator</span>
                </a>
              </div>
            </div>

            {/* Right Hero Visual: Clean Brand Card & At-A-Glance Reaction */}
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#111827]/15 shadow-sm flex flex-col items-center justify-center text-center relative">
                <BrandLogo variant="hero" showTagline={true} />
              </div>

              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#111827]/10 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-[#FAF8F5]">
                  <span className="block font-bold text-[#111827]">🥛 Milk</span>
                  <span className="text-[10px] text-[#E53935] font-semibold">Turns Red</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8F5]">
                  <span className="block font-bold text-[#111827]">🧀 Paneer</span>
                  <span className="text-[10px] text-[#4F46E5] font-semibold">Turns Blue</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8F5]">
                  <span className="block font-bold text-[#111827]">🧈 Ghee</span>
                  <span className="text-[10px] text-[#DC2626] font-semibold">Turns Red</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Products Section */}
      <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="text-[10px] sm:text-xs font-bold text-[#E53935] uppercase tracking-wider mb-1">
              Launch Batch #1 • Zero Advance Required
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111827] tracking-tight">
              Select Your Testing Kits
            </h2>
          </div>

          {/* Category Pills */}
          <div className="flex overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap gap-1.5 p-1 bg-[#F4EFE6] rounded-xl border border-[#111827]/10 text-xs font-semibold scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#111827] text-white shadow-xs font-bold'
                    : 'text-[#111827]/70 hover:text-[#111827] hover:bg-white/60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProducts.map(product => {
            const isItemInCart = cart.some(item => item.product.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickPreOrder={onQuickPreOrder}
                onViewDetails={onViewDetails}
                isItemInCart={isItemInCart}
              />
            );
          })}
        </div>
      </section>

      {/* Educational Guide: What is Food Adulteration */}
      <AdulterationInfoSection />

      {/* Interactive Chemical Solution Color Change Simulator */}
      <ChemicalSolutionSimulator
        onSelectCategoryFilter={cat => {
          setSelectedCategory(cat);
          const el = document.getElementById('products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase text-[#111827]/60 tracking-wider mb-1">
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16A34A]" />
            <span>Chemical Solution Questions</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
            How Home Chemical Solution Testing Works
          </h3>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl border border-[#111827]/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-3.5 sm:p-4 text-left flex items-start justify-between gap-3 hover:bg-[#FAF8F5] transition-colors"
              >
                <span className="font-bold text-xs sm:text-sm text-[#111827] leading-snug">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#111827]/60 transition-transform shrink-0 mt-0.5 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-3.5 sm:p-4 pt-0 text-xs text-[#111827]/80 leading-relaxed border-t border-[#111827]/5 bg-[#FAF8F5]/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
