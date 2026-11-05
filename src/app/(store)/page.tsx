import { Hero } from "@/components/homepage/Hero";
import { CategoryShortcuts } from "@/components/homepage/CategoryShortcuts";
import { TopPicks } from "@/components/homepage/TopPicks";
import { PromoBanners } from "@/components/homepage/PromoBanners";
import { Testimonials } from "@/components/homepage/Testimonials";
import { Newsletter } from "@/components/homepage/Newsletter";
import { Benefits } from "@/components/homepage/Benefits";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryShortcuts />
      <TopPicks />
      <PromoBanners />
      <Testimonials />
      <Newsletter />
      <Benefits />
      <Footer />
    </>
  );
}
