"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Sparkles, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { getTopPicks, type StoreProduct } from "@/constants/catalogue";
import { formatPrice } from "@/utils/currency";
import { useCart } from "@/context/CartContext";

export function TopPicks() {
  const products = getTopPicks();
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (e: React.MouseEvent, p: StoreProduct) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(p, 1);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8" aria-label="Top Picks">
      <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-ink">
            Top Picks For You
          </h2>
          <Sparkles className="text-gold shrink-0" size={18} />
        </div>
        <Link
          href="/deals"
          className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-ink transition hover:text-emerald shrink-0"
        >
          <span>See All Deals</span>
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="relative">
        <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((p) => {
            const isAdded = addedId === p.id;
            return (
              <li
                key={p.id}
                className="group relative flex flex-col justify-between rounded-xl border border-gold/15 bg-white p-2.5 sm:p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-gold/50 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              >
                <div>
                  {/* Image & Discount Badge */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#FAF8F5]">
                    {p.discountBadge && (
                      <span className="absolute left-1.5 top-1.5 sm:left-2.5 sm:top-2.5 z-10 rounded-md bg-[#FEE2E2] px-1.5 py-0.5 text-[9px] sm:text-[11px] font-bold text-[#DC2626]">
                        {p.discountBadge}
                      </span>
                    )}
                    <Link href={`/product/${p.slug}`} className="block h-full w-full">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  </div>

                  {/* Title */}
                  <Link href={`/product/${p.slug}`} className="mt-2 sm:mt-3 block">
                    <h3 className="line-clamp-2 text-xs sm:text-sm font-medium text-ink transition-colors group-hover:text-emerald min-h-[32px] sm:min-h-[40px]">
                      {p.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="mt-1 flex items-center gap-1">
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-ink/50">
                      ({p.reviewCount.toLocaleString()})
                    </span>
                  </div>
                </div>

                {/* Price & Add to Cart button */}
                <div className="mt-2.5 sm:mt-3 flex items-center justify-between border-t border-gold/10 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 min-w-0">
                    <span className="text-xs sm:text-sm md:text-base font-bold text-ink truncate">
                      {formatPrice(p.price)}
                    </span>
                    {p.compareAtPrice && (
                      <span className="text-[10px] sm:text-xs text-ink/40 line-through truncate">
                        {formatPrice(p.compareAtPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, p)}
                    aria-label={`Add ${p.name} to bag`}
                    className={`grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-full transition-all duration-200 active:scale-95 ${
                      isAdded
                        ? "bg-emerald text-gold"
                        : "bg-emerald text-white hover:bg-gold hover:text-emerald"
                    }`}
                  >
                    {isAdded ? <Check size={13} /> : <ShoppingBag size={13} />}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
