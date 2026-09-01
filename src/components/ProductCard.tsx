import React from 'react';
import { ShieldAlert, CheckCircle2, Clock, Sparkles, Plus, Eye, Check, FlaskConical } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickPreOrder: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isItemInCart: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickPreOrder,
  onViewDetails,
  isItemInCart
}) => {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const getCategoryMeta = (cat: Product['category']) => {
    switch (cat) {
      case 'milk':
        return {
          label: 'Milk Solution Vials',
          badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
          iconSymbol: '🥛',
          focusColor: '#16A34A'
        };
      case 'paneer':
        return {
          label: 'Paneer Solution Vials',
          badgeBg: 'bg-orange-50 text-orange-900 border-orange-200',
          iconSymbol: '🧀',
          focusColor: '#E53935'
        };
      case 'ghee':
        return {
          label: 'Desi Ghee Solution Vials',
          badgeBg: 'bg-yellow-50 text-yellow-900 border-yellow-200',
          iconSymbol: '🧈',
          focusColor: '#E53935'
        };
      case 'combo':
      default:
        return {
          label: 'Complete All-in-1 Suite',
          badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          iconSymbol: '🛡️',
          focusColor: '#16A34A'
        };
    }
  };

  const meta = getCategoryMeta(product.category);

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-[#111827]/10 hover:border-[#111827]/30 transition-all duration-200 hover:shadow-lg flex flex-col overflow-hidden"
    >
      {/* Product Card Top Header */}
      <div className="p-3.5 sm:p-5 pb-2.5 sm:pb-3 border-b border-[#111827]/5 bg-[#FAF8F5]/60 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
          <span className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border ${meta.badgeBg} truncate`}>
            <span>{meta.iconSymbol}</span>
            <span className="truncate">{meta.label}</span>
          </span>
          {product.tag && (
            <span className="inline-flex items-center text-[9px] sm:text-[10px] font-bold tracking-wide uppercase px-1.5 sm:px-2 py-0.5 rounded bg-[#E53935] text-white shrink-0">
              {product.tag}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-[#111827]/70 bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-[#111827]/10 shrink-0">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#16A34A]" />
          <span>{product.testDurationSeconds}s Reaction</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onViewDetails(product)}
            className="text-sm sm:text-base lg:text-lg font-bold text-[#111827] group-hover:text-[#E53935] transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#111827]/75 mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>

          {/* Chemical Solution Color Reaction Preview */}
          {product.colorReaction && (
            <div className="mt-3 p-2 rounded-xl bg-[#FAF8F5] border border-[#111827]/10 space-y-1.5">
              <div className="grid grid-cols-2 gap-1 text-[10px] font-semibold">
                <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-1 rounded-md flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">Pure: {product.colorReaction.pureColor.split('/')[0]}</span>
                </div>
                <div className="bg-red-50 text-red-900 border border-red-200 px-2 py-1 rounded-md flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                  <span className="truncate">Adulterated: {product.colorReaction.adulteratedColor.split('/')[0]}</span>
                </div>
              </div>
            </div>
          )}

          {/* Adulterants detected */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1">
            <span className="text-[10px] font-bold text-[#111827]/60">Catches:</span>
            {product.detects.slice(0, 2).map((item, idx) => (
              <span 
                key={idx}
                className="text-[10px] font-medium bg-[#F4EFE6] text-[#111827] px-1.5 py-0.5 rounded border border-[#111827]/5"
              >
                {item}
              </span>
            ))}
            {product.detects.length > 2 && (
              <span className="text-[10px] font-semibold text-[#E53935] bg-[#E53935]/10 px-1.5 py-0.5 rounded">
                +{product.detects.length - 2} more
              </span>
            )}
          </div>

          {/* Kit Details */}
          <div className="mt-2.5 sm:mt-3 flex items-center justify-between text-xs text-[#111827]/80 bg-[#FAF8F5] p-2 sm:p-2.5 rounded-lg border border-[#111827]/5">
            <span className="font-semibold flex items-center gap-1 text-[10px] sm:text-[11px]">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#16A34A]" />
              {product.testsCount} Solution Vials
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#16A34A] font-bold bg-[#16A34A]/10 px-1.5 sm:px-2 py-0.5 rounded">
              Ready-to-Use
            </span>
          </div>
        </div>

        {/* Pricing and Action Section */}
        <div className="mt-4 sm:mt-5 pt-2.5 sm:pt-3 border-t border-[#111827]/10">
          <div className="flex items-baseline justify-between mb-2.5 sm:mb-3">
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-[#111827]">
                ₹{product.price}
              </span>
              <span className="text-xs text-[#111827]/50 line-through ml-1.5 sm:ml-2">
                ₹{product.originalPrice}
              </span>
              <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-[11px] font-bold text-[#16A34A] bg-[#16A34A]/10 px-1.5 py-0.5 rounded">
                {discountPercent}% OFF
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#E53935] tracking-wider">
              Launch Batch
            </span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`details-btn-${product.id}`}
              onClick={() => onViewDetails(product)}
              className="flex items-center justify-center gap-1 text-xs font-semibold py-2.5 px-2 rounded-lg border border-[#111827]/20 text-[#111827] bg-white hover:bg-[#F4EFE6] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Color Reaction</span>
            </button>

            <button
              id={`quick-preorder-btn-${product.id}`}
              onClick={() => onQuickPreOrder(product)}
              className="flex items-center justify-center gap-1 text-xs font-bold py-2.5 px-2 rounded-lg bg-[#E53935] hover:bg-[#C62828] text-white transition-all shadow-sm active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pre-Order</span>
            </button>
          </div>

          {/* Add to Cart secondary button */}
          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={() => onAddToCart(product)}
            className={`w-full mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg transition-all border ${
              isItemInCart
                ? 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30'
                : 'bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#111827] border-[#111827]/10'
            }`}
          >
            {isItemInCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Added to Pre-order Cart</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};
