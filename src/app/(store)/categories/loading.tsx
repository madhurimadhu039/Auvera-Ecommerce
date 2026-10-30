export default function CategoriesLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-12">
      <div className="mx-auto mb-12 flex max-w-xl flex-col items-center">
        <div className="h-4 w-32 rounded bg-gold/20" />
        <div className="mt-3 h-10 w-64 rounded bg-emerald/20" />
        <div className="mt-4 h-4 w-96 rounded bg-ink/10" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-gold/10 bg-white">
            <div className="h-52 w-full bg-ink/5" />
            <div className="p-5">
              <div className="h-6 w-32 rounded bg-ink/10" />
              <div className="mt-3 h-4 w-full rounded bg-ink/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

