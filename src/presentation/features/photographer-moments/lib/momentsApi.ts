import { createSessionStore } from "@/infrastructure";
import { apiConfig } from "@/shared";

export interface UpdateMomentInput {
  caption?: string;
  story?: string;
  city?: string;
  district?: string;
  vehicleType?: string;
  licensePlate?: string;
  tags?: string[];
  isPublished?: boolean;
  licenses?: string[];
}

function buildHeaders(): Record<string, string> {
  const token = createSessionStore().getAccessToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export async function patchMoment(momentId: string, body: UpdateMomentInput): Promise<void> {
  const res = await fetch(`${apiConfig.baseUrl}/photographers/moments/${momentId}`, {
    method: "PATCH",
    headers: buildHeaders(),
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Failed to update moment (${res.status})`);
  }
}

export async function bulkPublishMoments(momentIds: string[]): Promise<void> {
  const res = await fetch(`${apiConfig.baseUrl}/photographers/moments/bulk-publish`, {
    method: "PATCH",
    headers: buildHeaders(),
    credentials: "include",
    body: JSON.stringify({ momentIds }),
  });

  if (!res.ok) {
    throw new Error(`Failed to bulk publish (${res.status})`);
  }
}

export async function bulkSaveDraftMoments(momentIds: string[]): Promise<void> {
  const res = await fetch(`${apiConfig.baseUrl}/photographers/moments/bulk-save-draft`, {
    method: "PATCH",
    headers: buildHeaders(),
    credentials: "include",
    body: JSON.stringify({ momentIds }),
  });

  if (!res.ok) {
    throw new Error(`Failed to bulk save draft (${res.status})`);
  }
}

export async function deleteMoment(momentId: string): Promise<void> {
  const res = await fetch(`${apiConfig.baseUrl}/photographers/moments/${momentId}`, {
    method: "DELETE",
    headers: buildHeaders(),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete moment (${res.status})`);
  }
}

export async function bulkDeleteMoments(momentIds: string[]): Promise<void> {
  const res = await fetch(`${apiConfig.baseUrl}/photographers/moments/bulk-delete`, {
    method: "DELETE",
    headers: buildHeaders(),
    credentials: "include",
    body: JSON.stringify({ momentIds }),
  });

  if (!res.ok) {
    throw new Error(`Failed to bulk delete moments (${res.status})`);
  }
}
