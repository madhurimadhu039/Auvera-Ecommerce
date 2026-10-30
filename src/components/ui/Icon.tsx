import {
  Tv,
  Shirt,
  Home,
  Sparkles,
  Compass,
  Gamepad2,
  BookOpen,
  PawPrint,
  LayoutGrid,
  Circle,
  Droplet,
  Brush,
  FlaskConical,
  Smartphone,
  Headphones,
  Watch,
  ShoppingBag,
  Footprints,
  Grid2x2,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Tv,
  Shirt,
  Home,
  Sparkles,
  Compass,
  Gamepad2,
  BookOpen,
  PawPrint,
  LayoutGrid,
  Circle,
  Droplet,
  Brush,
  FlaskConical,
  Smartphone,
  Headphones,
  Watch,
  ShoppingBag,
  Footprints,
  Grid2x2,
};

export function Icon({ name, ...p }: { name: string } & LucideProps) {
  const C = ICON_MAP[name] ?? Circle;
  return <C strokeWidth={1.25} {...p} />;
}
