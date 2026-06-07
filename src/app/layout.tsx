import { type Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { AppShell } from "@/presentation/base/layout/AppShell";
import { seoConfig } from "@/shared/config/seo.config";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-captura-serif",
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-captura-sans",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-captura-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.baseUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    siteName: seoConfig.siteName,
    images: [seoConfig.defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    site: seoConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="flex min-h-screen flex-col bg-bg text-ink antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
