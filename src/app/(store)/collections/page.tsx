import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/constants/catalogue";

export const metadata = {
  title: "Seasonal Collections & Inspiration | AUVERA",
  description: "Immerse yourself in editorial looks, seasonal capsule edits, and aesthetic inspiration.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <span className="text-xs font-semibold tracking-widest text-gold-dark uppercase">
          Curated Edits
        </span>
        <h1 className="mt-2 font-serif text-3xl text-emerald sm:text-5xl">Collections & Inspiration</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/70">
          Thematic edits designed to seamlessly harmonize beauty, design, and daily ritual.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="group relative min-h-[320px] overflow-hidden rounded-3xl bg-emerald p-8 text-ivory">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <span className="text-xs font-bold tracking-widest text-gold uppercase">Capsule 01</span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl">The Summer Solstice</h2>
              <p className="mt-3 max-w-sm text-sm text-ivory/80">
                Lightweight French linens, restorative sun skincare, and portable acoustics.
              </p>
            </div>
            <Link href="/products" className="btn-gold mt-6 inline-flex max-w-max items-center gap-2">
              <span>View Solstice Edit</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-40">
            <Image src="/images/hero-lifestyle.jpg" alt="Summer Solstice" fill className="object-cover" />
          </div>
        </div>

        <div className="group relative min-h-[320px] overflow-hidden rounded-3xl bg-[#EAF2ED] p-8 text-ink">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <span className="text-xs font-bold tracking-widest text-emerald uppercase">Capsule 02</span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Sanctuary At Home</h2>
              <p className="mt-3 max-w-sm text-sm text-ink/70">
                Handcrafted ceramic vessels, sculptural bouclé armchairs, and warm ambient lighting.
              </p>
            </div>
            <Link href="/categories/home-living" prefetch={true} className="btn-gold mt-6 inline-flex max-w-max items-center gap-2">
              <span>Explore Sanctuary</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-30">
            <Image src="/images/banner-armchair.jpg" alt="Home Sanctuary" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

