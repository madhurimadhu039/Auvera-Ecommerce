import type { StoreProduct } from "@/constants/catalogue";

export interface UserAddress {
  id: string;
  title: string; // e.g. "Home", "Office"
  fullName: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  memberTier: "Privé Member" | "Gold Patron" | "VIP Sovereign";
  avatarUrl?: string;
  addresses: UserAddress[];
  createdAt: string;
}

export interface CartItem {
  product: StoreProduct;
  quantity: number;
  selectedVariant?: string;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number; // e.g. 10 for 10% or 500 for ₹500
  minOrderValue?: number;
  description: string;
}

export type OrderStatus =
  | "Order Placed"
  | "Processing"
  | "Confirmed"
  | "Dispatched"
  | "Out for Delivery"
  | "Delivered";

export interface OrderItem {
  id: string;
  product: StoreProduct;
  quantity: number;
  price: number;
}

export interface OrderTrackingStep {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current?: boolean;
}

export interface CustomerOrder {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: UserAddress;
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
  trackingSteps: OrderTrackingStep[];
}
