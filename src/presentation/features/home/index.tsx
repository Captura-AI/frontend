import { type HomePage } from "@/domains/home/entities/HomePage";
import { HomeHeroSection } from "./components/HomeHeroSection";
import { HomeFeaturesSection } from "./components/HomeFeaturesSection";

interface HomePageViewProps {
  content: HomePage;
}

export function HomePageView({ content }: HomePageViewProps) {
  return (
    <>
      <HomeHeroSection hero={content.hero} />
      <HomeFeaturesSection features={content.features} />
    </>
  );
}
