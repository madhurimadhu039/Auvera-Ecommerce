"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Sparkles, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { getTopPicks, type StoreProduct } from "@/constants/catalogue";
import { formatPrice } from "@/utils/currency";

export function TopPicks() {
  const products = getTopPicks();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (e: React.MouseEvent, p: StoreProduct) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8" aria-label="Top Picks">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Top Picks For You
          </h2>
          <Sparkles className="text-gold" size={20} />
        </div>
        <Link
          href="/deals"
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-ink transition hover:text-emerald"
        >
          See All Deals
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="relative">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((p) => {
            const isAdded = addedId === p.id;
            return (
              <li
                key={p.id}
                className="group relative flex flex-col justify-between rounded-xl border border-gold/15 bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-gold/50 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              >
                <div>
                  {/* Image & Discount Badge */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#FAF8F5]">
                    {p.discountBadge && (
                      <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-[#FEE2E2] px-2 py-0.5 text-[11px] font-bold text-[#DC2626]">
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
                  <Link href={`/product/${p.slug}`} className="mt-3 block">
                    <h3 className="line-clamp-2 text-sm font-medium text-ink transition-colors group-hover:text-emerald">
                      {p.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="mt-1.5 flex items-center gap-1">
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <span className="text-[11px] text-ink/50">
                      ({p.reviewCount.toLocaleString()})
                    </span>
                  </div>
                </div>

                {/* Price & Add to Cart button */}
                <div className="mt-3 flex items-center justify-between pt-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-bold text-ink">
                      {formatPrice(p.price)}
                    </span>
                    {p.compareAtPrice && (
                      <span className="text-xs text-ink/40 line-through">
                        {formatPrice(p.compareAtPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, p)}
                    aria-label={`Add ${p.name} to bag`}
                    className={`grid h-8 w-8 place-items-center rounded-full transition-all duration-200 ${
                      isAdded
                        ? "bg-emerald text-gold"
                        : "bg-emerald text-white hover:bg-gold hover:text-emerald"
                    }`}
                  >
                    {isAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
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
