import Image from "next/image";
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Sarah J.",
    avatar: "/images/avatar-sarah.jpg",
    rating: 5,
    quote: "Amazing quality and fast delivery! Viva has become my go-to store for everything.",
  },
  {
    name: "Michael T.",
    avatar: "/images/avatar-michael.jpg",
    rating: 5,
    quote: "Great prices, excellent customer service, and super easy returns. Highly recommend!",
  },
  {
    name: "Priya K.",
    avatar: "/images/avatar-priya.jpg",
    rating: 5,
    quote: "I love the variety they offer. I can find everything in one place. So convenient!",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4 py-8 sm:py-12" aria-label="Customer Reviews">
      <div className="mb-6 sm:mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <span>Loved By Thousands</span>
          <span className="text-rose-400">🩷</span>
        </h2>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-800">
          <span>4.8/5 Average Rating</span>
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Left Arrow Pill */}
        <button
          aria-label="Previous reviews"
          className="hidden lg:grid absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 place-items-center rounded-full bg-white shadow-md border border-gray-200 text-gray-700 hover:text-[#0B3B2C] hover:scale-105 transition z-10"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all hover:border-gray-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gray-100 shrink-0">
                    <Image
                      src={r.avatar}
                      alt={r.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <figcaption className="text-sm font-bold text-gray-900">
                        {r.name}
                      </figcaption>
                      <CheckCircle2 size={15} className="text-emerald-600 fill-emerald-600/15" />
                    </div>
                    <div className="mt-0.5 flex text-amber-400">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="mt-4 text-xs sm:text-sm leading-relaxed text-gray-600 font-normal">
                  &lsquo;{r.quote}&rsquo;
                </blockquote>
              </div>
            </figure>
          ))}
        </div>

        {/* Right Arrow Pill */}
        <button
          aria-label="Next reviews"
          className="hidden lg:grid absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 place-items-center rounded-full bg-white shadow-md border border-gray-200 text-gray-700 hover:text-[#0B3B2C] hover:scale-105 transition z-10"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
