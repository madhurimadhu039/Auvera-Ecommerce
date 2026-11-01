import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory, CATEGORIES } from "@/constants/catalogue";
import { CategoryView } from "@/components/category/CategoryView";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ sub?: string; subcategory?: string }>;
}

export function generateStaticParams() {
  return [
    ...CATEGORIES.map((c) => ({ slug: c.slug })),
    { slug: "all" },
    { slug: "beauty-skincare" },
    { slug: "electronics-gadgets" },
    { slug: "fashion-lifestyle" },
  ];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found | AUVERA" };
  return {
    title: `${category.name} — Luxury Catalogue | AUVERA`,
    description: category.description,
  };
}

export default async function DedicatedCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sParams = await searchParams;
  const initialSubcategory = sParams?.sub || sParams?.subcategory;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(slug);

  return (
    <CategoryView
      category={category}
      initialProducts={products}
      initialSubcategory={initialSubcategory}
    />
  );
}

