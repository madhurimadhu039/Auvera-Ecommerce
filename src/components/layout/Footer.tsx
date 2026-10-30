import Link from "next/link";
import { SITE } from "@/constants/site";

const footerLinks = {
  Shop: [
    { label: "All Categories", href: "/categories" },
    { label: "All Products", href: "/products" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Deals & Offers", href: "/deals" },
    { label: "Collections", href: "/collections" },
  ],
  "Customer Care": [
    { label: "Track Order", href: "/account/orders" },
    { label: "Returns & Refunds", href: "#" },
    { label: "Shipping Info", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-emerald text-ivory/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Link href="/" className="font-serif text-3xl font-medium tracking-[0.25em] text-ivory">
            {SITE.name}
          </Link>
          <p className="mt-3 text-xs tracking-widest text-gold uppercase">{SITE.tagline}</p>
          <p className="mt-4 text-xs leading-relaxed text-ivory/60">
            Curated luxury across beauty, electronics, fashion, and home living. Crafted for the way you live.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h3 className="mb-4 text-xs font-semibold tracking-wider text-gold uppercase">
              {title}
            </h3>
            <ul className="space-y-2.5 text-xs">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-ivory/70 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gold/15 py-6 text-center text-[11px] tracking-wider text-ivory/50 uppercase">
        © {new Date().getFullYear()} {SITE.name} · {SITE.slogan}
      </div>
    </footer>
  );
}
