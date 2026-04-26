import { type ExplorerDetail } from "@/domains/explorer";
import { ExplorerDetailBreadcrumb } from "./components/ExplorerDetailBreadcrumb";
import { ExplorerDetailImageGallery } from "./components/ExplorerDetailImageGallery";
import { ExplorerDetailSidebar } from "./components/ExplorerDetailSidebar";
import { ExplorerDetailFacts } from "./components/ExplorerDetailFacts";
import { ExplorerDetailStory } from "./components/ExplorerDetailStory";
import { ExplorerDetailKeywords } from "./components/ExplorerDetailKeywords";
import { ExplorerDetailBenefits } from "./components/ExplorerDetailBenefits";
import { ExplorerDetailPhotographer } from "./components/ExplorerDetailPhotographer";
import { ExplorerDetailSimilar } from "./components/ExplorerDetailSimilar";

interface ExplorerDetailViewProps {
  detail: ExplorerDetail;
}

export function ExplorerDetailView({ detail }: ExplorerDetailViewProps) {
  return (
    <main className="pt-[60px]">
      <div className="max-w-[1320px] mx-auto px-10">
        <ExplorerDetailBreadcrumb items={detail.breadcrumb} />

        {/* 2-column hero layout */}
        <section
          className="grid gap-[56px] items-start pt-[26px] pb-[80px]"
          style={{ gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1fr)" }}
        >
          <ExplorerDetailImageGallery
            image={detail.image}
            title={`${detail.titlePrefix}${detail.titleEmphasis}`}
          />
          <ExplorerDetailSidebar
            photographer={detail.photographer}
            frameNumber={detail.frameNumber}
            editionOf={detail.editionOf}
            titlePrefix={detail.titlePrefix}
            titleEmphasis={detail.titleEmphasis}
            description={detail.description}
            price={detail.price}
          />
        </section>

        <ExplorerDetailFacts facts={detail.facts} />
        <ExplorerDetailStory
          paragraphs={detail.storyParagraphs}
          detectedItems={detail.detectedItems}
        />
        <ExplorerDetailKeywords keywords={detail.keywords} />
        <ExplorerDetailBenefits benefits={detail.benefits} />
        <ExplorerDetailPhotographer block={detail.photographerBlock} />
        <ExplorerDetailSimilar
          moments={detail.similar}
          headingContext={detail.photographerBlock.city}
          meta="Same neighborhood · golden hour"
        />

        {/* Bottom spacer */}
        <div className="h-[80px]" />
      </div>
    </main>
  );
}
