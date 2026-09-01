import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Truck, ArrowRight, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { PreOrder } from '../types';

interface PreOrderConfirmationModalProps {
  order: PreOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onViewInAdmin?: () => void;
}

export const PreOrderConfirmationModal: React.FC<PreOrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose,
  onViewInAdmin
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !order) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="preorder-confirmation-modal"
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#111827]/10 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Success Header */}
        <div className="bg-[#16A34A] text-white p-6 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-white text-[#16A34A] mx-auto flex items-center justify-center shadow-lg mb-3">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <span className="inline-block bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
            Pre-Order Confirmed
          </span>
          <h2 className="text-2xl font-bold tracking-tight">
            Thank you, {order.customer.name.split(' ')[0]}!
          </h2>
          <p className="text-xs text-white/90 max-w-sm mx-auto mt-1">
            Your Milawat Proof food adulteration testing kit pre-order has been registered for Priority Batch #1.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 space-y-5">
          
          {/* Tracking ID card */}
          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#111827]/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#111827]/60 block font-medium">Pre-Order Reference Number</span>
              <span className="text-base font-extrabold text-[#111827] tracking-wider font-mono">
                {order.id}
              </span>
            </div>
            <button
              onClick={handleCopyId}
              className="flex items-center gap-1 text-xs font-semibold text-[#111827] bg-white hover:bg-[#F4EFE6] px-3 py-1.5 rounded-lg border border-[#111827]/10 transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy ID'}</span>
            </button>
          </div>

          {/* Dispatch Notice */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-950">
                Estimated Dispatch: {order.batchDeliveryEstimate}
              </h4>
              <p className="text-xs text-emerald-900/80 mt-0.5 leading-relaxed">
                We will send dispatch SMS and WhatsApp updates to <span className="font-semibold">{order.customer.phone}</span>.
              </p>
            </div>
          </div>

          {/* Items & Shipping Summary */}
          <div className="border border-[#111827]/10 rounded-xl p-4 space-y-3 bg-[#FAF8F5]/50">
            <h4 className="text-xs font-bold uppercase text-[#111827]/70 tracking-wider">
              Order Summary
            </h4>
            <div className="divide-y divide-[#111827]/5 space-y-2 pt-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs pt-1.5">
                  <span className="font-semibold text-[#111827]">
                    {item.productName} <span className="text-[#111827]/60 font-normal">x {item.quantity}</span>
                  </span>
                  <span className="font-bold text-[#111827]">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#111827]/10 flex justify-between items-center text-sm font-extrabold text-[#111827]">
              <span>Total Pre-Order Amount:</span>
              <span className="text-[#E53935]">₹{order.totalAmount}</span>
            </div>

            {/* Shipping Address Brief */}
            <div className="pt-3 border-t border-[#111827]/10 text-xs text-[#111827]/80 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#111827]">
                <MapPin className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Delivery Address:</span>
              </div>
              <p className="pl-5 text-[#111827]/70 leading-snug">
                {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              </p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-[#FAF8F5] p-5 border-t border-[#111827]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          {onViewInAdmin && (
            <button
              onClick={() => {
                onClose();
                onViewInAdmin();
              }}
              className="text-xs font-semibold text-[#111827]/80 hover:text-[#111827] underline"
            >
              View in Admin Dashboard →
            </button>
          )}

          <button
            id="close-confirmation-btn"
            onClick={onClose}
            className="w-full sm:w-auto ml-auto flex items-center justify-center gap-2 bg-[#111827] hover:bg-[#111827]/90 text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm"
          >
            <span>Back to Milawat Proof Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
