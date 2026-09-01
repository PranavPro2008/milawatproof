import { Product, PreOrder } from '../types';
import { INITIAL_PRODUCTS, INITIAL_PREORDERS } from '../data/seedData';
import { 
  db, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc 
} from '../lib/firebase';

const PRODUCTS_KEY = 'milawat_proof_products_v2';
const PREORDERS_KEY = 'milawat_proof_preorders_v2';

// ---------------- LOCAL STORAGE FALLBACK ----------------
export function getStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0].colorReaction) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to parse stored products', err);
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save products locally', err);
  }
}

export function getStoredPreOrders(): PreOrder[] {
  try {
    const raw = localStorage.getItem(PREORDERS_KEY);
    if (!raw) {
      localStorage.setItem(PREORDERS_KEY, JSON.stringify(INITIAL_PREORDERS));
      return INITIAL_PREORDERS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse stored preorders', err);
    return INITIAL_PREORDERS;
  }
}

export function saveStoredPreOrders(orders: PreOrder[]): void {
  try {
    localStorage.setItem(PREORDERS_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save preorders locally', err);
  }
}

export function resetToSeedData(): { products: Product[]; orders: PreOrder[] } {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(PREORDERS_KEY, JSON.stringify(INITIAL_PREORDERS));
  return { products: INITIAL_PRODUCTS, orders: INITIAL_PREORDERS };
}

// ---------------- FIRESTORE PERSISTENCE SYNC ----------------

/**
 * Fetch all products from Firestore, seed initial catalog if empty
 */
export async function fetchFirestoreProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, 'products');
    const snap = await getDocs(productsRef);
    
    if (snap.empty) {
      // Seed initial products to Firestore
      for (const prod of INITIAL_PRODUCTS) {
        await setDoc(doc(db, 'products', prod.id), prod);
      }
      saveStoredProducts(INITIAL_PRODUCTS);
      return INITIAL_PRODUCTS;
    }

    const items: Product[] = [];
    snap.forEach((d) => {
      items.push(d.data() as Product);
    });
    saveStoredProducts(items);
    return items;
  } catch (err) {
    console.warn('Firestore products fetch fallback to local cache:', err);
    return getStoredProducts();
  }
}

/**
 * Fetch all pre-orders from Firestore, seed sample pre-orders if collection is empty
 */
export async function fetchFirestorePreOrders(): Promise<PreOrder[]> {
  try {
    const ordersRef = collection(db, 'preorders');
    const snap = await getDocs(ordersRef);

    if (snap.empty) {
      // Seed initial pre-orders
      for (const order of INITIAL_PREORDERS) {
        await setDoc(doc(db, 'preorders', order.id), order);
      }
      saveStoredPreOrders(INITIAL_PREORDERS);
      return INITIAL_PREORDERS;
    }

    const orders: PreOrder[] = [];
    snap.forEach((d) => {
      orders.push(d.data() as PreOrder);
    });
    // Sort descending by date
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    saveStoredPreOrders(orders);
    return orders;
  } catch (err) {
    console.warn('Firestore pre-orders fetch fallback to local cache:', err);
    return getStoredPreOrders();
  }
}

/**
 * Save new or updated pre-order directly to Firestore and local cache
 */
export async function savePreOrderToFirestore(order: PreOrder): Promise<void> {
  // Update local cache immediately for zero-latency UI response
  const currentOrders = getStoredPreOrders();
  const index = currentOrders.findIndex(o => o.id === order.id);
  const updatedOrders = index >= 0 
    ? currentOrders.map(o => o.id === order.id ? order : o)
    : [order, ...currentOrders];
  saveStoredPreOrders(updatedOrders);

  // Sync to Firestore
  try {
    const orderDocRef = doc(db, 'preorders', order.id);
    await setDoc(orderDocRef, order, { merge: true });
  } catch (err) {
    console.error('Failed to sync preorder to Firestore:', err);
  }
}

/**
 * Save updated product catalog item to Firestore and local cache
 */
export async function saveProductToFirestore(product: Product): Promise<void> {
  const currentProducts = getStoredProducts();
  const index = currentProducts.findIndex(p => p.id === product.id);
  const updatedProducts = index >= 0 
    ? currentProducts.map(p => p.id === product.id ? product : p)
    : [...currentProducts, product];
  saveStoredProducts(updatedProducts);

  try {
    const prodDocRef = doc(db, 'products', product.id);
    await setDoc(prodDocRef, product, { merge: true });
  } catch (err) {
    console.error('Failed to sync product to Firestore:', err);
  }
}
