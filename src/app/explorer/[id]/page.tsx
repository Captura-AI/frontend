import { type Metadata } from "next";
import { getExplorerDetail } from "@/domains/explorer";
import { ExplorerDetailView } from "@/presentation/features/explorer/detail";

export const metadata: Metadata = {
  title: "Moment Detail — Captura",
  description: "View a captured street photograph moment.",
};

export default async function ExplorerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = getExplorerDetail(id);
  return <ExplorerDetailView detail={detail} />;
}
