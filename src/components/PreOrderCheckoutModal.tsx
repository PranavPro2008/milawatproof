import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, MapPin, User, Phone, Mail, FileText, Sparkles, Truck, LogIn } from 'lucide-react';
import { CartItem, CustomerInfo, PreOrder } from '../types';
import { useAuth } from '../context/AuthContext';

interface PreOrderCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onCompletePreOrder: (order: PreOrder) => void;
}

export const PreOrderCheckoutModal: React.FC<PreOrderCheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onCompletePreOrder
}) => {
  const { currentUser, signIn } = useAuth();
  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Delhi NCR',
    pincode: '',
    notes: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || currentUser.displayName || '',
        email: prev.email || currentUser.email || ''
      }));
    }
  }, [currentUser]);

  const [paymentPreference, setPaymentPreference] = useState<'pay_on_delivery' | 'online_link_on_dispatch'>('pay_on_delivery');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || cart.length === 0) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required for receipt & tracking';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Must be a 6-digit pin code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate swift confirmation
    setTimeout(() => {
      const generatedId = `MP-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder: PreOrder = {
        id: generatedId,
        createdAt: new Date().toISOString(),
        customer: { ...formData },
        items: cart.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          category: item.product.category
        })),
        totalAmount: subtotal,
        status: 'received',
        paymentPreference,
        batchDeliveryEstimate: 'Dispatches in Batch #1 (by Sept 12, 2026)'
      };

      onCompletePreOrder(newOrder);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="preorder-checkout-modal"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#111827]/10 overflow-hidden relative"
      >
        {/* Header */}
        <div className="bg-[#FAF8F5] p-4 sm:p-5 border-b border-[#111827]/10 flex items-start sm:items-center justify-between gap-2">
          <div className="flex items-start sm:items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#16A34A] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-[#111827] leading-snug">
                Complete Food Safety Pre-Order
              </h2>
              <p className="text-[11px] sm:text-xs text-[#111827]/70 truncate">
                Milawat Proof Launch Batch • Zero Upfront Advance
              </p>
            </div>
          </div>

          <button
            id="close-checkout-modal-btn"
            onClick={onClose}
            className="p-1 text-[#111827]/60 hover:text-[#111827] rounded-full hover:bg-black/5 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form & Summary */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Order Summary Strip */}
          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#111827]/10">
            <span className="text-[11px] font-bold uppercase text-[#111827]/60 tracking-wider block mb-2">
              Pre-Order Items ({cart.reduce((s, i) => s + i.quantity, 0)} kits):
            </span>
            <div className="space-y-1.5">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#111827]">
                    {item.product.name} <span className="text-[#111827]/60 font-normal">x {item.quantity}</span>
                  </span>
                  <span className="font-bold text-[#111827]">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2.5 pt-2 border-t border-[#111827]/10 flex items-center justify-between text-sm font-extrabold text-[#111827]">
              <span>Total Pre-Order Payable:</span>
              <span className="text-[#E53935] text-base">₹{subtotal}</span>
            </div>
          </div>

          {/* Section 1: Customer Contact Info */}
          <div>
            <h3 className="text-xs font-bold uppercase text-[#111827] tracking-wider mb-3 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#E53935]" />
              1. Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Full Name *
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  placeholder="e.g. Dr. Priya Sharma"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827] ${
                    errors.name ? 'border-[#E53935]' : 'border-[#111827]/20'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-[#E53935] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Phone Number (for dispatch SMS) *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#111827]/40 absolute left-3 top-2.5" />
                  <input
                    id="checkout-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-8 pr-3 py-2 text-xs rounded-lg border bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827] ${
                      errors.phone ? 'border-[#E53935]' : 'border-[#111827]/20'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-[#E53935] mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Email Address (for test instructions & tracking) *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#111827]/40 absolute left-3 top-2.5" />
                  <input
                    id="checkout-email"
                    type="email"
                    placeholder="priya@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-8 pr-3 py-2 text-xs rounded-lg border bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827] ${
                      errors.email ? 'border-[#E53935]' : 'border-[#111827]/20'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-[#E53935] mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div>
            <h3 className="text-xs font-bold uppercase text-[#111827] tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#16A34A]" />
              2. Shipping & Delivery Address
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  House / Flat / Street Address *
                </label>
                <textarea
                  id="checkout-address"
                  rows={2}
                  placeholder="e.g. Flat 301, Tower B, Lotus Greens, Sector 78"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827] ${
                    errors.address ? 'border-[#E53935]' : 'border-[#111827]/20'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-[#E53935] mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    City *
                  </label>
                  <input
                    id="checkout-city"
                    type="text"
                    placeholder="e.g. Bengaluru / Noida"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827] ${
                      errors.city ? 'border-[#E53935]' : 'border-[#111827]/20'
                    }`}
                  />
                  {errors.city && <p className="text-[11px] text-[#E53935] mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    State *
                  </label>
                  <select
                    id="checkout-state"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827]"
                  >
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Other State">Other State</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Pincode (6-digit) *
                  </label>
                  <input
                    id="checkout-pincode"
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 560001"
                    value={formData.pincode}
                    onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827] ${
                      errors.pincode ? 'border-[#E53935]' : 'border-[#111827]/20'
                    }`}
                  />
                  {errors.pincode && <p className="text-[11px] text-[#E53935] mt-1">{errors.pincode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Optional Delivery Note / Specific Milk Brand Being Tested
                </label>
                <input
                  id="checkout-notes"
                  type="text"
                  placeholder="e.g. Testing local dairy milk delivery, please call before delivery"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#111827]/20 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Preference */}
          <div>
            <h3 className="text-xs font-bold uppercase text-[#111827] tracking-wider mb-2.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#111827]" />
              3. Payment Preference at Dispatch
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label 
                className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                  paymentPreference === 'pay_on_delivery'
                    ? 'border-[#16A34A] bg-[#16A34A]/5 shadow-xs'
                    : 'border-[#111827]/10 bg-white hover:bg-[#FAF8F5]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentPreference"
                  checked={paymentPreference === 'pay_on_delivery'}
                  onChange={() => setPaymentPreference('pay_on_delivery')}
                  className="mt-0.5 text-[#16A34A] focus:ring-[#16A34A]"
                />
                <div>
                  <span className="text-xs font-bold text-[#111827] block">
                    Cash / UPI on Home Delivery
                  </span>
                  <span className="text-[11px] text-[#111827]/70">
                    Pay only when the Milawat Proof kit reaches your doorstep.
                  </span>
                </div>
              </label>

              <label 
                className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                  paymentPreference === 'online_link_on_dispatch'
                    ? 'border-[#16A34A] bg-[#16A34A]/5 shadow-xs'
                    : 'border-[#111827]/10 bg-white hover:bg-[#FAF8F5]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentPreference"
                  checked={paymentPreference === 'online_link_on_dispatch'}
                  onChange={() => setPaymentPreference('online_link_on_dispatch')}
                  className="mt-0.5 text-[#16A34A] focus:ring-[#16A34A]"
                />
                <div>
                  <span className="text-xs font-bold text-[#111827] block">
                    Digital Payment Link on Batch Dispatch
                  </span>
                  <span className="text-[11px] text-[#111827]/70">
                    Receive UPI/Card link via WhatsApp & Email when kit is packed.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Submission Notice & Button */}
          <div className="pt-3 border-t border-[#111827]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#16A34A] font-semibold">
              <Truck className="w-4 h-4" />
              <span>Batch #1 Priority Dispatch • Sept 12, 2026</span>
            </div>

            <button
              id="confirm-preorder-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-98 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Reserving Pre-Order...' : `Confirm Pre-Order (₹${subtotal})`}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
