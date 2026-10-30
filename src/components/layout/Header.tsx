"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { NAV, SITE } from "@/constants/site";
import { CATEGORIES } from "@/constants/catalogue";
import { Icon } from "@/components/ui/Icon";

const actions = [
  { I: User, l: "Account", h: "/login" },
  { I: Heart, l: "Wishlist", h: "/wishlist", badge: 3 },
  { I: ShoppingBag, l: "Cart", h: "/cart", badge: 2 },
];

export function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside only when open
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const isCategoriesActive =
    pathname === "/categories" || pathname.startsWith("/category");

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-ivory/95 backdrop-blur-md">
      {/* Top Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3.5">
        <Link
          href="/"
          prefetch={true}
          className="font-serif text-3xl font-medium tracking-[0.25em] text-emerald transition hover:opacity-90"
        >
          {SITE.name}
        </Link>

        {/* Global Search Bar */}
        <form
          action="/products"
          method="GET"
          className="relative mx-auto hidden max-w-xl flex-1 md:block"
          role="search"
        >
          <input
            name="q"
            aria-label="Search products"
            placeholder="Search products, brands and more…"
            className="w-full rounded-full border border-gold/40 bg-white/80 py-2.5 pl-5 pr-14 text-sm text-ink outline-none transition focus:border-emerald focus:ring-1 focus:ring-emerald"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-1 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-emerald text-gold transition hover:bg-emerald-700"
          >
            <Search size={15} />
          </button>
        </form>

        {/* User Actions */}
        <nav className="ml-auto flex items-center gap-6 text-emerald" aria-label="Account">
          {actions.map(({ I, l, h, badge }) => (
            <Link
              key={l}
              href={h}
              prefetch={true}
              className="group relative flex flex-col items-center text-[10px] uppercase tracking-widest transition hover:text-gold-dark"
            >
              <div className="relative">
                <I size={20} strokeWidth={1.5} />
                {Boolean(badge) && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald text-[9px] font-bold text-ivory">
                    {badge}
                  </span>
                )}
              </div>
              <span className="mt-1">{l}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Categories & Secondary Nav Row */}
      <div className="border-t border-gold/10">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-4 py-2 text-xs uppercase tracking-widest">
          {/* All Categories Button with Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <div className={`flex items-center rounded-md ${isCategoriesActive ? "ring-2 ring-gold" : ""}`}>
              <Link
                href="/categories"
                prefetch={true}
                className={`flex items-center gap-2 rounded-l-md px-4 py-2 text-ivory transition ${
                  isCategoriesActive ? "bg-emerald-800" : "bg-emerald hover:bg-emerald-700"
                }`}
              >
                <Menu size={14} />
                <span className="font-semibold">All Categories</span>
              </Link>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-expanded={dropdownOpen}
                aria-label="Toggle category menu"
                className="rounded-r-md border-l border-emerald-600 bg-emerald px-2 py-2 text-ivory transition hover:bg-emerald-700"
              >
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Interactive Dropdown Flyout */}
            {dropdownOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-gold/30 bg-white p-3 shadow-2xl animate-in fade-in slide-in-from-top-2">
                <div className="mb-2 px-3 py-1.5 text-[10px] font-bold tracking-widest text-ink/40 uppercase">
                  Departments & Categories
                </div>
                <ul className="space-y-1">
                  {CATEGORIES.map((c) => {
                    const isCatActive =
                      pathname === `/categories/${c.slug}` ||
                      pathname === `/category/${c.slug}`;
                    return (
                      <li key={c.slug}>
                        <Link
                          href={`/categories/${c.slug}`}
                          prefetch={true}
                          onClick={() => setDropdownOpen(false)}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs normal-case transition ${
                            isCatActive
                              ? "bg-emerald/10 font-bold text-emerald"
                              : "text-ink hover:bg-[#FAF8F5] hover:text-emerald"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`grid h-7 w-7 place-items-center rounded-full ${c.colorClass}`}>
                              <Icon name={c.icon} size={14} />
                            </span>
                            <span>{c.name}</span>
                          </div>
                          <span className="text-[10px] text-ink/40">{c.itemCount}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-3 border-t border-gold/15 pt-2">
                  <Link
                    href="/categories"
                    prefetch={true}
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full items-center justify-center rounded-lg bg-emerald/10 py-2 text-center text-[11px] font-semibold tracking-wider text-emerald uppercase transition hover:bg-emerald hover:text-ivory"
                  >
                    View All Categories →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Horizontal Nav Links with Prominent Active Highlighting */}
          <nav className="flex items-center gap-6 overflow-x-auto scrollbar-none py-1">
            {NAV.map((n) => {
              // Highlight "Shop" when on /products, /categories, or any /category/...
              const isShop =
                n.href === "/products" &&
                (pathname.startsWith("/products") ||
                  pathname.startsWith("/category") ||
                  pathname === "/categories");

              const isActive = (pathname === n.href && !isShop) || isShop;

              return (
                <Link
                  key={n.href}
                  href={n.href}
                  prefetch={true}
                  className={`group relative whitespace-nowrap py-1 transition-all ${
                    isActive
                      ? "font-bold text-emerald"
                      : "font-medium text-ink/75 hover:text-emerald"
                  }`}
                >
                  <span>{n.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-emerald shadow-sm transition-all" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
