import { type HomeFeature } from "@/domains/home/entities/HomePage";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/base/components/Card";

interface HomeFeaturesSectionProps {
  features: HomeFeature[];
}

export function HomeFeaturesSection({ features }: HomeFeaturesSectionProps) {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <span className="text-3xl" aria-hidden="true">
                {feature.icon}
              </span>
              <CardTitle className="mt-3">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>{feature.description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
