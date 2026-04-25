import { seoConfig } from "@/shared/config/seo.config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">
          &copy; {year} {seoConfig.siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
