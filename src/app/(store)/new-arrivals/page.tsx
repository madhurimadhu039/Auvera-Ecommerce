import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Sparkles } from "lucide-react";
import { getNewArrivals } from "@/constants/catalogue";
import { formatPrice } from "@/utils/currency";

export const metadata = {
  title: "New Arrivals | AUVERA",
  description: "Explore the latest luxury arrivals, seasonal drops, and limited editions.",
};

export default function NewArrivalsPage() {
  const newArrivals = getNewArrivals();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold tracking-widest text-gold-dark uppercase">
          Just Landed
        </span>
        <h1 className="mt-2 font-serif text-3xl text-emerald sm:text-5xl">New Arrivals</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink/70">
          Be the first to acquire our freshest creations and latest boutique shipments.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {newArrivals.map((p) => (
          <li
            key={p.id}
            className="group relative flex flex-col justify-between rounded-xl border border-gold/15 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-gold/50 hover:shadow-xl"
          >
            <div>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#FAF8F5]">
                <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-emerald px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  New
                </span>
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

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-gold/10 pt-3">
              <span className="text-sm sm:text-base font-bold text-ink">{formatPrice(p.price)}</span>
              <Link
                href={`/product/${p.slug}`}
                className="grid h-8 w-8 place-items-center self-end sm:self-auto rounded-full bg-emerald text-white transition hover:bg-gold hover:text-emerald shrink-0"
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

