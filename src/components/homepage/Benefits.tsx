import { Truck, RotateCcw, Lock, Headset } from "lucide-react";
const b = [
  [Truck, "Complimentary Shipping", "On orders over ₹4,999"],
  [RotateCcw, "Easy Returns", "30-day return policy"],
  [Lock, "Secure Payments", "Encrypted checkout"],
  [Headset, "Concierge Support", "Here to help, 24/7"],
] as const;

export function Benefits() {
  return (
    <section className="mx-auto grid max-w-7xl gap-3 sm:gap-6 px-3 sm:px-4 py-6 sm:py-12 grid-cols-2 lg:grid-cols-4">
      {b.map(([I, t, d]) => (
        <div
          key={t}
          className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 p-3 sm:p-0 rounded-xl bg-white/60 border border-gold/15 sm:bg-transparent sm:border-0"
        >
          <I className="text-gold-dark shrink-0" size={24} strokeWidth={1.25} />
          <div>
            <p className="text-xs sm:text-sm font-semibold text-ink">{t}</p>
            <p className="text-[10px] sm:text-xs text-ink/60 mt-0.5">{d}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
