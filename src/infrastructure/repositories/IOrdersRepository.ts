import { type CheckoutPage, type CheckoutResultPage } from "@/domains/checkout";

/**
 * Contract for fetching checkout and order/result data.
 * Swap CheckoutPageService / CheckoutResultService static mocks for this
 * when the API is ready.
 *
 * Future mutation endpoints (not yet implemented):
 *   createOrder(input: CheckoutSubmission): Promise<{ orderId: string }>
 */
export interface IOrdersRepository {
  /** Fetch checkout page content: contact form, payment tabs, summary. */
  getCheckoutPageContent(): Promise<CheckoutPage>;

  /**
   * Fetch order result by id.
   * Currently the checkout success page only receives a `status` query
   * param (success | pending | failed). Once `/orders/[id]` exists, this
   * should resolve the full order from its id instead.
   */
  getOrderResult(orderId: string): Promise<CheckoutResultPage>;
}
