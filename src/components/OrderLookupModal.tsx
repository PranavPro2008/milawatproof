import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, Package, AlertCircle } from 'lucide-react';
import { PreOrder, PreOrderStatus } from '../types';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: PreOrder[];
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrders, setFoundOrders] = useState<PreOrder[]>([]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return;

    const matched = orders.filter(
      o =>
        o.id.toLowerCase().includes(cleanQuery) ||
        o.customer.phone.toLowerCase().includes(cleanQuery) ||
        o.customer.email.toLowerCase().includes(cleanQuery) ||
        o.customer.name.toLowerCase().includes(cleanQuery)
    );

    setFoundOrders(matched);
    setSearched(true);
  };

  const getStatusBadge = (status: PreOrderStatus) => {
    switch (status) {
      case 'received':
        return { label: 'Pre-Order Received', bg: 'bg-blue-50 text-blue-800 border-blue-200', icon: Clock };
      case 'confirmed':
        return { label: 'Batch Confirmed', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: CheckCircle2 };
      case 'processing':
        return { label: 'Packaging in Lab', bg: 'bg-amber-50 text-amber-800 border-amber-200', icon: Package };
      case 'dispatched':
        return { label: 'Dispatched for Delivery', bg: 'bg-purple-50 text-purple-800 border-purple-200', icon: Truck };
      case 'delivered':
        return { label: 'Delivered', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: CheckCircle2 };
      case 'cancelled':
        return { label: 'Cancelled', bg: 'bg-red-50 text-red-800 border-red-200', icon: AlertCircle };
      default:
        return { label: status, bg: 'bg-gray-100 text-gray-800 border-gray-200', icon: Clock };
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="order-lookup-modal"
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#111827]/10 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="bg-[#FAF8F5] p-5 border-b border-[#111827]/10 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#111827]">
              Track Your Pre-Order Status
            </h2>
            <p className="text-xs text-[#111827]/70">
              Enter your Pre-order ID (e.g. MP-89421) or registered phone number
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#111827]/60 hover:text-[#111827] rounded-full hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#111827]/40 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by Order ID, Phone or Name..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[#111827]/20 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#111827] text-white text-xs font-bold rounded-xl hover:bg-[#111827]/90 transition-colors shrink-0"
            >
              Lookup
            </button>
          </form>

          {/* Search Results */}
          {searched && (
            <div className="space-y-3 pt-2">
              {foundOrders.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#111827]/60 bg-[#FAF8F5] rounded-xl border border-[#111827]/5">
                  No pre-order found matching &ldquo;{query}&rdquo;. Please verify your ID or phone number.
                </div>
              ) : (
                foundOrders.map(order => {
                  const statusInfo = getStatusBadge(order.status);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <div 
                      key={order.id}
                      className="p-4 rounded-xl border border-[#111827]/10 bg-[#FAF8F5]/60 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-[#111827]/60 block">
                            ORDER ID
                          </span>
                          <span className="text-sm font-extrabold text-[#111827]">
                            {order.id}
                          </span>
                        </div>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md border ${statusInfo.bg}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{statusInfo.label}</span>
                        </span>
                      </div>

                      <div className="text-xs text-[#111827]/80 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#111827]/60">Customer:</span>
                          <span className="font-semibold text-[#111827]">{order.customer.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#111827]/60">Dispatch Timeline:</span>
                          <span className="font-bold text-[#16A34A]">{order.batchDeliveryEstimate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#111827]/60">Items:</span>
                          <span className="font-medium text-[#111827]">
                            {order.items.map(i => `${i.productName} (${i.quantity})`).join(', ')}
                          </span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-[#111827]/5 font-bold">
                          <span>Total Pre-Order:</span>
                          <span className="text-[#E53935]">₹{order.totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
