import { type HomePage } from "@/domains/home/entities/HomePage";
import { HomeHeroSection } from "./components/HomeHeroSection";
import { HomeSearchSection } from "./components/HomeSearchSection";
import { HomeStoriesSection } from "./components/HomeStoriesSection";
import { HomePhotographersSection } from "./components/HomePhotographersSection";
import { HomeCtaSection } from "./components/HomeCtaSection";

interface HomePageViewProps {
  content: HomePage;
}

export function HomePageView({ content }: HomePageViewProps) {
  return (
    <>
      <HomeHeroSection hero={content.hero} />
      <HomeSearchSection data={content.search} />
      <HomeStoriesSection data={content.stories} />
      <HomePhotographersSection data={content.photographers} />
      <HomeCtaSection cta={content.cta} />
    </>
  );
}
