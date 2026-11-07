"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Sparkles, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { StoreProduct } from "@/constants/catalogue";

const TOP_PICKS = [
  {
    id: "prod-headphones",
    name: "Noise Cancelling Headphones",
    slug: "studio-pro-wireless-headphones",
    brand: "AuraAcoustics",
    category: "electronics",
    subcategory: "headphones",
    department: "electronics-gadgets",
    price: 79.99,
    compareAtPrice: 99.99,
    displayPrice: "$79.99",
    displayCompareAt: "$99.99",
    discountBadge: "-20%",
    image: "/images/product-headphones.jpg",
    images: ["/images/product-headphones.jpg"],
    rating: 5,
    reviewCount: 1234,
    stock: 25,
    availability: "in_stock" as const,
    description: "Engineered with hybrid active noise cancellation, custom 40mm beryllium drivers, and 45-hour battery life.",
    features: ["Hybrid ANC", "45-hour battery life", "Beryllium drivers"],
    featured: true,
    deal: true,
    newArrival: false,
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "prod-linen-shirt",
    name: "Linen Casual Shirt",
    slug: "linen-casual-shirt",
    brand: "Atelier V",
    category: "fashion",
    subcategory: "shirts",
    department: "fashion-lifestyle",
    price: 29.99,
    compareAtPrice: 39.99,
    displayPrice: "$29.99",
    displayCompareAt: "$39.99",
    discountBadge: "-25%",
    image: "/images/product-linen-shirt.jpg",
    images: ["/images/product-linen-shirt.jpg"],
    rating: 5,
    reviewCount: 912,
    stock: 45,
    availability: "in_stock" as const,
    description: "Spun from 100% Normandy certified flax linen. Garment-dyed in muted earth tones for a relaxed drape.",
    features: ["100% French Normandy certified linen", "Mother-of-pearl buttons", "Garment washed for softness"],
    featured: true,
    deal: true,
    newArrival: true,
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "prod-serum",
    name: "Minimalist Niacinamide Serum",
    slug: "minimalist-niacinamide-serum",
    brand: "Botaniq",
    category: "beauty",
    subcategory: "serums",
    department: "beauty-skincare",
    price: 16.99,
    compareAtPrice: 19.99,
    displayPrice: "$16.99",
    displayCompareAt: "$19.99",
    discountBadge: "-15%",
    image: "/images/product-serum.jpg",
    images: ["/images/product-serum.jpg"],
    rating: 5,
    reviewCount: 545,
    stock: 60,
    availability: "in_stock" as const,
    description: "A restorative 10% Vitamin B3 Niacinamide and 1% Zinc PCA serum designed to refine pore texture.",
    features: ["10% Niacinamide + 1% Zinc PCA", "Free of parabens and synthetic fragrance", "UV-protective amber glass"],
    featured: true,
    deal: true,
    newArrival: false,
    createdAt: "2026-01-02T10:00:00Z",
  },
  {
    id: "prod-coffee-maker",
    name: "Compact Coffee Maker",
    slug: "compact-coffee-maker",
    brand: "BaristaCraft",
    category: "home-living",
    subcategory: "kitchen",
    department: "fashion-lifestyle",
    price: 48.99,
    compareAtPrice: 69.99,
    displayPrice: "$48.99",
    displayCompareAt: "$69.99",
    discountBadge: "-30%",
    image: "/images/product-coffee-maker.jpg",
    images: ["/images/product-coffee-maker.jpg"],
    rating: 5,
    reviewCount: 963,
    stock: 20,
    availability: "in_stock" as const,
    description: "Precision thermal drip coffee maker with programmable timer, reusable gold-tone filter, and heat-resistant glass carafe.",
    features: ["Programmable 24-hr brew timer", "Reusable gold-tone mesh filter", "Thermal warming plate"],
    featured: true,
    deal: true,
    newArrival: true,
    createdAt: "2026-01-05T10:00:00Z",
  },
  {
    id: "prod-backpack",
    name: "Urban Travel Backpack",
    slug: "urban-travel-backpack",
    brand: "Nomad Atelier",
    category: "fashion",
    subcategory: "handbags",
    department: "fashion-lifestyle",
    price: 39.99,
    compareAtPrice: 49.99,
    displayPrice: "$39.99",
    displayCompareAt: "$49.99",
    discountBadge: "-20%",
    image: "/images/product-backpack.jpg",
    images: ["/images/product-backpack.jpg"],
    rating: 5,
    reviewCount: 1108,
    stock: 30,
    availability: "in_stock" as const,
    description: "Weatherproof 840D ballistic nylon travel backpack with dedicated 16-inch padded laptop vault and ergonomic lumbar support.",
    features: ["Waterproof 840D ballistic nylon", "16-inch padded laptop vault", "Luggage pass-through handle"],
    featured: true,
    deal: true,
    newArrival: false,
    createdAt: "2026-01-08T10:00:00Z",
  },
];

export function TopPicks() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (e: React.MouseEvent, p: typeof TOP_PICKS[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(p as unknown as StoreProduct, 1);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4 py-8 sm:py-10" aria-label="Top Picks">
      <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Top Picks For You
          </h2>
          <Sparkles className="text-amber-400 shrink-0" size={18} />
        </div>
        <Link
          href="/deals"
          className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-900 hover:text-[#0B3B2C] transition shrink-0"
        >
          <span>See All Deals</span>
          <ChevronRight size={15} />
        </Link>
      </div>

      <div className="relative">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {TOP_PICKS.map((p) => {
            const isAdded = addedId === p.id;
            return (
              <li
                key={p.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-3 sm:p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-gray-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              >
                <div>
                  {/* Image & Discount Badge */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#FAF9F6]">
                    <span className="absolute left-2 top-2 z-10 rounded-md bg-[#FEE2E2] px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-[#DC2626]">
                      {p.discountBadge}
                    </span>
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
                  <Link href={`/product/${p.slug}`} className="mt-2.5 sm:mt-3 block">
                    <h3 className="line-clamp-2 text-xs sm:text-sm font-medium text-gray-900 transition-colors group-hover:text-[#0B3B2C] min-h-[32px] sm:min-h-[38px] leading-snug">
                      {p.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="mt-1.5 flex items-center gap-1">
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium">
                      ({p.reviewCount.toLocaleString()})
                    </span>
                  </div>
                </div>

                {/* Price & Add to Cart button */}
                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5">
                  <div className="flex items-baseline gap-1.5 min-w-0">
                    <span className="text-sm sm:text-base font-bold text-[#DC2626] truncate">
                      {p.displayPrice}
                    </span>
                    <span className="text-xs text-gray-400 line-through truncate">
                      {p.displayCompareAt}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, p)}
                    aria-label={`Add ${p.name} to bag`}
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-200 active:scale-95 shadow-xs ${
                      isAdded
                        ? "bg-[#0B3B2C] text-[#E5C378]"
                        : "bg-[#0B3B2C] text-white hover:bg-[#07261C]"
                    }`}
                  >
                    {isAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Right Arrow Carousel Pill Button */}
        <Link
          href="/deals"
          aria-label="View more deals"
          className="hidden lg:grid absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 place-items-center rounded-full bg-white shadow-md border border-gray-200 text-gray-700 hover:text-[#0B3B2C] hover:scale-105 transition z-10"
        >
          <ChevronRight size={18} />
        </Link>
      </div>
    </section>
  );
}
