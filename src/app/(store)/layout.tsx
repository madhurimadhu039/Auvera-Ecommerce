import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (<><AnnouncementBar /><Header /><main>{children}</main><Footer /></>);
}
