import { Truck, RotateCcw, Lock, Headphones } from "lucide-react";

const benefits = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over ₹999" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30 days return policy" },
  { icon: Lock, title: "Secure Payments", desc: "100% secure checkout" },
  { icon: Headphones, title: "24/7 Support", desc: "We're here to help" },
];

export function Benefits() {
  return (
    <section className="border-t border-gray-100 bg-white/50" aria-label="Store Guarantees">
      <div className="mx-auto grid max-w-7xl gap-4 sm:gap-6 px-4 py-8 sm:py-12 grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-3 sm:p-0"
          >
            <Icon className="text-gray-900 shrink-0" size={26} strokeWidth={1.5} />
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-900">{title}</p>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
