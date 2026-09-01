import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onClearCart
}) => {
  if (!isOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const originalSubtotal = cart.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  const totalSavings = originalSubtotal - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        id="cart-drawer-container"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#111827]/10 bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E53935] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#111827]">
                Your Pre-Order Cart
              </h2>
              <p className="text-xs text-[#111827]/70">
                {totalItemsCount} {totalItemsCount === 1 ? 'kit' : 'kits'} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-[#E53935] hover:underline font-semibold px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-1.5 text-[#111827]/60 hover:text-[#111827] rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body - Items */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#111827]/60">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#111827]/10 flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8 text-[#111827]/30" />
              </div>
              <h3 className="font-bold text-base text-[#111827] mb-1">
                Your pre-order cart is empty
              </h3>
              <p className="text-xs max-w-xs text-[#111827]/70 mb-4">
                Explore our milk, paneer, and ghee adulteration testing kits to ensure pure food for your family.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#111827] text-white text-xs font-bold rounded-lg hover:bg-[#111827]/90 transition-colors"
              >
                Browse Testing Kits
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div 
                key={product.id}
                id={`cart-item-${product.id}`}
                className="bg-[#FAF8F5]/80 p-3.5 rounded-xl border border-[#111827]/10 flex gap-3 items-start"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-sm text-[#111827] leading-tight">
                      {product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-[#111827]/40 hover:text-[#E53935] p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="inline-block text-[11px] font-medium text-[#16A34A] bg-[#16A34A]/10 px-1.5 py-0.2 rounded mt-1">
                    {product.testsCount} Tests • {product.testDurationSeconds}s Result
                  </span>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-extrabold text-sm text-[#111827]">
                        ₹{product.price * quantity}
                      </span>
                      <span className="text-xs text-[#111827]/50 line-through">
                        ₹{product.originalPrice * quantity}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#111827]/20 rounded-md bg-white overflow-hidden shadow-2xs">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="px-2 py-1 hover:bg-[#F4EFE6] text-[#111827] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#111827] min-w-6 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="px-2 py-1 hover:bg-[#F4EFE6] text-[#111827] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#111827]/10 bg-[#FAF8F5] space-y-3">
            <div className="space-y-1.5 text-xs text-[#111827]/80">
              <div className="flex justify-between">
                <span>Original MRP Total:</span>
                <span className="line-through text-[#111827]/50">₹{originalSubtotal}</span>
              </div>
              <div className="flex justify-between text-[#16A34A] font-medium">
                <span>Launch Pre-Order Discount:</span>
                <span>-₹{totalSavings}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping:</span>
                <span className="font-semibold text-[#16A34A]">FREE (Launch Offer)</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#111827] pt-2 border-t border-[#111827]/10">
                <span>Total Amount:</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex items-center gap-2 text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>Priority dispatch in Batch #1 with zero upfront payment required.</span>
            </div>

            <button
              id="proceed-checkout-btn"
              onClick={onProceedToCheckout}
              className="w-full flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-md active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enter Delivery Info & Pre-Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
