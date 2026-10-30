"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CATEGORY_SHORTCUTS } from "@/constants/site";
import { Icon } from "@/components/ui/Icon";

export function CategoryShortcuts() {
  const pathname = usePathname();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10" aria-label="Shop by category">
      <ul className="flex justify-between gap-4 overflow-x-auto pb-3 scrollbar-none sm:gap-6">
        {CATEGORY_SHORTCUTS.map((c, i) => {
          const href = c.slug === "all" ? "/categories" : `/categories/${c.slug}`;
          const isActive = pathname === href || pathname === `/category/${c.slug}`;

          return (
            <motion.li
              key={c.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="shrink-0"
            >
              <Link
                href={href}
                prefetch={true}
                className="group flex w-20 flex-col items-center gap-2.5 text-center sm:w-24"
              >
                <div
                  className={`grid h-16 w-16 place-items-center rounded-full border shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md sm:h-20 sm:w-20 ${
                    c.bg ?? "bg-ivory-dark"
                  } ${c.text ?? "text-emerald"} ${c.border ?? "border-gold/30"} ${
                    isActive ? "ring-2 ring-emerald ring-offset-2 scale-105" : ""
                  }`}
                >
                  <Icon name={c.icon} size={26} strokeWidth={1.5} />
                </div>
                <span
                  className={`text-[12px] transition-colors sm:text-[13px] ${
                    isActive
                      ? "font-bold text-emerald"
                      : "font-medium text-ink group-hover:text-emerald"
                  }`}
                >
                  {c.label}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
