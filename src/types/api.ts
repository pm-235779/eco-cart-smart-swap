
// Product interfaces
export interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  ecoScore: number;
  isEcoFriendly: boolean;
  co2Impact: number;
  rating: number;
  tags: string[];
  description?: string;
  inStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  ecoScore: number;
  isEcoFriendly: boolean;
  co2Impact: number;
  rating: number;
  tags: string[];
  description?: string;
  inStock: number;
}

// User interfaces
export interface User {
  _id: string;
  auth0Id: string;
  email: string;
  name: string;
  picture?: string;
  role: 'customer' | 'admin';
  ecoStats: EcoStats;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface EcoStats {
  totalCO2Saved: number;
  ecoProductsPurchased: number;
  totalPurchases: number;
  weeklyGoal: number;
  badges: string[];
  streak: number;
  weeklyData: WeeklyData[];
}

export interface WeeklyData {
  day: string;
  co2Saved: number;
  purchases: number;
}

export interface UserPreferences {
  autoSwapEnabled: boolean;
  notifications: {
    ecoTips: boolean;
    productUpdates: boolean;
    weeklyReport: boolean;
    discountAlerts: boolean;
  };
}

// Cart interfaces
export interface CartItem {
  _id?: string;
  productId: string;
  product?: Product;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  totalCO2Impact: number;
  updatedAt: string;
}

// Purchase interfaces
export interface Purchase {
  _id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  totalCO2Impact: number;
  shippingAddress: Address;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Analytics interfaces
export interface Analytics {
  totalUsers: number;
  totalProducts: number;
  totalPurchases: number;
  averageEcoScore: number;
  totalCO2Saved: number;
  monthlyStats: MonthlyStats[];
  topProducts: Product[];
  topUsers: User[];
}

export interface MonthlyStats {
  month: string;
  users: number;
  purchases: number;
  co2Saved: number;
  revenue: number;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// API Error interface
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
