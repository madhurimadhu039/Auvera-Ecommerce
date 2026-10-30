import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/constants/catalogue";
import { Icon } from "@/components/ui/Icon";

export const metadata = {
  title: "All Categories",
  description: "Browse all luxury departments and product categories at AUVERA.",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="text-xs font-semibold tracking-widest text-gold-dark uppercase">
          Curated Departments
        </span>
        <h1 className="mt-2 font-serif text-4xl text-emerald sm:text-5xl">
          All Categories
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/70">
          Discover exceptional craftsmanship across beauty, electronics, fashion, and home living. Selected for those who expect more.
        </p>
      </div>

      {/* Categories Grid with Real Photography */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            prefetch={true}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-xl"
          >
            {/* Category Image Cover */}
            <div className="relative h-48 w-full overflow-hidden bg-ivory-dark sm:h-52">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Icon & Count Badges */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className={`grid h-9 w-9 place-items-center rounded-full ${cat.colorClass} shadow-md`}>
                  <Icon name={cat.icon} size={18} />
                </span>
                <span className="rounded-full bg-black/40 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-md">
                  {cat.itemCount} Items
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <h2 className="text-xl font-bold text-ink transition-colors group-hover:text-emerald">
                  {cat.name}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-ink/65">
                  {cat.description}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-emerald">
                <span>Explore {cat.name}</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

