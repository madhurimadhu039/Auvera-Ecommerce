import { db, isFirebaseConfigured } from "@/firebase/client";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import {
  PRODUCTS,
  getCategoryBySlug,
  type StoreProduct,
} from "@/constants/catalogue";
import type { Product } from "@/types";

export interface ProductQueryFilters {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  availability?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "rating" | "reviews";
  page?: number;
  pageSize?: number;
}

export interface PaginatedProductsResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
  availableSubcategories: { slug: string; name: string }[];
  availableBrands: string[];
}

// In-memory cache to eliminate repeat requests and provide instant response
const queryCache = new Map<
  string,
  { data: PaginatedProductsResult; timestamp: number }
>();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export async function getCategoryProducts(
  filters: ProductQueryFilters
): Promise<PaginatedProductsResult> {
  const cacheKey = JSON.stringify(filters);
  const now = Date.now();

  const cached = queryCache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  let list: Product[] = [];

  // Attempt Firestore query if configured
  if (isFirebaseConfigured && filters.category && filters.category !== "all") {
    try {
      const colRef = collection(db, "products");
      let q = query(colRef, where("category", "==", filters.category), limit(40));
      const snap = await Promise.race([
        getDocs(q),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Firestore timeout")), 1800)
        ),
      ]);

      if (!snap.empty) {
        list = snap.docs.map((d) => {
          const data = d.data() as Omit<Product, "id">;
          return {
            id: d.id,
            ...data,
            image: data.image ?? (data.images?.[0] || "/images/cat-fashion.jpg"),
          };
        });
      }
    } catch {
      // Gracefully fall back to local seed data
      list = [];
    }
  }

  // Fallback to catalogue database
  if (list.length === 0) {
    if (!filters.category || filters.category === "all") {
      list = [...PRODUCTS];
    } else {
      const cat = getCategoryBySlug(filters.category);
      list = cat ? PRODUCTS.filter((p) => p.category === cat.slug) : [];
    }
  }

  // Collect available subcategories and brands for dynamic filter controls
  const subcategorySet = new Map<string, string>();
  const brandSet = new Set<string>();

  list.forEach((p) => {
    if (p.subcategory) {
      subcategorySet.set(p.subcategory, p.subcategory.replace("-", " "));
    }
    if (p.brand) {
      brandSet.add(p.brand);
    }
  });

  // Apply Subcategory filter
  if (filters.subcategory && filters.subcategory !== "all") {
    list = list.filter((p) => p.subcategory === filters.subcategory);
  }

  // Apply Brand filter
  if (filters.brand && filters.brand !== "all") {
    list = list.filter((p) => p.brand === filters.brand);
  }

  // Apply Price filters
  if (filters.minPrice !== undefined) {
    list = list.filter((p) => p.price >= (filters.minPrice ?? 0));
  }
  if (filters.maxPrice !== undefined) {
    list = list.filter((p) => p.price <= (filters.maxPrice ?? Infinity));
  }

  // Apply Availability filter
  if (filters.availability && filters.availability !== "all") {
    if (filters.availability === "in_stock") {
      list = list.filter((p) => p.stock > 0);
    }
  }

  // Apply Sorting
  switch (filters.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "reviews":
      list.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "featured":
    default:
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  // Pagination
  const total = list.length;
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.max(1, filters.pageSize ?? 8);
  const totalPages = Math.ceil(total / pageSize) || 1;
  const offset = (page - 1) * pageSize;
  const paginated = list.slice(offset, offset + pageSize);

  const result: PaginatedProductsResult = {
    products: paginated,
    total,
    page,
    totalPages,
    hasMore: page < totalPages,
    availableSubcategories: Array.from(subcategorySet.entries()).map(([slug, name]) => ({
      slug,
      name,
    })),
    availableBrands: Array.from(brandSet),
  };

  queryCache.set(cacheKey, { data: result, timestamp: now });
  return result;
}
