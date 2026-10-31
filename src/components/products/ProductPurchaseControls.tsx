"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Heart, Check, Plus, Minus, ArrowRight, Zap } from "lucide-react";
import type { StoreProduct } from "@/constants/catalogue";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function ProductPurchaseControls({ product }: { product: StoreProduct }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const maxStock = product.stock || 99;

  const handleAdd = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector & Wishlist Toggle Row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-gold/30 bg-[#FAF8F5] px-3 py-1.5 shadow-inner">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="grid h-7 w-7 place-items-center rounded-full text-ink/70 hover:bg-white hover:text-emerald transition disabled:opacity-30"
          >
            <Minus size={13} />
          </button>
          <span className="w-10 text-center text-xs font-bold text-ink">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
            disabled={quantity >= maxStock}
            aria-label="Increase quantity"
            className="grid h-7 w-7 place-items-center rounded-full text-ink/70 hover:bg-white hover:text-emerald transition disabled:opacity-30"
          >
            <Plus size={13} />
          </button>
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-wider transition ${
            isWishlisted
              ? "border-rose-300 bg-rose-50 text-rose-600"
              : "border-gold/30 bg-white text-ink/70 hover:border-gold hover:text-rose-600"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.5} />
          <span>{isWishlisted ? "In Wishlist" : "Save to Wishlist"}</span>
        </button>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAdd}
          className={`flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 text-xs font-semibold tracking-widest uppercase shadow-md transition-all duration-200 ${
            isAdded
              ? "bg-emerald text-gold scale-[1.01]"
              : "bg-emerald text-ivory hover:bg-emerald-700"
          }`}
        >
          {isAdded ? (
            <>
              <Check size={15} />
              <span>Added to Shopping Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag size={15} />
              <span>Add to Shopping Bag</span>
            </>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 flex items-center justify-center gap-2 rounded-full border border-emerald py-3.5 text-xs font-semibold tracking-widest text-emerald uppercase transition hover:bg-emerald hover:text-ivory"
        >
          <Zap size={14} />
          <span>Buy with Express Checkout</span>
        </button>
      </div>
    </div>
  );
}
