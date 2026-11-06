"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  ChevronDown,
  ChevronRight,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { NAV, SITE } from "@/constants/site";
import { CATEGORIES } from "@/constants/catalogue";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  // Desktop categories dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mobile drawer & search state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close desktop dropdown on outside click
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

  const actions = [
    {
      I: User,
      l: isAuthenticated && user ? user.firstName : "Account",
      h: "/account",
      badge: 0,
      active: pathname.startsWith("/account") || pathname === "/login",
      mobileHide: false,
    },
    {
      I: Heart,
      l: "Wishlist",
      h: "/wishlist",
      badge: wishlistCount,
      active: pathname === "/wishlist",
      mobileHide: false,
    },
    {
      I: ShoppingBag,
      l: "Cart",
      h: "/cart",
      badge: cartCount,
      active: pathname === "/cart",
      mobileHide: false,
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-ivory/95 backdrop-blur-md">
      {/* Top Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:py-3.5">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-emerald hover:bg-emerald/10 transition md:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Brand Logo */}
        <Link
          href="/"
          prefetch={true}
          className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.2em] sm:tracking-[0.25em] text-emerald transition hover:opacity-90"
        >
          {SITE.name}
        </Link>

        {/* Global Desktop Search Bar */}
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
        <div className="flex items-center gap-3 sm:gap-6 text-emerald">
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            aria-label="Toggle search"
            className="grid h-10 w-10 place-items-center rounded-lg text-emerald transition hover:bg-emerald/10 md:hidden"
          >
            <Search size={20} />
          </button>

          {/* Action Links */}
          <nav className="flex items-center gap-3 sm:gap-6" aria-label="Account">
            {actions.map(({ I, l, h, badge, active }) => (
              <Link
                key={h}
                href={h}
                prefetch={true}
                className={`group relative flex flex-col items-center p-1 text-[10px] uppercase tracking-widest transition ${
                  active ? "font-bold text-gold-dark" : "hover:text-gold-dark"
                }`}
              >
                <div className="relative">
                  <I size={21} strokeWidth={active ? 2 : 1.5} />
                  {Boolean(badge && badge > 0) && (
                    <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald px-1 text-[9px] font-bold text-ivory shadow-sm animate-in zoom-in-50 duration-200">
                      {badge > 99 ? "99+" : badge}
                    </span>
                  )}
                </div>
                <span className="mt-1 hidden sm:inline">{l}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Collapsible Search Drawer */}
      {mobileSearchOpen && (
        <div className="border-t border-gold/15 bg-white p-3 shadow-md md:hidden animate-in fade-in slide-in-from-top-2">
          <form action="/products" method="GET" className="relative flex items-center">
            <input
              name="q"
              autoFocus
              aria-label="Search products"
              placeholder="Search products, brands and more…"
              className="w-full rounded-full border border-gold/40 bg-[#FAF8F5] py-2.5 pl-4 pr-12 text-xs text-ink outline-none focus:border-emerald"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-emerald text-gold"
            >
              <Search size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Desktop Secondary Categories & Nav Row */}
      <div className="border-t border-gold/10 hidden md:block">
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
          <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1">
            {NAV.map((n) => {
              const isShop =
                n.href === "/products" &&
                (pathname.startsWith("/products") ||
                  pathname.startsWith("/category") ||
                  pathname === "/categories");

              const isTrackOrder =
                n.href === "/track-order" &&
                (pathname === "/track-order" || pathname.startsWith("/account/orders"));

              const isActive = (pathname === n.href && !isShop) || isShop || isTrackOrder;

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

      {/* Mobile Off-Canvas Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative flex w-[85vw] max-w-sm flex-col bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-gold/15 bg-ivory px-5 py-4">
              <div>
                <Link
                  href="/"
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl font-medium tracking-[0.2em] text-emerald"
                >
                  {SITE.name}
                </Link>
                <p className="text-[10px] tracking-widest text-gold uppercase">{SITE.tagline}</p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-full text-ink/60 hover:bg-gold/10 hover:text-emerald transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Search */}
            <div className="border-b border-gold/15 p-4 bg-[#FAF8F5]">
              <form action="/products" method="GET" className="relative flex items-center">
                <input
                  name="q"
                  placeholder="Search products & categories…"
                  className="w-full rounded-full border border-gold/40 bg-white py-2 pl-4 pr-10 text-xs text-ink outline-none focus:border-emerald"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-1 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-emerald text-gold"
                >
                  <Search size={13} />
                </button>
              </form>
            </div>

            {/* Scrollable Navigation Sections */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
              {/* Primary Links */}
              <div>
                <div className="mb-2 px-2 text-[10px] font-bold tracking-widest text-ink/40 uppercase">
                  Explore Auvera
                </div>
                <ul className="space-y-1">
                  {NAV.map((n) => {
                    const isActive = pathname === n.href;
                    return (
                      <li key={n.href}>
                        <Link
                          href={n.href}
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                            isActive
                              ? "bg-emerald text-ivory shadow-sm"
                              : "text-ink/80 hover:bg-ivory hover:text-emerald"
                          }`}
                        >
                          <span>{n.label}</span>
                          <ChevronRight size={14} className={isActive ? "text-gold" : "text-ink/30"} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Categories Accordion */}
              <div>
                <div className="mb-2 flex items-center justify-between px-2 text-[10px] font-bold tracking-widest text-ink/40 uppercase">
                  <span>Boutique Categories</span>
                  <Link
                    href="/categories"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-emerald hover:underline font-semibold"
                  >
                    View All →
                  </Link>
                </div>
                <ul className="space-y-1.5">
                  {CATEGORIES.map((c) => {
                    const isExpanded = expandedCategory === c.slug;
                    const isCatActive = pathname === `/categories/${c.slug}`;

                    return (
                      <li key={c.slug} className="rounded-xl border border-gold/15 bg-[#FAF8F5]/60 overflow-hidden">
                        <div className="flex items-center justify-between p-2">
                          <Link
                            href={`/categories/${c.slug}`}
                            prefetch={true}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 flex-1"
                          >
                            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${c.colorClass}`}>
                              <Icon name={c.icon} size={15} />
                            </span>
                            <span className={`text-xs font-semibold ${isCatActive ? "text-emerald" : "text-ink"}`}>
                              {c.name}
                            </span>
                          </Link>
                          {c.subcategories && c.subcategories.length > 0 && (
                            <button
                              onClick={() => setExpandedCategory(isExpanded ? null : c.slug)}
                              aria-label={`Toggle subcategories for ${c.name}`}
                              className="p-2 text-ink/40 hover:text-emerald"
                            >
                              <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-emerald" : ""}`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Subcategories Accordion Content */}
                        {isExpanded && c.subcategories && (
                          <div className="border-t border-gold/15 bg-white px-3 py-2 animate-in fade-in duration-150">
                            <ul className="space-y-1 pl-8 border-l-2 border-emerald/20 ml-2">
                              <li>
                                <Link
                                  href={`/categories/${c.slug}`}
                                  prefetch={true}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-1 text-xs font-semibold text-emerald"
                                >
                                  All {c.name} ({c.itemCount})
                                </Link>
                              </li>
                              {c.subcategories.map((sub) => (
                                <li key={sub.slug}>
                                  <Link
                                    href={`/categories/${c.slug}?sub=${sub.slug}`}
                                    prefetch={true}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-1 text-xs text-ink/75 hover:text-emerald"
                                  >
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Account & Orders Section */}
              <div className="border-t border-gold/15 pt-4">
                <div className="mb-2 px-2 text-[10px] font-bold tracking-widest text-ink/40 uppercase">
                  Your Patron Account
                </div>
                <div className="space-y-2">
                  <Link
                    href="/account"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-gold/20 bg-ivory p-3 text-xs font-semibold text-emerald"
                  >
                    <div className="flex items-center gap-3">
                      <User size={16} />
                      <span>{isAuthenticated && user ? `Hello, ${user.firstName}` : "Sign In to Account"}</span>
                    </div>
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    href="/track-order"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-gold/20 bg-white p-3 text-xs font-medium text-ink hover:text-emerald"
                  >
                    <span>Track Active Consignment</span>
                    <ChevronRight size={14} className="text-ink/40" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-gold/15 bg-emerald p-4 text-center text-ivory">
              <p className="text-[11px] font-semibold tracking-wider uppercase text-gold">Auvera Concierge</p>
              <p className="mt-0.5 text-[10px] text-ivory/70">Complimentary 24/7 Priority Support</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
