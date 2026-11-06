"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  Heart,
  ChevronRight,
  SlidersHorizontal,
  Check,
  Sparkles,
  RotateCcw,
  X,
  Filter,
} from "lucide-react";
import type { StoreCategory, StoreProduct } from "@/constants/catalogue";
import type { Product } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/utils/currency";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

interface CategoryViewProps {
  category: StoreCategory;
  initialProducts: Product[];
  initialSubcategory?: string;
}

export function CategoryView({
  category,
  initialProducts,
  initialSubcategory = "all",
}: CategoryViewProps) {
  // Filter States
  const [activeSubcategory, setActiveSubcategory] = useState<string>(
    initialSubcategory || "all"
  );
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Global Cart & Wishlist context integration
  const { toggleWishlist: toggleWishlistContext, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [cartFeedback, setCartFeedback] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState<number>(60);
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  // Lock body scroll when mobile filter drawer is open
  useEffect(() => {
    if (showFiltersMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFiltersMobile]);

  // Extract unique brands for filter sidebar
  const brands = useMemo(() => {
    const bSet = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.brand) bSet.add(p.brand);
    });
    return Array.from(bSet).sort();
  }, [initialProducts]);

  // Wishlist toggle handler
  const handleToggleWishlist = useCallback(
    (product: Product, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlistContext(product as unknown as StoreProduct);
    },
    [toggleWishlistContext]
  );

  // Add to cart handler
  const handleAddToCart = useCallback(
    (product: Product, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(product as unknown as StoreProduct, 1);
      setCartFeedback((prev) => ({ ...prev, [product.id]: true }));
      setTimeout(() => {
        setCartFeedback((prev) => ({ ...prev, [product.id]: false }));
      }, 1800);
    },
    [addToCart]
  );

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeSubcategory !== "all") count++;
    if (selectedBrand !== "all") count++;
    if (priceRange !== "all") count++;
    if (onlyInStock) count++;
    return count;
  }, [activeSubcategory, selectedBrand, priceRange, onlyInStock]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Subcategory Filter
    if (activeSubcategory !== "all") {
      result = result.filter((p) => p.subcategory === activeSubcategory);
    }

    // Brand Filter
    if (selectedBrand !== "all") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Price Filter (Rupees)
    if (priceRange === "under-2000") {
      result = result.filter((p) => p.price < 2000);
    } else if (priceRange === "2000-5000") {
      result = result.filter((p) => p.price >= 2000 && p.price <= 5000);
    } else if (priceRange === "5000-10000") {
      result = result.filter((p) => p.price > 5000 && p.price <= 10000);
    } else if (priceRange === "over-10000") {
      result = result.filter((p) => p.price > 10000);
    }

    // In Stock Filter
    if (onlyInStock) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [
    initialProducts,
    activeSubcategory,
    selectedBrand,
    priceRange,
    onlyInStock,
    sortBy,
  ]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const resetFilters = () => {
    setActiveSubcategory("all");
    setSelectedBrand("all");
    setPriceRange("all");
    setOnlyInStock(false);
    setSortBy("featured");
  };

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-4 py-4 sm:py-8">
      {/* 1. Breadcrumb navigation */}
      <nav
        className="mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-ink/60 overflow-x-auto no-scrollbar whitespace-nowrap"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition hover:text-emerald shrink-0">
          Home
        </Link>
        <ChevronRight size={12} className="shrink-0" />
        <Link href="/categories" className="transition hover:text-emerald shrink-0">
          Categories
        </Link>
        <ChevronRight size={12} className="shrink-0" />
        <span className="font-semibold text-emerald truncate">{category.name}</span>
      </nav>

      {/* 2. Category-Specific Luxury Banner */}
      <div className="relative mb-6 sm:mb-10 overflow-hidden rounded-2xl sm:rounded-3xl bg-emerald text-ivory shadow-lg">
        <div className="relative z-10 flex flex-col justify-between p-5 sm:p-8 md:p-12 lg:max-w-xl">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span
              className={`grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full ${category.colorClass}`}
            >
              <Icon name={category.icon} size={18} />
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-gold uppercase">
              Boutique Collection
            </span>
          </div>
          <h1 className="mt-2.5 sm:mt-4 font-serif text-2xl sm:text-4xl md:text-5xl font-medium">
            {category.name}
          </h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-ivory/80 line-clamp-3 sm:line-clamp-none">
            {category.description}
          </p>
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-gold">
            <span className="font-semibold">{filteredProducts.length} Products Curated</span>
            <span>•</span>
            <span>Authentic Luxury</span>
          </div>
        </div>

        {/* Right side banner image */}
        <div className="absolute right-0 top-0 hidden h-full w-1/2 md:block">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="50vw"
            priority
            className="object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald via-emerald/60 to-transparent" />
        </div>
      </div>

      {/* 3. Category-Specific Subcategories Pills */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <div className="mb-2 sm:mb-3 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold tracking-wider text-ink/60 uppercase">
              Subcategories
            </span>
            {activeSubcategory !== "all" && (
              <button
                onClick={() => setActiveSubcategory("all")}
                className="text-[11px] sm:text-xs font-semibold text-emerald hover:underline"
              >
                Clear subcategory
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => {
                setActiveSubcategory("all");
                setVisibleCount(36);
              }}
              className={`shrink-0 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold transition ${
                activeSubcategory === "all"
                  ? "bg-emerald text-ivory shadow-sm"
                  : "border border-gold/30 bg-white text-ink/75 hover:border-gold hover:text-emerald"
              }`}
            >
              All {category.name}
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => {
                  setActiveSubcategory(sub.slug);
                  setVisibleCount(36);
                }}
                className={`shrink-0 whitespace-nowrap rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-medium transition ${
                  activeSubcategory === sub.slug
                    ? "bg-emerald text-ivory shadow-sm font-semibold"
                    : "border border-gold/20 bg-white text-ink/75 hover:border-gold hover:text-emerald"
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Layout: Filters Sidebar + Product Grid */}
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-4">
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden space-y-6 rounded-2xl border border-gold/20 bg-white p-6 shadow-sm lg:block">
          <div className="flex items-center justify-between border-b border-gold/15 pb-4">
            <div className="flex items-center gap-2 text-sm font-bold text-ink">
              <SlidersHorizontal size={16} className="text-emerald" />
              <span>Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-ink/50 transition hover:text-emerald"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>

          {/* Price Range Filter */}
          <div>
            <h2 className="mb-3 text-xs font-bold tracking-wider text-ink/70 uppercase">
              Price Range
            </h2>
            <div className="space-y-2 text-xs text-ink/80">
              {[
                { id: "all", label: "All Prices" },
                { id: "under-2000", label: "Under ₹2,000" },
                { id: "2000-5000", label: "₹2,000 – ₹5,000" },
                { id: "5000-10000", label: "₹5,000 – ₹10,000" },
                { id: "over-10000", label: "Over ₹10,000" },
              ].map((p) => (
                <label key={p.id} className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceRange === p.id}
                    onChange={() => setPriceRange(p.id)}
                    className="accent-emerald"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          {brands.length > 0 && (
            <div className="border-t border-gold/15 pt-5">
              <h2 className="mb-3 text-xs font-bold tracking-wider text-ink/70 uppercase">Brand</h2>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full rounded-lg border border-gold/30 bg-[#FAF8F5] p-2.5 text-xs text-ink outline-none focus:border-emerald"
              >
                <option value="all">All Brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Availability Filter */}
          <div className="border-t border-gold/15 pt-5">
            <h2 className="mb-3 text-xs font-bold tracking-wider text-ink/70 uppercase">
              Availability
            </h2>
            <label className="flex cursor-pointer items-center gap-2.5 text-xs text-ink/80">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded accent-emerald"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Right Section: Controls Bar + Product Grid */}
        <div className="lg:col-span-3">
          {/* Controls Bar: Count & Sorting */}
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gold/15 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-4">
              {/* Mobile Filter Button with Counter Badge */}
              <button
                onClick={() => setShowFiltersMobile(true)}
                className="flex items-center gap-1.5 rounded-lg border border-gold/40 bg-white px-3 py-2 text-xs font-semibold text-ink shadow-sm lg:hidden active:bg-gold/10"
              >
                <SlidersHorizontal size={14} className="text-emerald" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="ml-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald px-1 text-[9px] font-bold text-ivory">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <p className="text-xs font-medium text-ink/70">
                <span className="font-bold text-emerald">{filteredProducts.length}</span> items
              </p>
            </div>

            {/* Sorting Select */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] sm:text-xs text-ink/60">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gold/30 bg-white px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-ink shadow-sm outline-none transition focus:border-emerald"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>

          {/* 4. Product Grid */}
          {displayedProducts.length > 0 ? (
            <div>
              <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {displayedProducts.map((p) => {
                  const isWishlisted = isInWishlist(p.id);
                  const isCartAdded = Boolean(cartFeedback[p.id]);

                  return (
                    <li
                      key={p.id}
                      className="group relative flex flex-col justify-between rounded-xl border border-gold/15 bg-white p-2.5 sm:p-3.5 shadow-sm transition-all duration-300 hover:border-gold/50 hover:shadow-xl"
                    >
                      <div>
                        {/* 5. Product Image & Badges */}
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#FAF8F5]">
                          {/* Discount Badge */}
                          {p.discount && (
                            <span className="absolute left-1.5 top-1.5 sm:left-2.5 sm:top-2.5 z-10 rounded-md bg-[#FEE2E2] px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-[#DC2626]">
                              -{p.discount}%
                            </span>
                          )}

                          {/* Wishlist Button */}
                          <button
                            onClick={(e) => handleToggleWishlist(p, e)}
                            aria-label={`Save ${p.name} to wishlist`}
                            className={`absolute right-1.5 top-1.5 sm:right-2.5 sm:top-2.5 z-10 grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-white/90 shadow transition hover:scale-110 active:scale-95 ${
                              isWishlisted ? "text-rose-600" : "text-ink/40 hover:text-rose-600"
                            }`}
                          >
                            <Heart
                              size={13}
                              fill={isWishlisted ? "currentColor" : "none"}
                              strokeWidth={1.5}
                            />
                          </button>

                          <Link href={`/product/${p.slug}`} className="block h-full w-full">
                            <Image
                              src={p.images[0] || "/images/cat-fashion.jpg"}
                              alt={p.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </Link>
                        </div>

                        {/* Brand, Name, Availability */}
                        <div className="mt-2.5 sm:mt-3">
                          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-semibold text-gold-dark uppercase tracking-wider">
                            <span className="truncate max-w-[65%]">{p.brand}</span>
                            <span
                              className={`text-[8px] sm:text-[9px] font-bold uppercase shrink-0 ${
                                p.stock > 5 ? "text-emerald" : "text-amber-600"
                              }`}
                            >
                              {p.stock > 5 ? "In Stock" : `${p.stock} Left`}
                            </span>
                          </div>

                          {/* Product Name */}
                          <Link href={`/product/${p.slug}`} className="mt-1 block">
                            <h3 className="line-clamp-2 text-xs font-semibold text-ink transition-colors group-hover:text-emerald sm:text-sm min-h-[32px] sm:min-h-[40px]">
                              {p.name}
                            </h3>
                          </Link>

                          {/* Ratings and Review Counts */}
                          <div className="mt-1 flex items-center gap-1 text-amber-400">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={10}
                                  fill={i < p.rating ? "currentColor" : "none"}
                                  strokeWidth={0}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-ink/50">
                              ({p.reviewCount.toLocaleString()})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Prices & Add to Cart Button */}
                      <div className="mt-3 flex items-center justify-between border-t border-gold/10 pt-2.5">
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

                        {/* Add to Cart button */}
                        <button
                          onClick={(e) => handleAddToCart(p, e)}
                          aria-label={`Add ${p.name} to cart`}
                          className={`grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-full transition-all duration-200 active:scale-95 ${
                            isCartAdded
                              ? "bg-emerald text-gold scale-105"
                              : "bg-emerald text-white hover:bg-gold hover:text-emerald"
                          }`}
                        >
                          {isCartAdded ? <Check size={13} /> : <ShoppingBag size={13} />}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Pagination / Load More Button */}
              {hasMore && (
                <div className="mt-8 sm:mt-12 text-center">
                  <p className="mb-2 sm:mb-3 text-xs text-ink/60">
                    Showing {displayedProducts.length} of {filteredProducts.length} items
                  </p>
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald px-6 sm:px-8 py-2.5 sm:py-3 text-xs font-semibold tracking-wider text-emerald uppercase transition hover:bg-emerald hover:text-ivory shadow-sm active:scale-95"
                  >
                    <span>Load More Products</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Empty Filter State */
            <div className="rounded-2xl border border-dashed border-gold/30 bg-white p-8 sm:p-12 text-center shadow-sm">
              <Sparkles className="mx-auto text-gold" size={32} />
              <h3 className="mt-3 text-base font-semibold text-ink">No items match your filter</h3>
              <p className="mt-1 text-xs text-ink/60">
                Try resetting filters to discover all available pieces in {category.name}.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 rounded-full bg-emerald px-6 py-2.5 text-xs font-semibold text-ivory transition hover:bg-emerald-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Slide-Over Drawer Modal */}
      {showFiltersMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setShowFiltersMobile(false)}
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer from Right */}
          <div className="relative ml-auto flex h-full w-[85vw] max-w-md flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-gold/20 bg-ivory px-5 py-4">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald">
                <Filter size={16} />
                <span>Filters & Refinements</span>
              </div>
              <button
                onClick={() => setShowFiltersMobile(false)}
                aria-label="Close filters"
                className="grid h-8 w-8 place-items-center rounded-full text-ink/60 hover:bg-gold/10 hover:text-emerald"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Subcategories (if any) */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div>
                  <h3 className="mb-2.5 text-xs font-bold tracking-wider text-ink/70 uppercase">
                    Subcategory
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setActiveSubcategory("all")}
                      className={`rounded-full px-3 py-1.5 text-xs transition ${
                        activeSubcategory === "all"
                          ? "bg-emerald text-ivory font-semibold"
                          : "border border-gold/30 bg-[#FAF8F5] text-ink/80"
                      }`}
                    >
                      All
                    </button>
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub.slug}
                        onClick={() => setActiveSubcategory(sub.slug)}
                        className={`rounded-full px-3 py-1.5 text-xs transition ${
                          activeSubcategory === sub.slug
                            ? "bg-emerald text-ivory font-semibold"
                            : "border border-gold/30 bg-[#FAF8F5] text-ink/80"
                        }`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="border-t border-gold/15 pt-5">
                <h3 className="mb-3 text-xs font-bold tracking-wider text-ink/70 uppercase">
                  Price Range
                </h3>
                <div className="space-y-2 text-xs text-ink/80">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under-2000", label: "Under ₹2,000" },
                    { id: "2000-5000", label: "₹2,000 – ₹5,000" },
                    { id: "5000-10000", label: "₹5,000 – ₹10,000" },
                    { id: "over-10000", label: "Over ₹10,000" },
                  ].map((p) => (
                    <label key={p.id} className="flex cursor-pointer items-center gap-2.5 py-1">
                      <input
                        type="radio"
                        name="mobilePriceRange"
                        checked={priceRange === p.id}
                        onChange={() => setPriceRange(p.id)}
                        className="accent-emerald h-4 w-4"
                      />
                      <span className="font-medium">{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              {brands.length > 0 && (
                <div className="border-t border-gold/15 pt-5">
                  <h3 className="mb-2 text-xs font-bold tracking-wider text-ink/70 uppercase">
                    Brand
                  </h3>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full rounded-xl border border-gold/30 bg-[#FAF8F5] p-3 text-xs text-ink outline-none focus:border-emerald"
                  >
                    <option value="all">All Brands</option>
                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Availability Filter */}
              <div className="border-t border-gold/15 pt-5">
                <h3 className="mb-2 text-xs font-bold tracking-wider text-ink/70 uppercase">
                  Availability
                </h3>
                <label className="flex cursor-pointer items-center gap-2.5 text-xs text-ink/80 py-1">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded accent-emerald h-4 w-4"
                  />
                  <span className="font-medium">In Stock Only</span>
                </label>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="border-t border-gold/20 bg-ivory p-4 flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 rounded-full border border-gold/40 py-2.5 text-xs font-semibold text-ink/70 uppercase hover:text-emerald"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowFiltersMobile(false)}
                className="flex-1 rounded-full bg-emerald py-2.5 text-xs font-semibold text-ivory uppercase shadow-md hover:bg-emerald-700"
              >
                View ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
