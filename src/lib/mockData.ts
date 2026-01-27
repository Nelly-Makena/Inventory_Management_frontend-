export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  costPrice: number;
  supplier: string;
  minStock: number;
  maxStock: number;
  expiryDate?: string;
  lastUpdated: string;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  date: string;
  cashier: string;
}

export interface Notification {
  id: string;
  type: 'low-stock' | 'overstock' | 'expiry' | 'sale';
  title: string;
  message: string;
  productId?: string;
  timestamp: string;
  read: boolean;
}

export const categories = [
  'Food & Beverages',
  'Electronics',
  'Household Goods',
  'Personal Care',
  'Clothing',
  'Stationery',
  'Hardware',
];

export const suppliers = [
  'Bidco Africa',
  'Unilever Kenya',
  'EABL',
  'Safaricom',
  'Brookside Dairy',
  'Kapa Oil Refineries',
  'Chandaria Industries',
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Cooking Oil (2L)',
    category: 'Food & Beverages',
    quantity: 45,
    unitPrice: 650,
    costPrice: 520,
    supplier: 'Bidco Africa',
    minStock: 20,
    maxStock: 100,
    lastUpdated: '2024-01-27',
  },
  {
    id: '2',
    name: 'Maize Flour (2kg)',
    category: 'Food & Beverages',
    quantity: 8,
    unitPrice: 180,
    costPrice: 140,
    supplier: 'Unilever Kenya',
    minStock: 30,
    maxStock: 150,
    lastUpdated: '2024-01-27',
  },
  {
    id: '3',
    name: 'Fresh Milk (500ml)',
    category: 'Food & Beverages',
    quantity: 120,
    unitPrice: 65,
    costPrice: 50,
    supplier: 'Brookside Dairy',
    minStock: 50,
    maxStock: 100,
    expiryDate: '2024-02-01',
    lastUpdated: '2024-01-27',
  },
  {
    id: '4',
    name: 'Sugar (1kg)',
    category: 'Food & Beverages',
    quantity: 35,
    unitPrice: 180,
    costPrice: 145,
    supplier: 'Chandaria Industries',
    minStock: 25,
    maxStock: 80,
    lastUpdated: '2024-01-26',
  },
  {
    id: '5',
    name: 'Phone Charger USB-C',
    category: 'Electronics',
    quantity: 5,
    unitPrice: 450,
    costPrice: 280,
    supplier: 'Safaricom',
    minStock: 10,
    maxStock: 40,
    lastUpdated: '2024-01-25',
  },
  {
    id: '6',
    name: 'Washing Powder (1kg)',
    category: 'Household Goods',
    quantity: 42,
    unitPrice: 280,
    costPrice: 210,
    supplier: 'Unilever Kenya',
    minStock: 20,
    maxStock: 60,
    lastUpdated: '2024-01-27',
  },
  {
    id: '7',
    name: 'Bread (White)',
    category: 'Food & Beverages',
    quantity: 25,
    unitPrice: 60,
    costPrice: 45,
    supplier: 'Bidco Africa',
    minStock: 15,
    maxStock: 50,
    expiryDate: '2024-01-29',
    lastUpdated: '2024-01-27',
  },
  {
    id: '8',
    name: 'Rice (2kg)',
    category: 'Food & Beverages',
    quantity: 3,
    unitPrice: 320,
    costPrice: 250,
    supplier: 'Chandaria Industries',
    minStock: 20,
    maxStock: 80,
    lastUpdated: '2024-01-26',
  },
];

export const mockSales: Sale[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Cooking Oil (2L)',
    quantity: 2,
    unitPrice: 650,
    total: 1300,
    date: '2024-01-27T10:30:00',
    cashier: 'Jane Wanjiku',
  },
  {
    id: '2',
    productId: '2',
    productName: 'Maize Flour (2kg)',
    quantity: 5,
    unitPrice: 180,
    total: 900,
    date: '2024-01-27T11:15:00',
    cashier: 'John Kamau',
  },
  {
    id: '3',
    productId: '3',
    productName: 'Fresh Milk (500ml)',
    quantity: 10,
    unitPrice: 65,
    total: 650,
    date: '2024-01-27T09:00:00',
    cashier: 'Jane Wanjiku',
  },
  {
    id: '4',
    productId: '4',
    productName: 'Sugar (1kg)',
    quantity: 3,
    unitPrice: 180,
    total: 540,
    date: '2024-01-27T14:20:00',
    cashier: 'John Kamau',
  },
  {
    id: '5',
    productId: '6',
    productName: 'Washing Powder (1kg)',
    quantity: 2,
    unitPrice: 280,
    total: 560,
    date: '2024-01-26T16:45:00',
    cashier: 'Jane Wanjiku',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'low-stock',
    title: 'Low Stock Alert',
    message: 'Rice (2kg) is critically low - only 3 units left',
    productId: '8',
    timestamp: '2024-01-27T08:00:00',
    read: false,
  },
  {
    id: '2',
    type: 'low-stock',
    title: 'Low Stock Alert',
    message: 'Phone Charger USB-C is below minimum stock level',
    productId: '5',
    timestamp: '2024-01-27T07:30:00',
    read: false,
  },
  {
    id: '3',
    type: 'overstock',
    title: 'Overstock Warning',
    message: 'Fresh Milk (500ml) exceeds maximum stock level',
    productId: '3',
    timestamp: '2024-01-27T06:00:00',
    read: true,
  },
  {
    id: '4',
    type: 'low-stock',
    title: 'Low Stock Alert',
    message: 'Maize Flour (2kg) needs restocking',
    productId: '2',
    timestamp: '2024-01-26T18:00:00',
    read: true,
  },
];

export const formatKES = (amount: number): string => {
  return `KSh ${amount.toLocaleString('en-KE')}`;
};

export const getStockStatus = (product: Product): 'low' | 'normal' | 'overstock' => {
  if (product.quantity <= product.minStock) return 'low';
  if (product.quantity >= product.maxStock) return 'overstock';
  return 'normal';
};
