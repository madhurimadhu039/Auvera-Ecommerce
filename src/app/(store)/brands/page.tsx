import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Featured Luxury Brands | AUVERA",
  description: "Explore the distinguished houses and artisan ateliers behind AUVERA.",
};

const brands = [
  { name: "AuraAcoustics", origin: "Stockholm, Sweden", category: "Electronics", desc: "Acoustic precision meets Scandinavian minimalism." },
  { name: "Atelier V", origin: "Paris, France", category: "Fashion", desc: "Heritage tailoring in European flax linen and organic silks." },
  { name: "Botaniq", origin: "Melbourne, Australia", category: "Beauty", desc: "Pure botanical actives and clean laboratory formulations." },
  { name: "BaristaCraft", origin: "Milan, Italy", category: "Home & Living", desc: "Espresso and pour-over equipment designed for connoisseurs." },
  { name: "Nomad Atelier", origin: "Tokyo, Japan", category: "Fashion", desc: "Technical travel goods engineered for the modern nomad." },
  { name: "Chronos Tech", origin: "Geneva, Switzerland", category: "Electronics", desc: "Grade-5 titanium smart horology and biometric sensors." },
  { name: "Maison Auvera", origin: "Grasse, France", category: "Fragrance & Leather", desc: "Fine artisanal perfumery and handcrafted leather goods." },
  { name: "Nordic Haven", origin: "Copenhagen, Denmark", category: "Home & Living", desc: "Architectural bouclé seating and sculptural home pieces." },
];

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <span className="text-xs font-semibold tracking-widest text-gold-dark uppercase">
          Artisans & Houses
        </span>
        <h1 className="mt-2 font-serif text-3xl text-emerald sm:text-5xl">Featured Brands</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/70">
          We partner with master craftspeople, heritage houses, and forward-thinking innovators who share our reverence for quality.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((b) => (
          <div
            key={b.name}
            className="flex flex-col justify-between rounded-2xl border border-gold/20 bg-white p-6 shadow-sm transition-all hover:border-gold hover:shadow-md"
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-gold-dark uppercase">
                {b.category}
              </span>
              <h2 className="mt-2 text-xl font-bold text-ink">{b.name}</h2>
              <p className="text-xs font-medium text-emerald">{b.origin}</p>
              <p className="mt-3 text-xs leading-relaxed text-ink/70">{b.desc}</p>
            </div>
            <Link
              href="/products"
              className="mt-6 flex items-center gap-1 text-xs font-semibold text-emerald hover:text-gold-dark"
            >
              <span>Explore Collection</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

