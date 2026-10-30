import { Truck, RotateCcw, Lock } from "lucide-react";

const items = [
  [Truck, "Free shipping on orders over ₹4,999"],
  [RotateCcw, "30-day easy returns"],
  [Lock, "100% secure checkout"],
] as const;

export function AnnouncementBar() {
  return (
    <div className="bg-emerald text-ivory">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2 text-[11px] font-medium tracking-wider uppercase sm:gap-10">
        {items.map(([I, t], i) => (
          <span key={i} className={`items-center gap-2 ${i ? "hidden sm:flex" : "flex"}`}>
            <I size={13} className="text-gold" />
            <span>{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
