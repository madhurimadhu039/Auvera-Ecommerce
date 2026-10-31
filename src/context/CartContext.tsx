"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import type { CartItem, Coupon } from "@/types/store";
import type { StoreProduct } from "@/constants/catalogue";
import { PRODUCTS } from "@/constants/catalogue";
import { CURRENCY } from "@/utils/currency";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: StoreProduct, quantity?: number, selectedVariant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  freeShippingProgress: {
    threshold: number;
    remaining: number;
    percentage: number;
    isFree: boolean;
  };
}

const STORAGE_KEY_CART = "auvera_shopping_cart";
const STORAGE_KEY_COUPON = "auvera_applied_coupon";

const VALID_COUPONS: Coupon[] = [
  {
    code: "AUVERA10",
    discountType: "percentage",
    discountValue: 10,
    description: "10% off your entire bespoke order",
  },
  {
    code: "WELCOME500",
    discountType: "fixed",
    discountValue: 500,
    minOrderValue: 2000,
    description: "₹500 welcome privileges for patrons (min order ₹2,000)",
  },
  {
    code: "PRIVE20",
    discountType: "percentage",
    discountValue: 20,
    minOrderValue: 10000,
    description: "20% privileged patron tier on orders above ₹10,000",
  },
];

// Seed 2 default luxury items for a rich first impression if cart is initially empty
const DEFAULT_INITIAL_ITEMS: CartItem[] = [
  {
    product: PRODUCTS.find((p) => p.slug === "noise-cancelling-headphones") || PRODUCTS[0],
    quantity: 1,
  },
  {
    product: PRODUCTS.find((p) => p.slug === "minimalist-niacinamide-serum") || PRODUCTS[2],
    quantity: 2,
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CART);
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        // First visit default
        setItems(DEFAULT_INITIAL_ITEMS);
        localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(DEFAULT_INITIAL_ITEMS));
      }

      const storedCoupon = localStorage.getItem(STORAGE_KEY_COUPON);
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch {
      setItems(DEFAULT_INITIAL_ITEMS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(items));
    } catch {
      // storage quota or fallback
    }
  }, [items, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem(STORAGE_KEY_COUPON, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(STORAGE_KEY_COUPON);
      }
    } catch {
      // storage quota
    }
  }, [appliedCoupon, isLoaded]);

  const addToCart = useCallback((product: StoreProduct, quantity = 1, selectedVariant?: string) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === selectedVariant
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(product.stock || 99, next[existingIndex].quantity + quantity);
        next[existingIndex] = { ...next[existingIndex], quantity: newQty };
        return next;
      } else {
        const initialQty = Math.min(product.stock || 99, Math.max(1, quantity));
        return [...prev, { product, quantity: initialQty, selectedVariant }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) => {
        if (item.product.id === productId) {
          const maxStock = item.product.stock || 99;
          return { ...item, quantity: Math.min(maxStock, quantity) };
        }
        return item;
      });
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= CURRENCY.freeShippingThreshold ? 0 : 499;
  }, [items.length, subtotal]);

  const freeShippingProgress = useMemo(() => {
    const threshold = CURRENCY.freeShippingThreshold; // 4999
    const remaining = Math.max(0, threshold - subtotal);
    const percentage = Math.min(100, Math.round((subtotal / threshold) * 100));
    return {
      threshold,
      remaining,
      percentage,
      isFree: subtotal >= threshold,
    };
  }, [subtotal]);

  const discount = useMemo(() => {
    if (!appliedCoupon || subtotal === 0) return 0;
    if (appliedCoupon.minOrderValue && subtotal < appliedCoupon.minOrderValue) {
      return 0;
    }
    if (appliedCoupon.discountType === "percentage") {
      return Math.round((subtotal * appliedCoupon.discountValue) / 100);
    }
    return Math.min(subtotal, appliedCoupon.discountValue);
  }, [appliedCoupon, subtotal]);

  // Luxury standard: prices are inclusive of GST, or itemized
  const tax = useMemo(() => {
    if (subtotal === 0) return 0;
    // Standard 18% GST estimate
    return Math.round((subtotal - discount) * 0.18);
  }, [subtotal, discount]);

  const total = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.max(0, subtotal - discount + shipping);
  }, [items.length, subtotal, discount, shipping]);

  const applyCoupon = useCallback(
    (code: string): { success: boolean; message: string } => {
      const clean = code.trim().toUpperCase();
      const found = VALID_COUPONS.find((c) => c.code === clean);

      if (!found) {
        return { success: false, message: "Invalid coupon code. Try 'AUVERA10' or 'WELCOME500'." };
      }

      if (found.minOrderValue && subtotal < found.minOrderValue) {
        return {
          success: false,
          message: `Minimum order value of ₹${found.minOrderValue.toLocaleString("en-IN")} required for ${clean}.`,
        };
      }

      setAppliedCoupon(found);
      return { success: true, message: `Privilege coupon ${clean} applied successfully!` };
    },
    [subtotal]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shipping,
        discount,
        tax,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
