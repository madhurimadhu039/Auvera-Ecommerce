export const SITE = {
  name: "AUVERA",
  tagline: "THE ART OF EVERYDAY LUXURY.",
  slogan: "BEYOND ORDINARY.",
};
export const NAV = [
  { label: "Home", href: "/" }, { label: "Shop", href: "/products" }, { label: "Deals", href: "/deals" },
  { label: "New Arrivals", href: "/new-arrivals" }, { label: "Brands", href: "/brands" },
  { label: "Collections", href: "/collections" }, { label: "Track Order", href: "/track-order" },
];
export const CATEGORY_SHORTCUTS = [
  { slug: "electronics", label: "Electronics", icon: "Tv", bg: "bg-[#EBF3FC]", text: "text-[#1E40AF]", border: "border-[#BFDBFE]" },
  { slug: "fashion", label: "Fashion", icon: "Shirt", bg: "bg-[#FDF2F8]", text: "text-[#BE185D]", border: "border-[#FBCFE8]" },
  { slug: "home-living", label: "Home & Living", icon: "Home", bg: "bg-[#FFF7ED]", text: "text-[#C2410C]", border: "border-[#FED7AA]" },
  { slug: "beauty", label: "Beauty", icon: "Sparkles", bg: "bg-[#FAF5FF]", text: "text-[#7E22CE]", border: "border-[#E9D5FF]" },
  { slug: "sports", label: "Sports", icon: "Compass", bg: "bg-[#F0FDFA]", text: "text-[#0F766E]", border: "border-[#99F6E4]" },
  { slug: "toys-kids", label: "Toys & Kids", icon: "Gamepad2", bg: "bg-[#FFFBEB]", text: "text-[#B45309]", border: "border-[#FDE68A]" },
  { slug: "books", label: "Books", icon: "BookOpen", bg: "bg-[#F5F3FF]", text: "text-[#6D28D9]", border: "border-[#DDD6FE]" },
  { slug: "pet-supplies", label: "Pet Supplies", icon: "PawPrint", bg: "bg-[#FEF2F2]", text: "text-[#B91C1C]", border: "border-[#FECACA]" },
  { slug: "all", label: "View All", icon: "LayoutGrid", bg: "bg-[#F3F4F6]", text: "text-[#4B5563]", border: "border-[#E5E7EB]" },
];
/** Layout placeholders ONLY. Replace with Firestore `products` via src/services/products.ts. */
export const PLACEHOLDER_PICKS = [1, 2, 3, 4, 5].map((n) => ({ id: `p${n}`, title: `Sample product ${n}` }));
