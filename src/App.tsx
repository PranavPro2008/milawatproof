import React, { useState, useEffect } from 'react';
import { Product, PreOrder, CartItem, PreOrderStatus } from './types';
import { 
  getStoredProducts, 
  saveStoredProducts, 
  getStoredPreOrders, 
  saveStoredPreOrders, 
  resetToSeedData,
  fetchFirestoreProducts,
  fetchFirestorePreOrders,
  savePreOrderToFirestore,
  saveProductToFirestore
} from './utils/storage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { CustomerStore } from './components/CustomerStore';
import { AdminPortal } from './components/AdminPortal';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PreOrderCheckoutModal } from './components/PreOrderCheckoutModal';
import { PreOrderConfirmationModal } from './components/PreOrderConfirmationModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { BrandLogo } from './components/BrandLogo';
import { ShieldCheck, Heart, Sparkles, Check, Cloud } from 'lucide-react';
import { db, collection, onSnapshot } from './lib/firebase';

function MainApp() {
  const [currentView, setCurrentView] = useState<'customer' | 'admin'>('customer');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<PreOrder[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Modals state
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<PreOrder | null>(null);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Initial load from Firestore (with immediate local cache fallback)
  useEffect(() => {
    // Immediate cached state to ensure zero lag
    const localProds = getStoredProducts();
    const localOrders = getStoredPreOrders();
    setProducts(localProds);
    setOrders(localOrders);

    // Sync from Firestore
    fetchFirestoreProducts().then((p) => {
      if (p && p.length > 0) setProducts(p);
    });

    fetchFirestorePreOrders().then((o) => {
      if (o && o.length > 0) setOrders(o);
    });

    // Realtime listeners
    try {
      const unsubOrders = onSnapshot(collection(db, 'preorders'), (snap) => {
        if (!snap.empty) {
          const list: PreOrder[] = [];
          snap.forEach(d => list.push(d.data() as PreOrder));
          list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setOrders(list);
          saveStoredPreOrders(list);
        }
      }, (err) => console.warn('Orders listener err:', err));

      const unsubProds = onSnapshot(collection(db, 'products'), (snap) => {
        if (!snap.empty) {
          const list: Product[] = [];
          snap.forEach(d => list.push(d.data() as Product));
          setProducts(list);
          saveStoredProducts(list);
        }
      }, (err) => console.warn('Products listener err:', err));

      return () => {
        unsubOrders();
        unsubProds();
      };
    } catch (err) {
      console.warn('Realtime listeners initialization:', err);
    }
  }, []);

  // Sync products
  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    saveStoredProducts(newProducts);
  };

  // Sync orders
  const updateOrders = (newOrders: PreOrder[]) => {
    setOrders(newOrders);
    saveStoredPreOrders(newOrders);
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to pre-order cart!`);
  };

  const handleQuickPreOrder = (product: Product) => {
    // If not in cart, add it, then immediately open checkout
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev;
      return [...prev, { product, quantity: 1 }];
    });
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Pre-Order placement (Saved to Cloud Firestore + Local Cache)
  const handleCompletePreOrder = async (newOrder: PreOrder) => {
    const updated = [newOrder, ...orders];
    updateOrders(updated);
    await savePreOrderToFirestore(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    setConfirmedOrder(newOrder);
    showToast(`Pre-order #${newOrder.id} saved to cloud database!`);
  };

  // Admin Actions
  const handleSaveProduct = async (product: Product) => {
    const exists = products.some(p => p.id === product.id);
    let updated: Product[];
    if (exists) {
      updated = products.map(p => p.id === product.id ? product : p);
      showToast(`Updated "${product.name}" in database`);
    } else {
      updated = [product, ...products];
      showToast(`Added "${product.name}" to database`);
    }
    updateProducts(updated);
    await saveProductToFirestore(product);
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    updateProducts(updated);
    showToast('Product removed from catalog');
  };

  const handleToggleProductActive = async (productId: string) => {
    const target = products.find(p => p.id === productId);
    if (!target) return;
    const updatedProduct = { ...target, active: !target.active };
    const updated = products.map(p => p.id === productId ? updatedProduct : p);
    updateProducts(updated);
    await saveProductToFirestore(updatedProduct);
  };

  const handleUpdateOrderStatus = async (orderId: string, status: PreOrderStatus) => {
    const target = orders.find(o => o.id === orderId);
    if (!target) return;
    const updatedOrder: PreOrder = { ...target, status };
    const updated = orders.map(o => o.id === orderId ? updatedOrder : o);
    updateOrders(updated);
    await savePreOrderToFirestore(updatedOrder);
    showToast(`Updated order #${orderId} status to "${status}"`);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all products and pre-orders to default sample data?')) {
      const { products: p, orders: o } = resetToSeedData();
      setProducts(p);
      setOrders(o);
      setCart([]);
      showToast('Database reset to initial sample data.');
    }
  };

  const handleGenerateTestOrder = async () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)] || products[0];
    const testNames = ['Kavita Singhal', 'Vikram Patel', 'Siddharth Roy', 'Pooja Iyer', 'Amitabh Sengupta'];
    const testCities = ['New Delhi', 'Mumbai', 'Bengaluru', 'Chandigarh', 'Jaipur', 'Hyderabad'];
    const randomName = testNames[Math.floor(Math.random() * testNames.length)];
    const randomCity = testCities[Math.floor(Math.random() * testCities.length)];
    const newId = `MP-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: PreOrder = {
      id: newId,
      createdAt: new Date().toISOString(),
      customer: {
        name: randomName,
        phone: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
        email: `${randomName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
        address: `Plot ${Math.floor(10 + Math.random() * 90)}, Block C, Green Park`,
        city: randomCity,
        state: 'India',
        pincode: `${Math.floor(110000 + Math.random() * 800000)}`,
        notes: 'Pre-ordered for morning dairy verification.'
      },
      items: [
        {
          productId: randomProduct.id,
          productName: randomProduct.name,
          price: randomProduct.price,
          quantity: 1,
          category: randomProduct.category
        }
      ],
      totalAmount: randomProduct.price,
      status: 'received',
      paymentPreference: 'pay_on_delivery',
      batchDeliveryEstimate: 'Dispatches in Batch #1'
    };

    updateOrders([newOrder, ...orders]);
    await savePreOrderToFirestore(newOrder);
    showToast(`Generated simulated pre-order #${newId}`);
  };

  const pendingOrdersCount = orders.filter(
    o => o.status === 'received' || o.status === 'processing'
  ).length;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#111827] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#E53935] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-150 border border-white/10">
          <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center text-white">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header / Navigation */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        pendingOrdersCount={pendingOrdersCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'customer' ? (
          <CustomerStore
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
            onQuickPreOrder={handleQuickPreOrder}
            onViewDetails={p => setDetailProduct(p)}
            onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
          />
        ) : (
          <AdminPortal
            products={products}
            orders={orders}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
            onToggleProductActive={handleToggleProductActive}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onResetData={handleResetData}
            onGenerateTestOrder={handleGenerateTestOrder}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#111827] text-[#FBF9F5] border-t border-[#111827]/20 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-white/10 pb-8">
            <div className="space-y-3">
              <div 
                onClick={() => setCurrentView('customer')}
                className="cursor-pointer inline-block"
              >
                <BrandLogo variant="navbar" theme="dark" showTagline={true} />
              </div>
              <p className="text-xs text-white/70 leading-relaxed max-w-sm">
                Empowering every Indian household with quick 1-minute home tests for milk, paneer, and desi ghee purity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-white/80 md:justify-center">
              <button 
                onClick={() => setCurrentView('customer')}
                className="hover:text-white transition-colors"
              >
                Browse Kits
              </button>
              <span className="hidden sm:inline text-white/30">•</span>
              <button 
                onClick={() => setIsOrderLookupOpen(true)}
                className="hover:text-white transition-colors"
              >
                Track Pre-order
              </button>
              <span className="hidden sm:inline text-white/30">•</span>
              <button 
                onClick={() => setCurrentView('admin')}
                className="hover:text-[#E53935] font-semibold transition-colors"
              >
                Admin Portal
              </button>
            </div>

            <div className="text-xs text-white/70 md:text-right space-y-1">
              <div className="font-semibold text-white">Launch Batch #1 Pre-Order Live</div>
              <p className="text-[11px] text-white/50">
                100% Non-Hazardous Testing Reagents • Formulated for Kitchen Safety
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-2">
            <p>© 2026 Milawat Proof. Simple Home Food Adulteration Testing.</p>
            <p className="flex items-center gap-1">
              <span>Pure Dairy for Healthy Families</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
        onClearCart={handleClearCart}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        isOpen={!!detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onQuickPreOrder={handleQuickPreOrder}
        isItemInCart={detailProduct ? cart.some(i => i.product.id === detailProduct.id) : false}
      />

      {/* Checkout Modal */}
      <PreOrderCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onCompletePreOrder={handleCompletePreOrder}
      />

      {/* Confirmation Modal */}
      <PreOrderConfirmationModal
        order={confirmedOrder}
        isOpen={!!confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onViewInAdmin={() => {
          setConfirmedOrder(null);
          setCurrentView('admin');
        }}
      />

      {/* Order Tracking Modal */}
      <OrderLookupModal
        isOpen={isOrderLookupOpen}
        onClose={() => setIsOrderLookupOpen(false)}
        orders={orders}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
