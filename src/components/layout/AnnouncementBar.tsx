import { RotateCcw, Lock } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-[#061E16] text-white/95">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 sm:gap-6 px-4 py-2 text-[11px] sm:text-xs font-medium">
        <span className="flex items-center gap-1.5">
          <span className="text-sm leading-none">🌿</span>
          <span>Free Shipping on Orders Over $49</span>
        </span>

        <span className="text-white/30 hidden sm:inline">|</span>

        <span className="hidden sm:flex items-center gap-1.5">
          <RotateCcw size={13} className="text-[#E5C378]" />
          <span>30-Day Easy Returns</span>
        </span>

        <span className="text-white/30 hidden md:inline">|</span>

        <span className="hidden md:flex items-center gap-1.5">
          <Lock size={13} className="text-[#E5C378]" />
          <span>Secure Payments</span>
        </span>
      </div>
    </div>
  );
}
