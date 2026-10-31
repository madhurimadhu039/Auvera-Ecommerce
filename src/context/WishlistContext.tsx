"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import type { StoreProduct } from "@/constants/catalogue";
import { PRODUCTS } from "@/constants/catalogue";
import { useCart } from "./CartContext";

interface WishlistContextType {
  items: StoreProduct[];
  addToWishlist: (product: StoreProduct) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: StoreProduct) => boolean;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  moveToCart: (product: StoreProduct) => void;
  itemCount: number;
}

const STORAGE_KEY_WISHLIST = "auvera_wishlist_items";

// Default initial saved luxury pieces
const DEFAULT_INITIAL_WISHLIST: StoreProduct[] = [
  PRODUCTS.find((p) => p.slug === "amoled-luxury-smartwatch") || PRODUCTS[1],
  PRODUCTS.find((p) => p.slug === "emerald-parisian-leather-handbag") || PRODUCTS[7],
  PRODUCTS.find((p) => p.slug === "scandinavian-boucle-armchair") || PRODUCTS[11],
].filter(Boolean) as StoreProduct[];

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<StoreProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WISHLIST);
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        setItems(DEFAULT_INITIAL_WISHLIST);
        localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(DEFAULT_INITIAL_WISHLIST));
      }
    } catch {
      setItems(DEFAULT_INITIAL_WISHLIST);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(items));
    } catch {
      // storage quota
    }
  }, [items, isLoaded]);

  const isInWishlist = useCallback(
    (productId: string) => {
      return items.some((p) => p.id === productId);
    },
    [items]
  );

  const addToWishlist = useCallback((product: StoreProduct) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [product, ...prev];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const toggleWishlist = useCallback((product: StoreProduct): boolean => {
    let nowAdded = false;
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        nowAdded = false;
        return prev.filter((p) => p.id !== product.id);
      } else {
        nowAdded = true;
        return [product, ...prev];
      }
    });
    return nowAdded;
  }, []);

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, []);

  const moveToCart = useCallback(
    (product: StoreProduct) => {
      addToCart(product, 1);
      removeFromWishlist(product.id);
    },
    [addToCart, removeFromWishlist]
  );

  const itemCount = useMemo(() => items.length, [items.length]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        moveToCart,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}

