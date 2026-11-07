export const SITE = {
  name: "AUVERA",
  tagline: "THE ART OF EVERYDAY LUXURY.",
  slogan: "BEYOND ORDINARY.",
};
export const NAV = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Deals", href: "/deals" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Brands", href: "/brands" },
  { label: "Inspiration", href: "/collections" },
  { label: "Track Order", href: "/track-order" },
];
export const CATEGORY_SHORTCUTS = [
  { slug: "electronics", label: "Electronics", icon: "Tv", bg: "bg-[#EBF3FC]", text: "text-[#2563EB]", border: "border-[#BFDBFE]" },
  { slug: "fashion", label: "Fashion", icon: "Shirt", bg: "bg-[#FDF2F8]", text: "text-[#DB2777]", border: "border-[#FBCFE8]" },
  { slug: "home-living", label: "Home & Living", icon: "Home", bg: "bg-[#FFF7ED]", text: "text-[#D97706]", border: "border-[#FED7AA]" },
  { slug: "beauty", label: "Beauty", icon: "FlaskConical", bg: "bg-[#FDF2F4]", text: "text-[#E11D48]", border: "border-[#FECDD3]" },
  { slug: "sports", label: "Sports", icon: "Compass", bg: "bg-[#F0FDFA]", text: "text-[#0D9488]", border: "border-[#99F6E4]" },
  { slug: "toys-kids", label: "Toys & Kids", icon: "Gamepad2", bg: "bg-[#FFFBEB]", text: "text-[#D97706]", border: "border-[#FDE68A]" },
  { slug: "books", label: "Books", icon: "BookOpen", bg: "bg-[#F5F3FF]", text: "text-[#7C3AED]", border: "border-[#DDD6FE]" },
  { slug: "pet-supplies", label: "Pet Supplies", icon: "PawPrint", bg: "bg-[#FAF0E6]", text: "text-[#8C6D52]", border: "border-[#E7D7C7]" },
  { slug: "all", label: "View All", icon: "Grid2x2", bg: "bg-[#F3F4F6]", text: "text-[#4B5563]", border: "border-[#E5E7EB]" },
];
/** Layout placeholders ONLY. Replace with Firestore `products` via src/services/products.ts. */
export const PLACEHOLDER_PICKS = [1, 2, 3, 4, 5].map((n) => ({ id: `p${n}`, title: `Sample product ${n}` }));
