import Image from "next/image";
import { Star, CheckCircle2 } from "lucide-react";

const reviews = [
  {
    name: "Sarah J.",
    avatar: "/images/avatar-sarah.jpg",
    rating: 5,
    quote: "Amazing quality and fast delivery! Auvera has become my go-to store for everything.",
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
    <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Customer Reviews">
      <div className="mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Loved By Thousands <span className="text-rose-500">❤</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-ink">4.8/5 Average Rating</span>
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="flex flex-col justify-between rounded-2xl border border-gold/15 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all hover:border-gold/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold/20">
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
                    <figcaption className="text-sm font-semibold text-ink">
                      {r.name}
                    </figcaption>
                    <CheckCircle2 size={14} className="text-emerald fill-emerald/15" />
                  </div>
                  <div className="mt-0.5 flex text-amber-400">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="mt-4 text-sm leading-relaxed text-ink/75">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
