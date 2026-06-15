/**
 * Standard contract for the NestJS backend response envelope.
 *
 * The backend `CustomBaseResponseInterceptor` wraps every response as
 * `{ statusCode, message, data }`. Some legacy handlers used `result`, so both
 * are tolerated here. Paginated endpoints place a `PaginateDto` in `data`.
 */
export interface BackendEnvelope<T> {
  statusCode?: number;
  message?: string;
  data?: T;
  result?: T;
}

export interface PaginateMeta {
  total?: number;
  totalData?: number;
  page?: number;
  limit?: number;
}

export interface Paginated<T> {
  data: T[];
  meta?: PaginateMeta;
}

/** Error carrying the HTTP status so UI layers can branch (401, 404, 5xx, 0=network). */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Normalizes a backend message that may arrive as string or string[]. */
export function normalizeBackendMessage(message: unknown, fallback: string): string {
  if (Array.isArray(message)) {
    return message.join(", ");
  }
  if (typeof message === "string" && message.length > 0) {
    return message;
  }
  return fallback;
}

/** Pulls the payload out of an envelope, tolerating `data` or `result`. */
export function unwrapEnvelope<T>(
  envelope: BackendEnvelope<T>,
  errorMessage = "Unexpected empty API response."
): T {
  const payload = envelope.data ?? envelope.result;

  if (payload === undefined || payload === null) {
    throw new Error(errorMessage);
  }

  return payload;
}
