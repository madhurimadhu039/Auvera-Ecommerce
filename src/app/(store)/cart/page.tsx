"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Tag,
  ChevronRight,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/currency";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shipping,
    discount,
    tax,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingProgress,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMessage({ text: res.message, success: res.success });
    if (res.success) {
      setCouponCode("");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-ink/60" aria-label="Breadcrumb">
        <Link href="/" className="transition hover:text-emerald">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-emerald">Shopping Bag</span>
      </nav>

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gold/15 pb-6 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-widest text-gold-dark uppercase">
              Boutique Cart
            </span>
            <Sparkles size={14} className="text-gold" />
          </div>
          <h1 className="mt-1 font-serif text-3xl font-medium text-emerald sm:text-5xl">
            Shopping Bag
          </h1>
          <p className="mt-2 text-xs text-ink/65 sm:text-sm">
            {items.length === 0
              ? "Your bag is awaiting your curated selection."
              : `Review ${items.length} ${items.length === 1 ? "creation" : "creations"} ready for bespoke delivery.`}
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 self-start text-xs font-medium text-ink/60 hover:text-rose-600 transition"
          >
            <Trash2 size={13} />
            <span>Empty Entire Bag</span>
          </button>
        )}
      </div>

      {/* Main Content: Empty State vs Cart Content */}
      {items.length === 0 ? (
        /* A. Empty Cart State */
        <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gold/30 bg-white/70 px-6 py-20 text-center shadow-sm">
          <div className="relative mb-6 grid h-20 w-20 place-items-center rounded-full bg-emerald/5 ring-8 ring-emerald/[0.02]">
            <ShoppingBag size={36} className="text-gold" strokeWidth={1.25} />
            <div className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gold text-ivory">
              <Sparkles size={12} />
            </div>
          </div>

          <h2 className="font-serif text-2xl font-medium text-ink sm:text-3xl">
            Your bag is currently empty.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-ink/65 sm:text-sm">
            Discover something beautiful from our curated collection. Every piece at AUVERA is crafted to
            elevate your daily ritual with enduring elegance.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald px-8 py-3.5 text-xs font-semibold tracking-widest text-ivory uppercase shadow-md transition hover:bg-emerald-700 hover:shadow-lg"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        /* B. Cart with Products & C. Order Summary */
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Cart Items List (7 or 8 cols) */}
          <div className="space-y-6 lg:col-span-7 xl:col-span-8">
            {/* Free shipping banner / progress indicator */}
            <div className="rounded-2xl border border-gold/20 bg-emerald/5 p-4.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-2 text-emerald">
                  <Truck size={15} />
                  {freeShippingProgress.isFree
                    ? "Complimentary Insured Delivery Unlocked!"
                    : `Add ${formatPrice(freeShippingProgress.remaining)} more for Complimentary Shipping`}
                </span>
                <span className="text-gold-dark font-bold">{freeShippingProgress.percentage}%</span>
              </div>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-emerald/10">
                <div
                  className="h-full rounded-full bg-emerald transition-all duration-500"
                  style={{ width: `${freeShippingProgress.percentage}%` }}
                />
              </div>
            </div>

            {/* Items table / cards */}
            <ul className="space-y-4">
              {items.map(({ product, quantity, selectedVariant }) => {
                const itemSubtotal = product.price * quantity;
                const maxStock = product.stock || 99;

                return (
                  <li
                    key={`${product.id}-${selectedVariant || ""}`}
                    className="flex flex-col gap-4 rounded-2xl border border-gold/15 bg-white p-4 shadow-sm transition hover:border-gold/40 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                  >
                    {/* Product Thumbnail & Main Details */}
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#FAF8F5] sm:h-24 sm:w-24">
                        <Link href={`/product/${product.slug}`}>
                          <Image
                            src={product.image || product.images?.[0] || "/images/cat-fashion.jpg"}
                            alt={product.name}
                            fill
                            sizes="96px"
                            className="object-cover transition-transform hover:scale-105"
                          />
                        </Link>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold tracking-widest text-gold-dark uppercase">
                          {product.brand}
                        </span>
                        <Link href={`/product/${product.slug}`} className="block">
                          <h2 className="line-clamp-2 text-xs font-semibold text-ink transition hover:text-emerald sm:text-sm">
                            {product.name}
                          </h2>
                        </Link>
                        {selectedVariant && (
                          <p className="text-[11px] text-ink/60">Variant: {selectedVariant}</p>
                        )}
                        <p className="text-xs font-bold text-ink sm:hidden">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>

                    {/* Price, Quantity Selector & Item Subtotal */}
                    <div className="flex items-center justify-between border-t border-gold/10 pt-3 sm:border-0 sm:pt-0 sm:gap-6">
                      {/* Unit Price (Desktop) */}
                      <div className="hidden text-right sm:block">
                        <p className="text-[10px] font-semibold text-ink/50 uppercase">Unit Price</p>
                        <p className="text-xs font-semibold text-ink">{formatPrice(product.price)}</p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center rounded-full border border-gold/30 bg-[#FAF8F5] px-2 py-1 shadow-inner">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          disabled={quantity <= 1}
                          aria-label="Decrease quantity"
                          className="grid h-6 w-6 place-items-center rounded-full text-ink/70 hover:bg-white hover:text-emerald transition disabled:opacity-30"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-ink">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          disabled={quantity >= maxStock}
                          aria-label="Increase quantity"
                          className="grid h-6 w-6 place-items-center rounded-full text-ink/70 hover:bg-white hover:text-emerald transition disabled:opacity-30"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Item Subtotal */}
                      <div className="text-right">
                        <p className="hidden text-[10px] font-semibold text-ink/50 uppercase sm:block">
                          Subtotal
                        </p>
                        <p className="text-sm font-bold text-emerald sm:text-base">
                          {formatPrice(itemSubtotal)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name} from bag`}
                        className="grid h-8 w-8 place-items-center rounded-full text-ink/40 transition hover:bg-rose-50 hover:text-rose-600"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Trust and Quality Assurances */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gold/15 bg-white p-4 text-center text-[11px] text-ink/70 sm:p-5">
              <div className="flex flex-col items-center gap-1.5">
                <Truck size={18} className="text-emerald" />
                <span className="font-semibold text-ink">Free Express Delivery</span>
                <span className="text-[10px] text-ink/50">On orders over ₹4,999</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 border-x border-gold/15 px-2">
                <RotateCcw size={18} className="text-emerald" />
                <span className="font-semibold text-ink">30-Day Easy Returns</span>
                <span className="text-[10px] text-ink/50">Complimentary courier pickup</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck size={18} className="text-emerald" />
                <span className="font-semibold text-ink">Authenticity Guaranteed</span>
                <span className="text-[10px] text-ink/50">100% verified luxury originals</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (5 or 4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28 space-y-6 rounded-3xl border border-gold/25 bg-white p-6 shadow-md sm:p-7">
              <h2 className="border-b border-gold/15 pb-4 font-serif text-2xl font-medium text-emerald">
                Order Summary
              </h2>

              {/* Cost Breakdown */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between text-ink/75">
                  <span>Bag Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-ink/75">
                  <span className="flex items-center gap-1">
                    <span>Shipping Charges</span>
                    {shipping === 0 && (
                      <span className="rounded bg-emerald/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald uppercase">
                        Free
                      </span>
                    )}
                  </span>
                  <span className={`font-semibold ${shipping === 0 ? "text-emerald" : "text-ink"}`}>
                    {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald">
                    <span className="flex items-center gap-1">
                      <span>Privilege Discount</span>
                      {appliedCoupon && (
                        <span className="rounded bg-gold/10 px-1.5 py-0.5 text-[10px] font-bold text-gold-dark uppercase">
                          {appliedCoupon.code}
                        </span>
                      )}
                    </span>
                    <span className="font-bold">-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-ink/60">
                  <span>Estimated Tax (18% GST incl.)</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                <div className="border-t border-gold/15 pt-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-sm font-bold text-ink sm:text-base">Order Total</p>
                      <p className="text-[10px] text-ink/50">Inclusive of all bespoke taxes & duties</p>
                    </div>
                    <p className="text-2xl font-serif font-bold text-emerald sm:text-3xl">
                      {formatPrice(total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Coupon / Discount Code Input */}
              <div className="border-t border-gold/15 pt-5">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-ink/75">
                  <Tag size={13} className="text-gold" />
                  <span>Privilege Coupon Code</span>
                </label>

                {appliedCoupon ? (
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-emerald/30 bg-emerald/5 p-3">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-emerald uppercase tracking-wider">
                        {appliedCoupon.code} Applied
                      </p>
                      <p className="text-[10px] text-ink/65">{appliedCoupon.description}</p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="grid h-6 w-6 place-items-center rounded-full text-ink/40 hover:bg-white hover:text-rose-600 transition"
                      title="Remove coupon"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="mt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. AUVERA10 or WELCOME500"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full rounded-xl border border-gold/30 bg-[#FAF8F5] px-3.5 py-2.5 text-xs text-ink uppercase tracking-wider outline-none transition focus:border-emerald focus:bg-white"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold tracking-wider text-ivory uppercase transition hover:bg-emerald"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponMessage && (
                  <p
                    className={`mt-2 text-[11px] ${
                      couponMessage.success ? "text-emerald font-semibold" : "text-rose-600"
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}
              </div>

              {/* Proceed to Checkout CTA */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald py-4 text-xs font-semibold tracking-widest text-ivory uppercase shadow-lg transition hover:bg-emerald-700 hover:shadow-xl"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </Link>

                <div className="text-center">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald transition hover:text-gold-dark"
                  >
                    <span>← Continue Curating</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
