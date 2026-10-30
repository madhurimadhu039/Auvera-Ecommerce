/**
 * Formats a numeric price into Indian Rupees (₹ - INR) with Indian numbering comma grouping.
 * Example: 109999 -> "₹1,09,999"
 * Example: 2499 -> "₹2,499"
 */
export function formatPrice(amount: number): string {
  if (isNaN(amount)) return "₹0";
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export const CURRENCY = {
  symbol: "₹",
  code: "INR",
  freeShippingThreshold: 4999,
  freeShippingText: "₹4,999",
};

