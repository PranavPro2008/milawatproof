import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Printer, CheckCircle2, Truck, Package, Clock, AlertCircle } from 'lucide-react';
import { PreOrder, PreOrderStatus } from '../types';

interface AdminOrderDetailModalProps {
  order: PreOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: PreOrderStatus) => void;
}

export const AdminOrderDetailModal: React.FC<AdminOrderDetailModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus
}) => {
  const [selectedStatus, setSelectedStatus] = useState<PreOrderStatus>(order?.status || 'received');

  if (!isOpen || !order) return null;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as PreOrderStatus;
    setSelectedStatus(newStatus);
    onUpdateStatus(order.id, newStatus);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="admin-order-detail-modal"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#111827]/10 overflow-hidden relative"
      >
        {/* Header */}
        <div className="bg-[#FAF8F5] p-5 border-b border-[#111827]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#111827] text-white flex items-center justify-center font-bold text-xs">
              MP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#111827]">
                  Pre-Order #{order.id}
                </h2>
                <span className="text-xs bg-[#F4EFE6] text-[#111827] px-2 py-0.5 rounded font-mono font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-[#111827]/70">
                Milawat Proof Launch Pre-Order
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-[#111827]/70 hover:text-[#111827] rounded-lg hover:bg-black/5 flex items-center gap-1 text-xs font-semibold"
              title="Print Order / Slip"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#111827]/60 hover:text-[#111827] rounded-full hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Status Changer Bar */}
          <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#111827]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase text-[#111827]/60 block">
                Manage Pre-Order Status
              </span>
              <span className="text-xs font-semibold text-[#111827]">
                Current: <span className="uppercase text-[#16A34A]">{order.status}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={order.status}
                onChange={handleStatusChange}
                className="w-full sm:w-auto px-3 py-1.5 text-xs font-bold rounded-lg border border-[#111827]/20 bg-white text-[#111827] focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
              >
                <option value="received">📥 1. Pre-Order Received</option>
                <option value="confirmed">✅ 2. Batch Confirmed</option>
                <option value="processing">🧪 3. Lab Packaging / Processing</option>
                <option value="dispatched">🚚 4. Dispatched</option>
                <option value="delivered">🎉 5. Delivered</option>
                <option value="cancelled">❌ Cancelled</option>
              </select>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FAF8F5]/70 rounded-xl border border-[#111827]/10 space-y-2">
              <span className="text-[11px] font-bold uppercase text-[#111827]/60 block">
                Customer Information
              </span>
              <div className="text-xs space-y-1.5">
                <div className="font-bold text-[#111827] text-sm">
                  {order.customer.name}
                </div>
                <div className="flex items-center gap-1.5 text-[#111827]/80">
                  <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                  <a href={`tel:${order.customer.phone}`} className="hover:underline font-semibold">
                    {order.customer.phone}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-[#111827]/80">
                  <Mail className="w-3.5 h-3.5 text-[#111827]/50" />
                  <a href={`mailto:${order.customer.email}`} className="hover:underline">
                    {order.customer.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5]/70 rounded-xl border border-[#111827]/10 space-y-2">
              <span className="text-[11px] font-bold uppercase text-[#111827]/60 block">
                Shipping Destination
              </span>
              <div className="text-xs space-y-1">
                <div className="flex items-start gap-1.5 text-[#111827]">
                  <MapPin className="w-3.5 h-3.5 text-[#E53935] shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    {order.customer.address}
                  </p>
                </div>
                <p className="font-semibold text-[#111827] pl-5">
                  {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                </p>
                {order.customer.notes && (
                  <p className="text-[11px] text-[#111827]/70 italic pl-5 pt-1 border-t border-[#111827]/5">
                    Note: &ldquo;{order.customer.notes}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Ordered Products Table */}
          <div>
            <span className="text-[11px] font-bold uppercase text-[#111827]/60 block mb-2">
              Testing Kits Ordered
            </span>
            <div className="border border-[#111827]/10 rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8F5] text-[#111827]/70 font-semibold border-b border-[#111827]/10">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3 text-center">Category</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#111827]/5">
                  {order.items.map((item, i) => (
                    <tr key={i} className="hover:bg-[#FAF8F5]/50">
                      <td className="p-3 font-bold text-[#111827]">
                        {item.productName}
                      </td>
                      <td className="p-3 text-center uppercase text-[10px] font-bold text-[#111827]/60">
                        {item.category}
                      </td>
                      <td className="p-3 text-center font-bold">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-right text-[#111827]/70">
                        ₹{item.price}
                      </td>
                      <td className="p-3 text-right font-extrabold text-[#111827]">
                        ₹{item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-[#FAF8F5] border-t border-[#111827]/10 font-bold">
                  <tr>
                    <td colSpan={4} className="p-3 text-right text-xs">
                      Grand Total (Pre-Order):
                    </td>
                    <td className="p-3 text-right text-sm font-extrabold text-[#E53935]">
                      ₹{order.totalAmount}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment & Batch info */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-[#FAF8F5] p-3 rounded-lg border border-[#111827]/5 text-[#111827]/80">
            <div>
              <span className="font-semibold">Payment Mode: </span>
              <span className="font-bold uppercase text-[#16A34A]">
                {order.paymentPreference === 'pay_on_delivery' ? 'Cash/UPI on Delivery' : 'Online Payment Link on Dispatch'}
              </span>
            </div>
            <div>
              <span className="font-semibold">Batch: </span>
              <span className="font-medium text-[#111827]">{order.batchDeliveryEstimate}</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#FAF8F5] p-4 border-t border-[#111827]/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#111827] hover:bg-[#111827]/90 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
