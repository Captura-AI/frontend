"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { Header } from "./Header";

const standaloneRoutes = ["/checkout", "/dashboard"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = standaloneRoutes.some((route) => pathname.startsWith(route));

  if (isStandalone) return <main className="flex-1">{children}</main>;

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
