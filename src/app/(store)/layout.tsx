import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { StoreProvider } from "@/context/StoreProvider";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
    </StoreProvider>
  );
}
