import React from 'react';
import { X, ShieldCheck, AlertTriangle, CheckCircle2, Clock, Truck, Sparkles, Plus, Check, FlaskConical, Droplets } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onQuickPreOrder: (product: Product) => void;
  isItemInCart: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onQuickPreOrder,
  isItemInCart
}) => {
  if (!isOpen || !product) return null;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="product-detail-modal"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#111827]/10 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="bg-[#FAF8F5] p-4 sm:p-6 border-b border-[#111827]/10 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
              <span className="bg-[#E53935] text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                Chemical Solution Home Kit
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#16A34A] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Colorimetric Detection</span>
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-[#111827] leading-snug">
              {product.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#111827]/70 mt-1 leading-relaxed">
              {product.shortDesc}
            </p>
          </div>

          <button
            id="close-product-modal-btn"
            onClick={onClose}
            className="text-[#111827]/60 hover:text-[#111827] p-1.5 sm:p-2 rounded-full hover:bg-black/5 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Overview & Key Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-[#FAF8F5] p-2.5 sm:p-3 rounded-lg border border-[#111827]/5">
              <span className="text-[10px] sm:text-[11px] text-[#111827]/60 block font-medium">Solution Vials Included</span>
              <span className="text-xs sm:text-sm font-bold text-[#111827] flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16A34A] shrink-0" />
                <span>{product.testsCount} Pre-filled Vials</span>
              </span>
            </div>
            <div className="bg-[#FAF8F5] p-2.5 sm:p-3 rounded-lg border border-[#111827]/5">
              <span className="text-[10px] sm:text-[11px] text-[#111827]/60 block font-medium">Reaction Time</span>
              <span className="text-xs sm:text-sm font-bold text-[#111827] flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16A34A] shrink-0" />
                <span>{product.testDurationSeconds} Seconds</span>
              </span>
            </div>
            <div className="bg-[#FAF8F5] p-2.5 sm:p-3 rounded-lg border border-[#111827]/5 col-span-2 sm:col-span-1">
              <span className="text-[10px] sm:text-[11px] text-[#111827]/60 block font-medium">Pre-Order Batch</span>
              <span className="text-[11px] sm:text-xs font-bold text-[#E53935] flex items-center gap-1 mt-0.5">
                <Truck className="w-3.5 h-3.5 shrink-0" />
                <span>{product.estimatedDelivery}</span>
              </span>
            </div>
          </div>

          {/* Chemical Solution Vial Specification */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 text-white space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
              <FlaskConical className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Chemical Testing Solution Specifications</span>
            </div>
            <div className="text-xs space-y-1 text-slate-200">
              <div><strong className="text-white">Active Solution:</strong> {product.solutionName}</div>
              <div><strong className="text-white">Packaging:</strong> {product.solutionVialType}</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                100% Non-hazardous household formulation. Hermetically sealed leak-proof safety vials.
              </div>
            </div>
          </div>

          {/* Chemical Solution Color Reaction Guide */}
          {product.colorReaction && (
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] sm:text-xs uppercase font-bold text-[#111827] tracking-wider flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E53935] shrink-0" />
                  <span>Chemical Solution Color Change Guide:</span>
                </h4>
                <span className="text-[10px] sm:text-[11px] text-[#16A34A] font-semibold">
                  Instant visual result
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                
                {/* Pure Reaction Card */}
                <div className="p-3 sm:p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col justify-between space-y-2 sm:space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <span className="text-[11px] sm:text-xs font-bold uppercase text-emerald-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span>When Sample is PURE:</span>
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-extrabold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                        SAFE
                      </span>
                    </div>

                    <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-500 shrink-0"></div>
                      <span className="text-[11px] sm:text-xs">Solution turns: {product.colorReaction.pureColor}</span>
                    </div>

                    <p className="text-[11px] sm:text-xs text-[#111827]/80 mt-1.5 sm:mt-2 leading-relaxed">
                      {product.colorReaction.pureDescription}
                    </p>
                  </div>
                </div>

                {/* Adulterated Reaction Card */}
                <div className="p-3 sm:p-4 rounded-xl bg-red-50 border border-red-200 flex flex-col justify-between space-y-2 sm:space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <span className="text-[11px] sm:text-xs font-bold uppercase text-red-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-600 shrink-0"></span>
                        <span>When ADULTERATED:</span>
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-extrabold bg-red-200 text-red-900 px-2 py-0.5 rounded">
                        MILAWAT!
                      </span>
                    </div>

                    <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-red-200 text-xs font-bold text-red-900 flex items-center gap-2">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-red-600 shrink-0"></div>
                      <span className="text-[11px] sm:text-xs">Solution turns: {product.colorReaction.adulteratedColor}</span>
                    </div>

                    <p className="text-[11px] sm:text-xs text-[#111827]/80 mt-1.5 sm:mt-2 leading-relaxed">
                      {product.colorReaction.adulteratedDescription}
                    </p>
                  </div>
                </div>

              </div>

              {/* Mechanism */}
              <div className="p-2.5 sm:p-3 bg-[#FAF8F5] rounded-lg border border-[#111827]/10 text-[11px] sm:text-xs text-[#111827]/80 leading-relaxed">
                <span className="font-bold text-[#111827]">Reaction Chemistry: </span>
                {product.chemicalReactionDetails}
              </div>
            </div>
          )}

          {/* Dangerous Adulterants Detected */}
          <div>
            <h4 className="text-[11px] sm:text-xs uppercase font-bold text-[#E53935] tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Target Adulterants Caught By Solution:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
              {product.detects.map((adulterant, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-2 sm:p-2.5 bg-red-50/70 border border-red-100 rounded-lg text-xs font-semibold text-[#111827]"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E53935] shrink-0"></span>
                  <span className="text-[11px] sm:text-xs">{adulterant}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer / Actions */}
        <div className="bg-[#FAF8F5] p-4 sm:p-5 border-t border-[#111827]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-[#111827]">
                ₹{product.price}
              </span>
              <span className="text-xs sm:text-sm text-[#111827]/50 line-through">
                ₹{product.originalPrice}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded">
                Save {discountPercent}% Deal
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#111827]/70 mt-0.5">
              Includes {product.testsCount} chemical testing vials • Free delivery
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="modal-add-to-cart-btn"
              onClick={() => onAddToCart(product)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                isItemInCart
                  ? 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30'
                  : 'bg-white hover:bg-[#F4EFE6] text-[#111827] border-[#111827]/20'
              }`}
            >
              {isItemInCart ? (
                <>
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16A34A]" />
                  <span>In Cart</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              id="modal-preorder-now-btn"
              onClick={() => {
                onClose();
                onQuickPreOrder(product);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-lg bg-[#E53935] hover:bg-[#C62828] text-white text-xs font-bold transition-all shadow-sm active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Pre-Order Kit</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
