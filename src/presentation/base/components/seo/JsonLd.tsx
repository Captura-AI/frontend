import { type JsonLdData } from "@/domains/seo/entities/SeoMeta";

interface JsonLdProps {
  data: JsonLdData | JsonLdData[];
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonString = JSON.stringify(Array.isArray(data) ? data : [data]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
