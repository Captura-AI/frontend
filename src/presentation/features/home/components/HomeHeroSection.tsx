import Link from "next/link";
import { type HomeHero } from "@/domains/home/entities/HomePage";

interface HomeHeroSectionProps {
  hero: HomeHero;
}

export function HomeHeroSection({ hero }: HomeHeroSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
        {hero.headline}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
        {hero.subheadline}
      </p>
      <div className="mt-10">
        <Link
          href={hero.ctaHref}
          className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-6 text-base font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
        >
          {hero.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
