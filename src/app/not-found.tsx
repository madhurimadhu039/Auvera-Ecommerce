import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald/10 text-emerald">
        <Compass size={40} strokeWidth={1.5} />
      </div>
      <span className="mt-6 text-xs font-bold tracking-widest text-gold-dark uppercase">
        404 — Page Not Found
      </span>
      <h1 className="mt-2 font-serif text-4xl text-emerald sm:text-5xl">
        Avenue Not Discovered
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-ink/70">
        The boutique collection or page you are seeking could not be found. Allow us to guide you back to our curated departments.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3 text-xs font-semibold tracking-wider text-ivory uppercase transition hover:bg-emerald-700"
        >
          <ArrowLeft size={14} />
          <span>Return Home</span>
        </Link>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 rounded-full border border-emerald px-6 py-3 text-xs font-semibold tracking-wider text-emerald uppercase transition hover:bg-emerald hover:text-ivory"
        >
          <span>Browse All Categories</span>
        </Link>
      </div>
    </div>
  );
}

