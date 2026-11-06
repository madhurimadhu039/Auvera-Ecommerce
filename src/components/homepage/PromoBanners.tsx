import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const banners = [
  {
    tag: "New Arrivals",
    title: "Fresh Styles Just In",
    href: "/categories/fashion",
    bg: "bg-[#EAF2ED]",
    image: "/images/banner-handbag.jpg",
    alt: "Luxury Emerald Leather Handbag",
  },
  {
    tag: "Home Refresh",
    title: "Make Your Space Better",
    href: "/categories/home-living",
    bg: "bg-[#F7F3EC]",
    image: "/images/banner-armchair.jpg",
    alt: "Scandinavian Bouclé Armchair",
  },
  {
    tag: "Tech Essentials",
    title: "Upgrade Your Lifestyle",
    href: "/categories/electronics",
    bg: "bg-[#EBF1F6]",
    image: "/images/banner-smartwatch.jpg",
    alt: "AMOLED Precision Smartwatch",
  },
];

export function PromoBanners() {
  return (
    <section className="mx-auto grid max-w-7xl gap-3 sm:gap-5 px-3 sm:px-4 py-6 sm:py-8 grid-cols-1 md:grid-cols-3">
      {banners.map((b) => (
        <Link
          key={b.title}
          href={b.href}
          prefetch={true}
          className={`group relative flex min-h-[150px] sm:min-h-[180px] items-center justify-between overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg ${b.bg}`}
        >
          <div className="z-10 flex max-w-[58%] flex-col justify-between">
            <div>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-ink/60">
                {b.tag}
              </span>
              <h3 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold leading-tight text-ink">
                {b.title}
              </h3>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center gap-1.5 text-xs font-semibold text-ink group-hover:text-emerald">
              <span>Shop Now</span>
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>

          <div className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={b.image}
              alt={b.alt}
              fill
              sizes="(max-width: 768px) 110px, 140px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
      ))}
    </section>
  );
}
