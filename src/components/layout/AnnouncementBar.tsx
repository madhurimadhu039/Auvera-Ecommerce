import { Package, RotateCcw, Lock } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-[#061E16] text-white/90">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 sm:gap-6 px-4 py-2 text-[11px] sm:text-xs font-medium tracking-wide">
        <span className="flex items-center gap-2">
          <Package size={14} className="text-[#E5C378]" />
          <span>Free Shipping on Orders Over ₹999</span>
        </span>

        <span className="text-white/30 hidden sm:inline">|</span>

        <span className="hidden sm:flex items-center gap-2">
          <RotateCcw size={14} className="text-[#E5C378]" />
          <span>30-Day Easy Returns</span>
        </span>

        <span className="text-white/30 hidden md:inline">|</span>

        <span className="hidden md:flex items-center gap-2">
          <Lock size={14} className="text-[#E5C378]" />
          <span>Secure Payments</span>
        </span>
      </div>
    </div>
  );
}
