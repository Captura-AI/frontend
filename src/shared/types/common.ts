export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncResult<T> = Promise<T>;

export interface PageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Authenticated user shape returned by the backend `/users/me` endpoint.
 * Every field is optional/nullable because the backend omits absent values;
 * `photographerProfile` is only present for accounts with a photographer role.
 */
export interface BackendUser {
  name?: string | null;
  username?: string | null;
  photographerProfile?: {
    artistName?: string | null;
    location?: string | null;
  } | null;
}

/**
 * Generic `{ data, total }` collection envelope returned by paginated backend
 * list endpoints (e.g. `/photographers/moments`, `/bookings`).
 */
export interface BackendMomentsResult<T> {
  data: T[];
  total: number;
}
