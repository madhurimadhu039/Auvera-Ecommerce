"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Tag, Users } from "lucide-react";

const slides = [
  {
    eyebrow: "Summer Collection",
    title: "Elevate Your Everyday",
    body: "Discover quality products across every category — made for the way you live.",
    cta: "Shop Now",
    href: "/products",
    badge: "SUMMER SALE UP TO 40% OFF",
    image: "/images/hero-lifestyle.jpg",
  },
  {
    eyebrow: "Beauty & Skincare",
    title: "Rituals Worth Savouring",
    body: "Botanical skincare, fine fragrances and rejuvenating self-care essentials.",
    cta: "Explore Beauty",
    href: "/categories/beauty",
    badge: "NEW BOTANICALS",
    image: "/images/hero-botanicals.jpg",
  },
  {
    eyebrow: "Precision Audio & Tech",
    title: "Technology, Refined",
    body: "Studio-grade acoustics and wearable intelligence crafted for elegance.",
    cta: "Explore Electronics",
    href: "/categories/electronics",
    badge: "AUDIO ESSENTIALS",
    image: "/images/hero-tech.jpg",
  },
];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4 pt-3 sm:pt-4 pb-2" aria-label="Featured promotions">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F6F3ED] shadow-sm">
        {/* Ambient decorative lighting */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-emerald/5 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative grid items-center gap-6 sm:gap-8 px-4 py-6 sm:px-8 sm:py-10 md:grid-cols-2 md:px-12 lg:px-16">
          {/* Left Text Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <span className="inline-block rounded-full bg-gold/20 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold tracking-wider text-gold-dark uppercase">
                {s.eyebrow}
              </span>
              <h1 className="mt-2.5 sm:mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.15] text-emerald">
                {s.title}
              </h1>
              <p className="mt-2.5 sm:mt-4 max-w-md text-xs sm:text-sm md:text-base leading-relaxed text-ink/75">
                {s.body}
              </p>

              <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-semibold tracking-widest text-ivory uppercase shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg active:scale-95"
                >
                  {s.cta}
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-6 border-t border-gold/20 pt-4 sm:pt-6 text-[11px] sm:text-[12px] font-medium text-ink/70">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-emerald shrink-0" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag size={15} className="text-emerald shrink-0" />
                  <span>Great Prices</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={15} className="text-emerald shrink-0" />
                  <span>Trusted by 10K+ Customers</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Hero Image & Promo Badge */}
          <div className="relative flex h-[220px] sm:h-[320px] md:h-[400px] lg:h-[440px] w-full items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl"
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* Summer Sale Badge overlay */}
                <div className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-lg sm:rounded-xl border border-gold/40 bg-emerald/90 px-3 py-2 sm:px-4 sm:py-3 text-right backdrop-blur-md">
                  <p className="text-[9px] sm:text-[10px] font-bold tracking-widest text-gold uppercase">
                    {s.badge}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 sm:gap-2 md:left-16 md:translate-x-0">
          {slides.map((_, n) => (
            <button
              key={n}
              onClick={() => setI(n)}
              aria-label={`Slide ${n + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                n === i ? "w-8 bg-emerald" : "w-2 bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
