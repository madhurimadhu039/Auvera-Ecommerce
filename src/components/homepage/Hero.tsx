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

  const s = slides[i];

  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4 pt-3 sm:pt-5 pb-2" aria-label="Featured promotions">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#EFE9E1] border border-[#E3DBD0] shadow-sm">
        {/* Subtle ambient lighting */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#0B3B2C]/5 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#E5C378]/15 blur-3xl" />

        <div className="relative grid items-center gap-6 sm:gap-8 px-5 py-8 sm:px-10 sm:py-12 md:grid-cols-2 md:px-12 lg:px-16">
          {/* Left Text Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.45 }}
              className="max-w-xl"
            >
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] text-[#112F24] tracking-tight">
                {s.title}
              </h1>
              <p className="mt-3.5 sm:mt-4 max-w-md text-xs sm:text-sm md:text-base leading-relaxed text-[#44524C]">
                {s.body}
              </p>

              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0B3B2C] px-7 py-3.5 text-xs font-semibold tracking-wider text-white hover:bg-[#07261C] transition-all shadow-md active:scale-95"
                >
                  <span>{s.cta}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-[#DFD6C9] pt-5 sm:pt-6 text-[11px] sm:text-xs font-medium text-[#44524C]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#0B3B2C] shrink-0" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag size={16} className="text-[#0B3B2C] shrink-0" />
                  <span>Great Prices</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={16} className="text-[#0B3B2C] shrink-0" />
                  <span>Trusted by 10k+ Customers</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Hero Image & Summer Sale Badge */}
          <div className="relative flex h-[240px] sm:h-[340px] md:h-[420px] lg:h-[450px] w-full items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5 }}
                className="relative h-full w-full overflow-hidden rounded-2xl shadow-md sm:shadow-lg"
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
                <div className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 rounded-xl bg-[#0B3B2C] px-3.5 py-3 text-center text-white shadow-xl">
                  <span className="block text-[9px] font-bold tracking-widest text-[#E5C378] uppercase">SUMMER</span>
                  <span className="block font-serif text-base sm:text-lg font-bold leading-none text-white uppercase">SALE</span>
                  <span className="my-0.5 block text-[8px] font-semibold tracking-wider text-white/80 uppercase">UP TO</span>
                  <span className="block font-serif text-xl sm:text-2xl font-bold leading-none text-[#E5C378]">40%</span>
                  <span className="block text-[8px] font-bold tracking-widest text-white/80 uppercase">OFF</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel indicators - centered */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 sm:gap-2">
          {slides.map((_, n) => (
            <button
              key={n}
              onClick={() => setI(n)}
              aria-label={`Slide ${n + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                n === i ? "w-6 sm:w-8 bg-[#0B3B2C]" : "w-2 bg-black/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
