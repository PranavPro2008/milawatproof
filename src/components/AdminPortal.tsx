import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Package, 
  IndianRupee, 
  CheckCircle2, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  RefreshCw, 
  Eye, 
  Phone, 
  MapPin, 
  Clock, 
  Truck, 
  AlertCircle,
  Sparkles,
  Layers,
  Filter
} from 'lucide-react';
import { Product, PreOrder, PreOrderStatus, ProductCategory } from '../types';
import { AdminProductModal } from './AdminProductModal';
import { AdminOrderDetailModal } from './AdminOrderDetailModal';
import { BrandLogo } from './BrandLogo';

interface AdminPortalProps {
  products: Product[];
  orders: PreOrder[];
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onToggleProductActive: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: PreOrderStatus) => void;
  onResetData: () => void;
  onGenerateTestOrder: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  products,
  orders,
  onSaveProduct,
  onDeleteProduct,
  onToggleProductActive,
  onUpdateOrderStatus,
  onResetData,
  onGenerateTestOrder
}) => {
  const [activeTab, setActiveTab] = useState<'preorders' | 'products' | 'system'>('preorders');
  
  // Pre-orders state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PreOrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<PreOrder | null>(null);

  // Products state
  const [productCategoryFilter, setProductCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => o.status !== 'cancelled' ? sum + o.totalAmount : sum, 0);
  const totalKitsBooked = orders.reduce((sum, o) => {
    if (o.status === 'cancelled') return sum;
    return sum + o.items.reduce((s, i) => s + i.quantity, 0);
  }, 0);
  const pendingOrders = orders.filter(o => o.status === 'received' || o.status === 'processing').length;

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customer.name.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.toLowerCase().includes(q);
      const matchCity = o.customer.city.toLowerCase().includes(q);
      return matchId || matchName || matchPhone || matchCity;
    }
    return true;
  });

  // Filtered Products
  const filteredProducts = products.filter(p => {
    if (productCategoryFilter === 'all') return true;
    return p.category === productCategoryFilter;
  });

  const getStatusBadge = (status: PreOrderStatus) => {
    switch (status) {
      case 'received':
        return { label: 'Received', bg: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'confirmed':
        return { label: 'Confirmed', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'processing':
        return { label: 'Lab Processing', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'dispatched':
        return { label: 'Dispatched', bg: 'bg-purple-50 text-purple-800 border-purple-200' };
      case 'delivered':
        return { label: 'Delivered', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'cancelled':
        return { label: 'Cancelled', bg: 'bg-red-50 text-red-800 border-red-200' };
      default:
        return { label: status, bg: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const handleExportCSV = () => {
    if (orders.length === 0) return;

    const headers = [
      'PreOrder ID',
      'Created At',
      'Status',
      'Customer Name',
      'Phone',
      'Email',
      'Delivery Address',
      'City',
      'State',
      'Pincode',
      'Items Ordered',
      'Total Amount (INR)',
      'Payment Preference',
      'Customer Notes'
    ];

    const rows = orders.map(o => [
      `"${o.id}"`,
      `"${new Date(o.createdAt).toLocaleString()}"`,
      `"${o.status}"`,
      `"${o.customer.name.replace(/"/g, '""')}"`,
      `"${o.customer.phone}"`,
      `"${o.customer.email}"`,
      `"${o.customer.address.replace(/"/g, '""')}"`,
      `"${o.customer.city}"`,
      `"${o.customer.state}"`,
      `"${o.customer.pincode}"`,
      `"${o.items.map(i => `${i.productName} (Qty: ${i.quantity})`).join('; ').replace(/"/g, '""')}"`,
      o.totalAmount,
      `"${o.paymentPreference}"`,
      `"${(o.customer.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `milawat_proof_preorders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Admin Header & Stats */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BrandLogo variant="compact" showTagline={false} />
              <span className="text-[#111827]/30">•</span>
              <span className="bg-[#111827] text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                Admin Command Center
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#16A34A] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Live Sync
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
              Pre-Order & Inventory Management
            </h1>
            <p className="text-xs text-[#111827]/70">
              Manage incoming home testing kit pre-orders, batch delivery logistics, and product catalog.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              id="admin-export-csv-btn"
              onClick={handleExportCSV}
              className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#111827] bg-white hover:bg-[#F4EFE6] border border-[#111827]/10 rounded-lg transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              id="admin-add-product-btn"
              onClick={() => {
                setEditingProduct(null);
                setProductModalOpen(true);
              }}
              className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#E53935] hover:bg-[#C62828] rounded-lg transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Kit SKU</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#111827]/10 shadow-2xs">
            <div className="flex items-center justify-between text-[#111827]/60 mb-1">
              <span className="text-[11px] sm:text-xs font-semibold">Total Pre-Orders</span>
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#111827]" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#111827]">
              {totalOrders}
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#16A34A] font-bold">
              Launch Batch #1
            </span>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#111827]/10 shadow-2xs">
            <div className="flex items-center justify-between text-[#111827]/60 mb-1">
              <span className="text-[11px] sm:text-xs font-semibold">Pre-Order Value</span>
              <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16A34A]" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#111827]">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#111827]/60">
              Pipeline gross bookings
            </span>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#111827]/10 shadow-2xs">
            <div className="flex items-center justify-between text-[#111827]/60 mb-1">
              <span className="text-[11px] sm:text-xs font-semibold">Testing Units Booked</span>
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E53935]" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#111827]">
              {totalKitsBooked} Kits
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#E53935] font-bold">
              {pendingOrders} Pending fulfillment
            </span>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#111827]/10 shadow-2xs">
            <div className="flex items-center justify-between text-[#111827]/60 mb-1">
              <span className="text-[11px] sm:text-xs font-semibold">Live Product Kits</span>
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#111827]" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#111827]">
              {products.filter(p => p.active).length} Active
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#111827]/60">
              {products.length} Total SKUs
            </span>
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="border-b border-[#111827]/10 flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1">
        <button
          id="admin-tab-preorders"
          onClick={() => setActiveTab('preorders')}
          className={`pb-2.5 sm:pb-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'preorders'
              ? 'border-[#E53935] text-[#E53935]'
              : 'border-transparent text-[#111827]/60 hover:text-[#111827]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Pre-Orders ({orders.length})</span>
        </button>

        <button
          id="admin-tab-products"
          onClick={() => setActiveTab('products')}
          className={`pb-2.5 sm:pb-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'products'
              ? 'border-[#E53935] text-[#E53935]'
              : 'border-transparent text-[#111827]/60 hover:text-[#111827]'
          }`}
        >
          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Testing Kits Catalog ({products.length})</span>
        </button>

        <button
          id="admin-tab-system"
          onClick={() => setActiveTab('system')}
          className={`pb-2.5 sm:pb-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'system'
              ? 'border-[#E53935] text-[#E53935]'
              : 'border-transparent text-[#111827]/60 hover:text-[#111827]'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Demo Controls</span>
        </button>
      </div>

      {/* Tab 1: Pre-Orders Management */}
      {activeTab === 'preorders' && (
        <div className="space-y-4">
          
          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-[#111827]/10 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#111827]/40 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by customer, phone, ID, city..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#111827]/20 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold text-[#111827]/60 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Status:
              </span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as PreOrderStatus | 'all')}
                className="px-3 py-2 text-xs font-bold rounded-lg border border-[#111827]/20 bg-white text-[#111827] focus:outline-hidden focus:ring-2 focus:ring-[#111827]"
              >
                <option value="all">All Statuses ({orders.length})</option>
                <option value="received">Received</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Lab Processing</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl border border-[#111827]/10 overflow-hidden shadow-2xs">
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center text-[#111827]/60">
                <ShoppingBag className="w-10 h-10 mx-auto text-[#111827]/30 mb-2" />
                <h3 className="font-bold text-base text-[#111827]">No pre-orders found</h3>
                <p className="text-xs mt-1">Try changing your search query or status filter.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF8F5] text-[#111827]/70 font-semibold border-b border-[#111827]/10">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer & Phone</th>
                      <th className="p-3.5">Delivery Destination</th>
                      <th className="p-3.5">Kits Ordered</th>
                      <th className="p-3.5">Total Amount</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#111827]/5">
                    {filteredOrders.map(order => {
                      const badge = getStatusBadge(order.status);
                      const totalQty = order.items.reduce((s, i) => s + i.quantity, 0);

                      return (
                        <tr key={order.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-[#111827]">
                            {order.id}
                            <span className="block text-[10px] text-[#111827]/50 font-normal font-sans">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <div className="font-bold text-[#111827]">{order.customer.name}</div>
                            <div className="text-[11px] text-[#111827]/70 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-[#16A34A]" />
                              <span>{order.customer.phone}</span>
                            </div>
                          </td>

                          <td className="p-3.5 max-w-xs truncate">
                            <span className="font-semibold text-[#111827] block">
                              {order.customer.city}, {order.customer.pincode}
                            </span>
                            <span className="text-[11px] text-[#111827]/60 truncate block">
                              {order.customer.address}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <span className="font-bold text-[#111827]">
                              {totalQty} {totalQty === 1 ? 'kit' : 'kits'}
                            </span>
                            <span className="block text-[10px] text-[#111827]/60 truncate max-w-xs">
                              {order.items.map(i => i.productName).join(', ')}
                            </span>
                          </td>

                          <td className="p-3.5 font-extrabold text-[#E53935] text-sm">
                            ₹{order.totalAmount}
                          </td>

                          <td className="p-3.5">
                            <select
                              value={order.status}
                              onChange={e => onUpdateOrderStatus(order.id, e.target.value as PreOrderStatus)}
                              className={`text-[11px] font-bold px-2 py-1 rounded-md border cursor-pointer ${badge.bg}`}
                            >
                              <option value="received">Received</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#111827] rounded-lg border border-[#111827]/10 font-semibold text-xs transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Slip</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Products Management */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          
          <div className="bg-white p-4 rounded-xl border border-[#111827]/10 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
              <span className="text-[#111827]/60 mr-1">Category Filter:</span>
              {(['all', 'milk', 'paneer', 'ghee', 'combo'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setProductCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                    productCategoryFilter === cat
                      ? 'bg-[#111827] text-white font-bold'
                      : 'bg-[#FAF8F5] text-[#111827]/70 hover:bg-[#F4EFE6]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setProductModalOpen(true);
              }}
              className="flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-white bg-[#E53935] hover:bg-[#C62828] rounded-lg transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Kit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(prod => (
              <div 
                key={prod.id}
                className="bg-white p-5 rounded-xl border border-[#111827]/10 flex flex-col justify-between shadow-2xs space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F4EFE6] px-2 py-0.5 rounded text-[#111827]">
                      {prod.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      prod.active ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {prod.active ? 'Active on Store' : 'Draft / Hidden'}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#111827] mt-2">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#111827]/70 mt-1 line-clamp-2">
                    {prod.shortDesc}
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#111827]/5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#111827] text-base">₹{prod.price}</span>
                      <span className="text-[#111827]/50 line-through ml-1.5">₹{prod.originalPrice}</span>
                    </div>
                    <span className="text-[11px] text-[#16A34A] font-semibold">
                      {prod.testsCount} Tests • {prod.testDurationSeconds}s
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#111827]/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onToggleProductActive(prod.id)}
                    className="text-xs font-semibold text-[#111827]/70 hover:text-[#111827] underline"
                  >
                    {prod.active ? 'Unpublish' : 'Publish'}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingProduct(prod);
                        setProductModalOpen(true);
                      }}
                      className="p-1.5 text-[#111827] hover:bg-[#F4EFE6] rounded-lg border border-[#111827]/10"
                      title="Edit Kit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(prod.id)}
                      className="p-1.5 text-[#E53935] hover:bg-red-50 rounded-lg border border-red-200"
                      title="Delete Kit"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Tab 3: System & Demo Controls */}
      {activeTab === 'system' && (
        <div className="bg-white p-6 rounded-2xl border border-[#111827]/10 shadow-2xs space-y-6 max-w-2xl">
          <div>
            <h3 className="text-base font-bold text-[#111827]">
              Demo Tools & Data State
            </h3>
            <p className="text-xs text-[#111827]/70 mt-1">
              Convenient testing actions for validating pre-order workflows and simulating incoming customer pre-orders.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#111827]/10 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-xs text-[#111827]">
                  Simulate New Customer Pre-Order
                </h4>
                <p className="text-[11px] text-[#111827]/70 mt-0.5">
                  Generates an authentic customer booking with dairy adulteration testing kits.
                </p>
              </div>
              <button
                onClick={onGenerateTestOrder}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-lg shadow-2xs shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Add Test Pre-Order</span>
              </button>
            </div>

            <div className="p-4 bg-red-50/60 rounded-xl border border-red-200 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-xs text-red-950">
                  Reset Everything to Initial Seed Data
                </h4>
                <p className="text-[11px] text-red-900/70 mt-0.5">
                  Restores default Milawat Proof kits and sample pre-orders.
                </p>
              </div>
              <button
                onClick={onResetData}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#E53935] hover:bg-[#C62828] text-white text-xs font-bold rounded-lg shadow-2xs shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Database</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Edit / Create Modal */}
      <AdminProductModal
        isOpen={productModalOpen}
        onClose={() => {
          setProductModalOpen(false);
          setEditingProduct(null);
        }}
        productToEdit={editingProduct}
        onSaveProduct={onSaveProduct}
      />

      {/* Order Detail Modal */}
      <AdminOrderDetailModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onUpdateStatus={onUpdateOrderStatus}
      />

    </div>
  );
};
