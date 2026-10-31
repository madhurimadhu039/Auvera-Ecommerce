"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { UserProfile, UserAddress, CustomerOrder } from "@/types/store";
import { PRODUCTS } from "@/constants/catalogue";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  orders: CustomerOrder[];
  login: (email: string, password?: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (firstName: string, lastName: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserAddress, "id">) => void;
  updateAddress: (address: UserAddress) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string, type: "shipping" | "billing") => void;
  addOrder: (order: CustomerOrder) => void;
}

const STORAGE_KEY_USER = "auvera_auth_user";
const STORAGE_KEY_ORDERS = "auvera_user_orders";

const INITIAL_ADDRESSES: UserAddress[] = [
  {
    id: "addr_1",
    title: "Primary Residence",
    fullName: "Aarav Singhania",
    phone: "+91 98200 45890",
    street: "18A, Altamount Road, Cumballa Hill",
    apartment: "Penthouse 4",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400026",
    country: "India",
    isDefaultShipping: true,
    isDefaultBilling: true,
  },
  {
    id: "addr_2",
    title: "Atelier Studio",
    fullName: "Aarav Singhania",
    phone: "+91 98200 45890",
    street: "42, Indiranagar 100 Feet Road",
    apartment: "Suite 302",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560038",
    country: "India",
    isDefaultShipping: false,
    isDefaultBilling: false,
  },
];

const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: "AUV-2026-9041",
    date: "28 October 2026",
    status: "Delivered",
    subtotal: 109999,
    discount: 0,
    shipping: 0,
    tax: 19799,
    total: 109999,
    paymentMethod: "UPI (Google Pay)",
    trackingNumber: "DEL-IND-8849201",
    estimatedDelivery: "30 October 2026",
    shippingAddress: INITIAL_ADDRESSES[0],
    items: [
      {
        id: "item_1",
        product: PRODUCTS.find((p) => p.slug === "zephyr-15-pro-aluminium-laptop") || PRODUCTS[0],
        quantity: 1,
        price: 109999,
      },
    ],
    trackingSteps: [
      { title: "Order Placed", description: "Your bespoke order has been verified", date: "28 Oct, 10:15 AM", completed: true },
      { title: "Processing & Quality Check", description: "Inspected at AUVERA atelier", date: "28 Oct, 03:40 PM", completed: true },
      { title: "Dispatched", description: "Handed over to priority courier", date: "29 Oct, 09:20 AM", completed: true },
      { title: "Out for Delivery", description: "Courier on route with secure OTP", date: "30 Oct, 11:00 AM", completed: true },
      { title: "Delivered", description: "Received and signed by patron", date: "30 Oct, 02:45 PM", completed: true, current: true },
    ],
  },
  {
    id: "AUV-2026-8812",
    date: "14 October 2026",
    status: "Dispatched",
    subtotal: 19998,
    discount: 1000,
    shipping: 0,
    tax: 3419,
    total: 18998,
    paymentMethod: "Razorpay (Credit Card)",
    trackingNumber: "BLR-EXP-3992110",
    estimatedDelivery: "02 November 2026",
    shippingAddress: INITIAL_ADDRESSES[0],
    items: [
      {
        id: "item_2",
        product: PRODUCTS.find((p) => p.slug === "noise-cancelling-headphones") || PRODUCTS[0],
        quantity: 1,
        price: 6999,
      },
      {
        id: "item_3",
        product: PRODUCTS.find((p) => p.slug === "amoled-luxury-smartwatch") || PRODUCTS[1],
        quantity: 1,
        price: 12999,
      },
    ],
    trackingSteps: [
      { title: "Order Placed", description: "Order confirmed via secured gateway", date: "14 Oct, 06:12 PM", completed: true },
      { title: "Processing", description: "Boutique packaging in progress", date: "15 Oct, 11:30 AM", completed: true },
      { title: "Dispatched", description: "In transit from Mumbai warehouse", date: "16 Oct, 08:00 AM", completed: true, current: true },
      { title: "Out for Delivery", description: "Final delivery run pending", date: "Estimated 02 Nov", completed: false },
      { title: "Delivered", description: "Awaiting recipient signature", date: "Pending", completed: false },
    ],
  },
];

const DEFAULT_DEMO_USER: UserProfile = {
  id: "usr_auvera_01",
  firstName: "Aarav",
  lastName: "Singhania",
  email: "aarav.singhania@auvera.com",
  phone: "+91 98200 45890",
  memberTier: "VIP Sovereign",
  addresses: INITIAL_ADDRESSES,
  createdAt: "January 2025",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<CustomerOrder[]>(INITIAL_ORDERS);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted session
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedOrders = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        setOrders(INITIAL_ORDERS);
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, _password?: string, _rememberMe = true): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 600)); // Smooth luxury delay

      if (!email || !email.includes("@")) {
        setIsLoading(false);
        return { success: false, error: "Please enter a valid email address." };
      }

      // If logging in with demo account or any credentials
      const loggedUser: UserProfile = {
        ...DEFAULT_DEMO_USER,
        email: email.trim().toLowerCase(),
        firstName: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      };

      setUser(loggedUser);
      try {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(loggedUser));
      } catch {
        // Storage restricted
      }
      setIsLoading(false);
      return { success: true };
    },
    []
  );

  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      email: string,
      _password?: string
    ): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 600));

      if (!firstName.trim() || !lastName.trim()) {
        setIsLoading(false);
        return { success: false, error: "First and last name are required." };
      }
      if (!email || !email.includes("@")) {
        setIsLoading(false);
        return { success: false, error: "Please enter a valid email address." };
      }

      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        memberTier: "Privé Member",
        addresses: [],
        createdAt: "October 2026",
      };

      setUser(newUser);
      try {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      } catch {
        // storage fallback
      }
      setIsLoading(false);
      return { success: true };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
    } catch {
      // storage fallback
    }
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 600));
    if (!email || !email.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }
    return { success: true };
  }, []);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      } catch {
        // storage fallback
      }
      return updated;
    });
  }, []);

  const addAddress = useCallback((addr: Omit<UserAddress, "id">) => {
    const newAddr: UserAddress = {
      ...addr,
      id: `addr_${Date.now()}`,
    };
    setUser((prev) => {
      if (!prev) return null;
      const addresses = [...prev.addresses, newAddr];
      const updated = { ...prev, addresses };
      try {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      } catch {
        // fallback
      }
      return updated;
    });
  }, []);

  const updateAddress = useCallback((updatedAddr: UserAddress) => {
    setUser((prev) => {
      if (!prev) return null;
      const addresses = prev.addresses.map((a) => (a.id === updatedAddr.id ? updatedAddr : a));
      const updated = { ...prev, addresses };
      try {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      } catch {
        // fallback
      }
      return updated;
    });
  }, []);

  const deleteAddress = useCallback((id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const addresses = prev.addresses.filter((a) => a.id !== id);
      const updated = { ...prev, addresses };
      try {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      } catch {
        // fallback
      }
      return updated;
    });
  }, []);

  const setDefaultAddress = useCallback((id: string, type: "shipping" | "billing") => {
    setUser((prev) => {
      if (!prev) return null;
      const addresses = prev.addresses.map((a) => {
        if (type === "shipping") {
          return { ...a, isDefaultShipping: a.id === id };
        }
        return { ...a, isDefaultBilling: a.id === id };
      });
      const updated = { ...prev, addresses };
      try {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      } catch {
        // fallback
      }
      return updated;
    });
  }, []);

  const addOrder = useCallback((order: CustomerOrder) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
      } catch {
        // fallback
      }
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        orders,
        login,
        register,
        logout,
        resetPassword,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

