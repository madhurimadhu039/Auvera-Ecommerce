import { Truck, RotateCcw, Lock, Headset } from "lucide-react";
const b = [[Truck, "Complimentary Shipping", "On orders over ₹4,999"], [RotateCcw, "Easy Returns", "30-day return policy"], [Lock, "Secure Payments", "Encrypted checkout"], [Headset, "Concierge Support", "Here to help, 24/7"]] as const;
export function Benefits() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
      {b.map(([I, t, d]) => (
        <div key={t} className="flex items-center gap-4"><I className="text-gold-dark" size={30} strokeWidth={1.25} /><div><p className="text-sm font-medium">{t}</p><p className="text-xs text-ink/60">{d}</p></div></div>
      ))}
    </section>
  );
}
