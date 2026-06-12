import { type PhotographerUploadsPage } from "@/domains/photographer-uploads";

/**
 * Contract for fetching and managing the photographer's upload/AI review queue.
 * Swap PhotographerUploadsService static mock for this when the API is ready.
 *
 * Future mutation endpoints (not yet implemented):
 *   uploadBatch(files: File[]): Promise<{ batchId: string }>
 *   retryFailedFrame(batchId: string, frameId: string): Promise<void>
 *   publishBatch(batchId: string): Promise<void>
 *   saveDraft(batchId: string): Promise<void>
 *   updateFrameMetadata(frameId: string, input: Partial<UploadFrame>): Promise<void>
 */
export interface IPhotographerUploadsRepository {
  /** Fetch upload batches, processing queue status, and AI metadata review panel content. */
  getUploadsPageContent(): Promise<PhotographerUploadsPage>;
}
