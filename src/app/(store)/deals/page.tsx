import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Flame, Sparkles } from "lucide-react";
import { getDeals } from "@/constants/catalogue";
import { formatPrice } from "@/utils/currency";

export const metadata = {
  title: "Exclusive Deals & Offers | AUVERA",
  description: "Limited-time offers on luxury items across beauty, fashion, tech, and living.",
};

export default function DealsPage() {
  const deals = getDeals();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Banner */}
      <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald via-emerald-800 to-emerald-950 p-8 text-ivory md:p-12">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold tracking-wider text-gold uppercase">
            <Flame size={14} />
            <span>Limited Time Offers</span>
          </div>
          <h1 className="mt-3 font-serif text-3xl sm:text-5xl">Privé Season Deals</h1>
          <p className="mt-3 text-sm text-ivory/80">
            Enjoy up to 30% savings on exceptional icons of craftsmanship. Handpicked for our discerning patrons.
          </p>
        </div>
      </div>

      {/* Grid */}
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {deals.map((p) => (
          <li
            key={p.id}
            className="group relative flex flex-col justify-between rounded-xl border border-gold/15 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-gold/50 hover:shadow-xl"
          >
            <div>
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
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              </div>

              <div className="mt-3">
                <span className="text-[10px] font-semibold tracking-wider text-gold-dark uppercase">
                  {p.brand}
                </span>
                <Link href={`/product/${p.slug}`} className="block">
                  <h3 className="line-clamp-2 text-sm font-medium text-ink transition-colors group-hover:text-emerald">
                    {p.name}
                  </h3>
                </Link>

                <div className="mt-1 flex items-center gap-1 text-amber-400">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-[11px] text-ink/50">({p.reviewCount})</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gold/10 pt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-ink">{formatPrice(p.price)}</span>
                {p.compareAtPrice && (
                  <span className="text-xs text-ink/40 line-through">
                    {formatPrice(p.compareAtPrice)}
                  </span>
                )}
              </div>
              <Link
                href={`/product/${p.slug}`}
                className="grid h-8 w-8 place-items-center rounded-full bg-emerald text-white transition hover:bg-gold hover:text-emerald"
                aria-label={`View ${p.name}`}
              >
                <ShoppingBag size={14} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

