export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 h-4 w-48 rounded bg-ink/10" />

      {/* Hero banner skeleton */}
      <div className="mb-10 h-64 w-full rounded-3xl bg-emerald/15" />

      {/* Subcategory pills skeleton */}
      <div className="mb-8 flex gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 w-24 rounded-full bg-ink/10" />
        ))}
      </div>

      {/* Product cards skeleton grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gold/10 bg-white p-4">
            <div className="aspect-square w-full rounded-lg bg-ink/5" />
            <div className="mt-3 h-3 w-16 rounded bg-ink/10" />
            <div className="mt-2 h-4 w-3/4 rounded bg-ink/10" />
            <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3">
              <div className="h-5 w-14 rounded bg-ink/10" />
              <div className="h-8 w-8 rounded-full bg-ink/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

