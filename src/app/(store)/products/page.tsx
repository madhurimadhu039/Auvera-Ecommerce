import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Search, Sparkles } from "lucide-react";
import { getAllProducts, CATEGORIES } from "@/constants/catalogue";
import { formatPrice } from "@/utils/currency";

interface Props {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}

export const metadata = {
  title: "Shop All Luxury Products | AUVERA",
  description: "Browse our complete collection of luxury beauty, fashion, tech, and home essentials.",
};

export default async function ProductsPage({ searchParams }: Props) {
  const { q, category } = await searchParams;
  let products = getAllProducts();

  // Search filter
  if (q) {
    const query = q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (category && category !== "all") {
    products = products.filter((p) => p.category === category);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gold/15 pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold tracking-widest text-gold-dark uppercase">
            Curated Catalogue
          </span>
          <h1 className="mt-1 font-serif text-3xl text-emerald sm:text-4xl">
            {q ? `Search results for "${q}"` : "All Products"}
          </h1>
          <p className="mt-2 text-xs text-ink/60 sm:text-sm">
            Showing {products.length} refined items crafted with uncompromising precision.
          </p>
        </div>

        {/* Search input in page */}
        <form action="/products" method="GET" className="relative w-full max-w-xs">
          <input
            name="q"
            defaultValue={q || ""}
            placeholder="Filter catalogue..."
            className="w-full rounded-full border border-gold/40 bg-white py-2 pl-4 pr-10 text-xs text-ink outline-none focus:border-emerald"
          />
          <button
            type="submit"
            aria-label="Filter"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-emerald"
          >
            <Search size={14} />
          </button>
        </form>
      </div>

      {/* Categories Bar */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <Link
          href="/products"
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
            !category ? "bg-emerald text-white" : "bg-white text-ink/70 hover:bg-gold/10"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/products?category=${c.slug}`}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition ${
              category === c.slug
                ? "bg-emerald text-white shadow-sm"
                : "bg-white text-ink/70 hover:bg-gold/10"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
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

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-gold/10 pt-3">
                <div className="flex flex-wrap items-baseline gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-ink">{formatPrice(p.price)}</span>
                  {p.compareAtPrice && (
                    <span className="text-xs text-ink/40 line-through">
                      {formatPrice(p.compareAtPrice)}
                    </span>
                  )}
                </div>
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
      ) : (
        <div className="rounded-2xl border border-dashed border-gold/30 bg-white p-12 text-center">
          <Sparkles className="mx-auto text-gold" size={32} />
          <h2 className="mt-3 text-lg font-semibold text-ink">No matching products found</h2>
          <p className="mt-2 text-sm text-ink/60">
            Try adjusting your search terms or browse our category collections.
          </p>
          <Link href="/products" className="btn-gold mt-6 inline-block">
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
}

