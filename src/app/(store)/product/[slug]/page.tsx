import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ShieldCheck, Truck, RotateCcw, ChevronRight, Check } from "lucide-react";
import { getProductById, getProductsByCategory, getAllProducts } from "@/constants/catalogue";
import { formatPrice } from "@/utils/currency";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductById(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | AUVERA`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    notFound();
  }

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-ink/60" aria-label="Breadcrumb">
        <Link href="/" prefetch={true} className="hover:text-emerald">Home</Link>
        <ChevronRight size={12} />
        <Link href={`/categories/${product.category}`} prefetch={true} className="capitalize hover:text-emerald">
          {product.category.replace("-", " ")}
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-emerald">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product Image Stage */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-gold/20 bg-[#FAF8F5] shadow-lg">
            {product.discountBadge && (
              <span className="absolute left-4 top-4 z-10 rounded-lg bg-[#FEE2E2] px-3 py-1 text-xs font-bold text-[#DC2626]">
                {product.discountBadge}
              </span>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.additionalImages && product.additionalImages.length > 0 && (
            <div className="flex gap-3">
              <div className="relative h-20 w-20 overflow-hidden rounded-xl border-2 border-emerald bg-[#FAF8F5]">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              {product.additionalImages.map((img, idx) => (
                <div key={idx} className="relative h-20 w-20 overflow-hidden rounded-xl border border-gold/20 bg-[#FAF8F5] opacity-70 hover:opacity-100">
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Purchase Options */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold tracking-widest text-gold-dark uppercase">
              {product.brand}
            </span>
            <h1 className="mt-2 font-serif text-3xl text-emerald sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="text-xs font-semibold text-ink">5.0</span>
              <span className="text-xs text-ink/50">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3 border-b border-gold/15 pb-6">
              <span className="text-3xl font-bold text-ink">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-lg text-ink/40 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="rounded bg-emerald/10 px-2 py-0.5 text-xs font-bold text-emerald">
                    Save {formatPrice(product.compareAtPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-relaxed text-ink/75 sm:text-base">
              {product.description}
            </p>

            {/* Features list */}
            {product.features && (
              <div className="mt-6 space-y-2.5">
                <h2 className="text-xs font-semibold tracking-wider text-ink/50 uppercase">Key Features</h2>
                <ul className="space-y-2 text-xs text-ink/80 sm:text-sm">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald text-ivory">
                        <Check size={10} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-8 border-t border-gold/15 pt-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="flex-1 rounded-full bg-emerald py-3.5 text-xs font-semibold tracking-widest text-ivory uppercase shadow-md transition hover:bg-emerald-700">
                Add to Shopping Bag
              </button>
              <button className="flex-1 rounded-full border border-emerald py-3.5 text-xs font-semibold tracking-widest text-emerald uppercase transition hover:bg-emerald hover:text-ivory">
                Buy with Express Checkout
              </button>
            </div>

            {/* Trust guarantees */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gold/10 pt-6 text-center text-xs text-ink/65">
              <div className="flex flex-col items-center gap-1.5">
                <Truck size={20} className="text-emerald" />
                <span>Free Insured Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RotateCcw size={20} className="text-emerald" />
                <span>30-Day Easy Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck size={20} className="text-emerald" />
                <span>Authenticity Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20 border-t border-gold/15 pt-12">
          <h2 className="text-2xl font-semibold text-emerald sm:text-3xl">
            You May Also Admire
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group rounded-xl border border-gold/15 bg-white p-3 shadow-sm transition hover:border-gold hover:shadow-lg"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#FAF8F5]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 line-clamp-1 text-xs font-medium text-ink group-hover:text-emerald sm:text-sm">
                  {p.name}
                </h3>
                <p className="mt-1 text-xs font-bold text-ink sm:text-sm">{formatPrice(p.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

