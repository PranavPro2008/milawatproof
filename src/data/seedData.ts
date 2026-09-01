import { Product, PreOrder } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-milk-01',
    name: 'Milk Purity Chemical Rapid Test Kit',
    category: 'milk',
    tag: 'Bestseller',
    shortDesc: '20 pre-filled solution vials. Drop in milk to detect detergent, urea, or starch in 45 seconds.',
    fullDesc: 'Detect the 5 most hazardous milk adulterants at home. Put 2ml of milk directly into the solution vial, gently swirl, and check the liquid color reaction in 45 seconds.',
    price: 399,
    originalPrice: 599,
    testsCount: 20,
    detects: ['Detergent & Soap', 'Fertilizer Urea', 'Starch Powder', 'Hydrogen Peroxide', 'Caustic Soda'],
    testDurationSeconds: 45,
    preOrderBatch: 'Batch #1 - Launch Edition',
    estimatedDelivery: 'Dispatches by Sept 12, 2026',
    inStock: true,
    active: true,
    featured: true,
    solutionName: 'Chromogenic Surfactant Solution',
    solutionVialType: '20x Calibrated 10ml Ready-to-Use Solution Vials + Pipette',
    colorReaction: {
      pureColor: 'Pale Green / Clear',
      pureColorHex: '#10B981',
      pureColorClass: 'bg-emerald-500 text-white',
      pureDescription: 'Solution stays natural pale green or clear cream. Zero adulterants detected.',
      adulteratedColor: 'Crimson Red',
      adulteratedColorHex: '#EF4444',
      adulteratedColorClass: 'bg-red-600 text-white',
      adulteratedDescription: 'Solution turns vivid crimson red if detergent, soap, or urea is present.'
    },
    chemicalReactionDetails: 'Proprietary chromo-indicator solution reacts with surfactants and urea to turn bright crimson in under 45 seconds.'
  },
  {
    id: 'prod-paneer-02',
    name: 'Paneer & Khoya Chemical Test Kit',
    category: 'paneer',
    tag: 'High Accuracy',
    shortDesc: '15 solution tubes. Drop in crushed paneer or khoya to expose synthetic curd, starch, or bleach.',
    fullDesc: 'Ensure festive paneer, khoya, and sweets are 100% genuine dairy. Starch fillers and synthetic coagulants trigger an immediate color change in 60 seconds.',
    price: 449,
    originalPrice: 699,
    testsCount: 15,
    detects: ['Synthetic Analog Curd', 'Industrial Starch & Maida', 'Chemical Bleach', 'Formalin'],
    testDurationSeconds: 60,
    preOrderBatch: 'Batch #1 - Launch Edition',
    estimatedDelivery: 'Dispatches by Sept 12, 2026',
    inStock: true,
    active: true,
    featured: true,
    solutionName: 'Iodo-Chromo Paneer Solution',
    solutionVialType: '15x Pre-filled Solution Tubes + Crushing Spatula',
    colorReaction: {
      pureColor: 'Golden Amber',
      pureColorHex: '#F59E0B',
      pureColorClass: 'bg-amber-500 text-white',
      pureDescription: 'Solution remains golden amber. Confirms 100% genuine milk curd proteins.',
      adulteratedColor: 'Indigo Blue',
      adulteratedColorHex: '#4F46E5',
      adulteratedColorClass: 'bg-indigo-600 text-white',
      adulteratedDescription: 'Solution turns dark indigo blue if starch binders or synthetic curd are present.'
    },
    chemicalReactionDetails: 'Binds with starch matrices and chemical texturizers to trigger a color shift into deep indigo blue within 60 seconds.'
  },
  {
    id: 'prod-ghee-03',
    name: 'Desi Ghee Chemical Reaction Test Kit',
    category: 'ghee',
    tag: 'Essential Kit',
    shortDesc: '12 solution vials. Add melted ghee to detect vanaspati, palm oil, or animal fat in 90 seconds.',
    fullDesc: 'Expose vanaspati (hydrogenated veg fat) and palm oil in pure desi ghee. Add 1ml of melted ghee to the solution tube and observe if the bottom layer turns red.',
    price: 499,
    originalPrice: 799,
    testsCount: 12,
    detects: ['Vanaspati (Hydrogenated Fat)', 'Refined Palm Stearin', 'Starch Fat Analogs', 'Synthetic Wax'],
    testDurationSeconds: 90,
    preOrderBatch: 'Batch #1 - Launch Edition',
    estimatedDelivery: 'Dispatches by Sept 12, 2026',
    inStock: true,
    active: true,
    featured: true,
    solutionName: 'Baudouin Acid-Furfural Solution',
    solutionVialType: '12x Safety Vials with Pre-dosed Reagent + Dropper',
    colorReaction: {
      pureColor: 'Clear Gold (No Red Layer)',
      pureColorHex: '#EAB308',
      pureColorClass: 'bg-yellow-500 text-white',
      pureDescription: 'Solution remains clear underneath the golden ghee layer. Confirms pure desi ghee.',
      adulteratedColor: 'Raspberry Red Layer',
      adulteratedColorHex: '#DC2626',
      adulteratedColorClass: 'bg-red-600 text-white',
      adulteratedDescription: 'Bottom solution layer turns intense crimson red, exposing hidden vanaspati.'
    },
    chemicalReactionDetails: 'Classic Baudouin reaction. Furfural in acid reacts specifically with sesamolin in vanaspati, turning the bottom layer crimson red.'
  },
  {
    id: 'prod-combo-04',
    name: 'Complete Kitchen Guard Master Pack (3-in-1)',
    category: 'combo',
    tag: 'Best Value • 3-in-1',
    shortDesc: 'Full 47-vial suite covering Milk, Paneer, and Desi Ghee purity in one organized kitchen box.',
    fullDesc: 'Protect your family across daily milk, cooking ghee, and paneer. Includes 20 Milk Vials, 15 Paneer Vials, 12 Desi Ghee Vials, and a Color Chart.',
    price: 999,
    originalPrice: 1699,
    testsCount: 47,
    detects: ['All 12+ Dangerous Adulterants across Milk, Paneer, Khoya, Butter, and Desi Ghee'],
    testDurationSeconds: 45,
    preOrderBatch: 'Batch #1 - Priority Dispatch',
    estimatedDelivery: 'Dispatches by Sept 10, 2026',
    inStock: true,
    active: true,
    featured: true,
    solutionName: 'Complete Multi-Reagent Solution Suite',
    solutionVialType: '47x Pre-filled Solution Vials in Organizer Box',
    colorReaction: {
      pureColor: 'Clear / Pale Green & Amber',
      pureColorHex: '#10B981',
      pureColorClass: 'bg-emerald-500 text-white',
      pureDescription: 'All chemical solutions remain clear or soft natural hues when genuine dairy products are tested.',
      adulteratedColor: 'Crimson Red / Indigo Blue',
      adulteratedColorHex: '#EF4444',
      adulteratedColorClass: 'bg-red-600 text-white',
      adulteratedDescription: 'Vials turn crimson red or indigo blue if adulterants are detected.'
    },
    chemicalReactionDetails: 'Includes all 3 specialized chromogenic solutions (Surfactant-reactive, Iodo-chromo, and Baudouin reagents).'
  },
  {
    id: 'prod-milk-refill-05',
    name: 'Milawat Proof™ Milk Chemical Solution Vials Refill Pack (30 Vials)',
    category: 'milk',
    tag: 'Family Refill',
    shortDesc: 'Monthly supply of 30 pre-filled chemical solution vials for daily morning milk testing and dairy vendor audits.',
    fullDesc: 'Designed for households that want to test their daily local milk delivery every morning. Simply put a small splash of milk into a fresh chemical solution vial each morning and check the color change before boiling or serving.',
    price: 549,
    originalPrice: 849,
    testsCount: 30,
    detects: ['Detergent', 'Urea', 'Starch', 'Hydrogen Peroxide', 'Neutralizers'],
    testDurationSeconds: 45,
    preOrderBatch: 'Batch #1 - Special Launch Edition',
    estimatedDelivery: 'Dispatches by Sept 15, 2026',
    inStock: true,
    active: true,
    featured: false,
    solutionName: 'Milawat Proof™ Chromogenic Milk Solution Refill Vials',
    solutionVialType: '30x Hermetically Sealed 10ml Chemical Solution Vials',
    colorReaction: {
      pureColor: 'Natural Pale Green / Clear Cream',
      pureColorHex: '#10B981',
      pureColorClass: 'bg-emerald-500 text-white',
      pureDescription: 'Chemical solution maintains natural clear green/cream tint. Safe pure milk.',
      adulteratedColor: 'Deep Crimson Red / Violet',
      adulteratedColorHex: '#EF4444',
      adulteratedColorClass: 'bg-red-600 text-white',
      adulteratedDescription: 'Immediate bright crimson red color shift warns of detergent, urea, or chemical additives.'
    },
    chemicalReactionDetails: 'Pre-filled single-use chemical solution tubes. Put 2ml milk into the vial and observe the color change in 45 seconds.'
  }
];

export const INITIAL_PREORDERS: PreOrder[] = [
  {
    id: 'MP-89421',
    createdAt: '2026-08-30T10:15:00Z',
    customer: {
      name: 'Dr. Ananya Sharma',
      phone: '+91 98765 43210',
      email: 'ananya.sharma@healthclinic.in',
      address: 'Flat 402, Green Glen Heights, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      notes: 'Please dispatch morning batch if possible, testing dairy for infant food safety.'
    },
    items: [
      {
        productId: 'prod-combo-04',
        productName: 'Milawat Proof™ Complete Kitchen Guard Chemical Solution Master Pack',
        price: 999,
        quantity: 1,
        category: 'combo'
      }
    ],
    totalAmount: 999,
    status: 'confirmed',
    paymentPreference: 'online_link_on_dispatch',
    batchDeliveryEstimate: 'Dispatches by Sept 10, 2026'
  },
  {
    id: 'MP-89422',
    createdAt: '2026-08-30T14:30:00Z',
    customer: {
      name: 'Rajesh Malhotra',
      phone: '+91 98112 34567',
      email: 'rajesh.m@gmail.com',
      address: 'House No. 18, Sector 14',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001',
      notes: 'Need for local society dairy audit.'
    },
    items: [
      {
        productId: 'prod-milk-01',
        productName: 'Milawat Proof™ Milk Chemical Solution Rapid Testing Kit',
        price: 399,
        quantity: 2,
        category: 'milk'
      },
      {
        productId: 'prod-ghee-03',
        productName: 'Milawat Proof™ Desi Ghee Chemical Reaction Solution Kit',
        price: 499,
        quantity: 1,
        category: 'ghee'
      }
    ],
    totalAmount: 1297,
    status: 'received',
    paymentPreference: 'pay_on_delivery',
    batchDeliveryEstimate: 'Dispatches by Sept 12, 2026'
  },
  {
    id: 'MP-89423',
    createdAt: '2026-08-31T01:45:00Z',
    customer: {
      name: 'Sunita Mehra',
      phone: '+91 97654 11223',
      email: 'sunitamehra77@yahoo.com',
      address: 'B-12, Alaknanda Apartments, Kothrud',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411038',
      notes: 'Testing paneer from local sweet shop.'
    },
    items: [
      {
        productId: 'prod-paneer-02',
        productName: 'Milawat Proof™ Paneer & Dairy Solids Chemical Solution Kit',
        price: 449,
        quantity: 1,
        category: 'paneer'
      }
    ],
    totalAmount: 449,
    status: 'processing',
    paymentPreference: 'pay_on_delivery',
    batchDeliveryEstimate: 'Dispatches by Sept 12, 2026'
  }
];
