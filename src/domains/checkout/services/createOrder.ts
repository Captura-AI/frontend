import { createHttpClient, createSessionStore } from "@/infrastructure";
import { apiConfig } from "@/shared";

/**
 * Payment methods accepted by the backend `CheckoutRequestDto`.
 */
export type CheckoutPaymentMethod =
  | "QRIS"
  | "GOPAY"
  | "OVO"
  | "DANA"
  | "CREDIT_CARD"
  | "VIRTUAL_ACCOUNT_BCA";

export interface CheckoutBilling {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country?: string;
}

export interface CreateOrderInput {
  momentId: string;
  licenseId: string;
  paymentMethod: CheckoutPaymentMethod;
  billing: CheckoutBilling;
}

interface CheckoutEnvelope {
  message?: string;
  data?: {
    redirectUrl?: string;
    snapToken?: string;
  };
}

/**
 * Creates a pending order and starts payment via `POST /checkout`, returning the
 * Midtrans redirect URL. Runs client-side and attaches the bearer token from the
 * session cookie (same mechanism as the auth repository).
 */
export async function createOrder(input: CreateOrderInput): Promise<{ redirectUrl: string }> {
  const session = createSessionStore();

  if (!session.isAuthenticated()) {
    throw new Error("Please sign in to complete your purchase.");
  }

  const http = createHttpClient(apiConfig.baseUrl, session);

  const response = await http.post<CheckoutEnvelope>("/checkout", {
    momentId: input.momentId,
    licenseId: input.licenseId,
    paymentMethod: input.paymentMethod,
    billingInfo: input.billing,
  });

  const redirectUrl = response.data?.redirectUrl;

  if (!redirectUrl) {
    throw new Error("Checkout did not return a payment link. Please try again.");
  }

  return { redirectUrl };
}
