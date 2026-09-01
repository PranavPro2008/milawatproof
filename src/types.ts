export type ProductCategory = 'milk' | 'paneer' | 'ghee' | 'combo';

export type PreOrderStatus = 'received' | 'confirmed' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';

export interface ColorReaction {
  pureColor: string;
  pureColorHex: string;
  pureColorClass: string;
  pureDescription: string;
  
  adulteratedColor: string;
  adulteratedColorHex: string;
  adulteratedColorClass: string;
  adulteratedDescription: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  tag?: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  originalPrice: number;
  testsCount: number;
  detects: string[];
  testDurationSeconds: number;
  preOrderBatch: string;
  estimatedDelivery: string;
  inStock: boolean;
  active: boolean;
  featured?: boolean;

  // Chemical solution properties
  solutionName: string;
  solutionVialType: string;
  colorReaction: ColorReaction;
  chemicalReactionDetails: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface PreOrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  category: ProductCategory;
}

export interface PreOrder {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  items: PreOrderItem[];
  totalAmount: number;
  status: PreOrderStatus;
  paymentPreference: 'pay_on_delivery' | 'online_link_on_dispatch';
  batchDeliveryEstimate: string;
}

