export type Department = "beauty-skincare" | "electronics-gadgets" | "fashion-lifestyle";

export type ProductAvailability = "in_stock" | "low_stock" | "out_of_stock";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  department: Department;
  brand: string;
  description: string;
  price: number;
  discount?: number;
  discountBadge?: string;
  compareAtPrice?: number;
  currency?: string;
  image: string;
  images: string[];
  additionalImages?: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  availability: ProductAvailability;
  featured: boolean;
  deal?: boolean;
  newArrival?: boolean;
  features?: string[];
  attributes?: Record<string, string | number | boolean>;
  status?: "active" | "draft";
  createdAt: string;
  updatedAt?: string;
}

export interface CategoryDepartment {
  slug: string;
  name: string;
  icon: string;
  image: string;
  description: string;
  colorClass: string;
  badgeBg: string;
  badgeText: string;
  department: Department;
  itemCount: number;
  subcategories: { slug: string; name: string }[];
}

export interface Order {
  id: string;
  userId: string;
  items: { productId: string; qty: number; unitPrice: number }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: "pending" | "paid" | "failed" | "shipped" | "delivered" | "cancelled" | "refunded";
  razorpayOrderId?: string;
  createdAt: string;
}
