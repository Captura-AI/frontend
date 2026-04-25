import { type SeoBuilderInput } from "@/domains/seo";

/**
 * Contract for fetching SEO data from external sources (CMS, API, etc.).
 * Implement this interface per data source.
 */
export interface ISeoRepository {
  findBySlug(slug: string): Promise<Partial<SeoBuilderInput> | null>;
  findByPage(pageKey: string): Promise<Partial<SeoBuilderInput> | null>;
}
