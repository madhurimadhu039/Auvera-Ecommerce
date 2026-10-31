"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingBag, Trash2, ArrowRight, Check, Sparkles, ChevronRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/currency";

export default function WishlistPage() {
  const { items, removeFromWishlist, moveToCart, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const handleAddToCart = (product: (typeof items)[0]) => {
    addToCart(product, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const handleMoveToCart = (product: (typeof items)[0]) => {
    moveToCart(product);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-ink/60" aria-label="Breadcrumb">
        <Link href="/" className="transition hover:text-emerald">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-emerald">My Wishlist</span>
      </nav>

      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-4 border-b border-gold/15 pb-6 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-widest text-gold-dark uppercase">
              Curated Favorites
            </span>
            <Sparkles size={14} className="text-gold" />
          </div>
          <h1 className="mt-1 font-serif text-3xl font-medium text-emerald sm:text-5xl">
            My Wishlist
          </h1>
          <p className="mt-2 text-xs text-ink/65 sm:text-sm">
            {items.length === 1
              ? "1 exceptional creation reserved in your private edit."
              : `${items.length} exceptional creations reserved in your private edit.`}
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearWishlist}
              className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-white px-4 py-2 text-xs font-medium text-ink/70 transition hover:border-rose-400 hover:text-rose-600"
            >
              <Trash2 size={13} />
              <span>Clear Wishlist</span>
            </button>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-emerald px-5 py-2 text-xs font-semibold tracking-wider text-ivory uppercase shadow-sm transition hover:bg-emerald-700"
            >
              <span>Explore More</span>
            </Link>
          </div>
        )}
      </div>

      {/* Main Content: Empty State vs Products Grid */}
      {items.length === 0 ? (
        /* A. Empty Wishlist State */
        <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gold/30 bg-white/70 px-6 py-20 text-center shadow-sm">
          <div className="relative mb-6 grid h-20 w-20 place-items-center rounded-full bg-emerald/5 ring-8 ring-emerald/[0.02]">
            <Heart size={36} className="text-gold" strokeWidth={1.25} />
            <div className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gold text-ivory">
              <Sparkles size={12} />
            </div>
          </div>

          <h2 className="font-serif text-2xl font-medium text-ink sm:text-3xl">
            Your wishlist is waiting.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-ink/65 sm:text-sm">
            Save your favourite pieces and find them here whenever you&apos;re ready. Crafted with
            uncompromising precision for those who appreciate the extraordinary.
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
        /* B. Wishlist with Products Grid */
        <div className="space-y-6">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((product) => {
              const isAdded = Boolean(addedMap[product.id]);
              const inStock = product.stock > 0;

              return (
                <li
                  key={product.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-gold/15 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-gold/50 hover:shadow-xl"
                >
                  <div>
                    {/* Image & Action Overlays */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#FAF8F5]">
                      {product.discountBadge && (
                        <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-[#FEE2E2] px-2 py-0.5 text-[10px] font-bold text-[#DC2626]">
                          {product.discountBadge}
                        </span>
                      )}

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        aria-label={`Remove ${product.name} from wishlist`}
                        className="absolute right-2.5 top-2.5 z-10 grid h-7 w-7 place-items-center rounded-full bg-white/95 text-ink/40 shadow transition hover:scale-110 hover:text-rose-600"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={13} />
                      </button>

                      <Link href={`/product/${product.slug}`} className="block h-full w-full">
                        <Image
                          src={product.image || product.images?.[0] || "/images/cat-fashion.jpg"}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                    </div>

                    {/* Details */}
                    <div className="mt-3.5">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-gold-dark uppercase tracking-wider">
                        <span>{product.brand}</span>
                        <span
                          className={`text-[9px] font-bold uppercase ${
                            inStock ? "text-emerald" : "text-rose-600"
                          }`}
                        >
                          {inStock ? (product.stock > 5 ? "In Stock" : `Only ${product.stock} Left`) : "Out of Stock"}
                        </span>
                      </div>

                      <Link href={`/product/${product.slug}`} className="mt-1 block">
                        <h3 className="line-clamp-2 text-xs font-semibold text-ink transition-colors group-hover:text-emerald sm:text-sm">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-sm font-bold text-ink sm:text-base">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-ink/40 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-4 flex flex-col gap-2 border-t border-gold/10 pt-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!inStock}
                      className={`flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                        !inStock
                          ? "cursor-not-allowed bg-ink/10 text-ink/40"
                          : isAdded
                          ? "bg-emerald text-gold"
                          : "bg-emerald text-ivory hover:bg-emerald-700 shadow-sm"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={13} />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={13} />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleMoveToCart(product)}
                      disabled={!inStock}
                      className="text-center text-[11px] font-medium text-ink/60 underline hover:text-emerald transition disabled:opacity-40"
                    >
                      Move to Cart & Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

