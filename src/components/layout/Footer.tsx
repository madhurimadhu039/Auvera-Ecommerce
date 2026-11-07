import Link from "next/link";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { SITE } from "@/constants/site";

export function Footer() {
  return (
    <footer className="bg-[#072118] text-white/80 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-12 lg:gap-8">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="md:col-span-4 lg:col-span-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition hover:opacity-90"
            >
              <div className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/20 bg-white/10 text-white">
                <ShoppingBag size={20} strokeWidth={1.75} />
                <span className="absolute bottom-1 right-1 text-[8px] leading-none">🍃</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-[0.12em] text-white leading-none">
                  {SITE.name}
                </span>
                <span className="text-[8.5px] font-semibold tracking-[0.22em] text-white/70 mt-1 uppercase">
                  LIVE BETTER
                </span>
              </div>
            </Link>

            <p className="mt-4 text-xs leading-relaxed text-white/60 max-w-xs">
              Your one-stop shop for quality products across every category. Live better with Viva.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { name: "Facebook", icon: "f", href: "https://facebook.com" },
                { name: "Instagram", icon: "📷", href: "https://instagram.com" },
                { name: "Twitter", icon: "𝕏", href: "https://twitter.com" },
                { name: "YouTube", icon: "▶", href: "https://youtube.com" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-xs font-bold text-white/80 transition hover:border-white hover:text-white hover:bg-white/10"
                >
                  <span>{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Shop (2 cols) */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/categories" className="hover:text-white transition">All Categories</Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-white transition">New Arrivals</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">Best Sellers</Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-white transition">Deals</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">Gift Cards</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service (2 cols) */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/track-order" className="hover:text-white transition">Track Order</Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition">Returns & Refunds</Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition">Shipping Info</Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition">FAQ</Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company (2 cols) */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/brands" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition">Careers</Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition">Blog</Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition">Affiliate Program</Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition">Sustainability</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Download Our App (3 cols) */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase mb-4">
              Download Our App
            </h3>
            <p className="text-xs text-white/60 mb-4 leading-relaxed">
              Shop on the go with our mobile app.
            </p>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5">
              {/* App Store button */}
              <a
                href="https://apple.com/app-store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-white/20 bg-black/40 px-3.5 py-2 text-left text-white transition hover:bg-black/70 hover:border-white/40"
              >
                <span className="text-xl"></span>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-white/60 leading-none">Download on the</span>
                  <span className="block text-xs font-semibold leading-tight mt-0.5">App Store</span>
                </div>
              </a>

              {/* Google Play button */}
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-white/20 bg-black/40 px-3.5 py-2 text-left text-white transition hover:bg-black/70 hover:border-white/40"
              >
                <span className="text-lg">▶</span>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-white/60 leading-none">GET IT ON</span>
                  <span className="block text-xs font-semibold leading-tight mt-0.5">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal, Country Selector */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © 2024 Viva. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-[11px] sm:text-xs">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link>
          </div>

          {/* Country Selector */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 hover:border-white/40 transition"
          >
            <span>🇺🇸</span>
            <span>United States</span>
            <ChevronDown size={12} className="text-white/60" />
          </button>
        </div>
      </div>
    </footer>
  );
}
