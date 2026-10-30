import { initializeApp } from "firebase-admin/app";
initializeApp();
export { setAdminClaim } from "./auth/setAdminClaim";
export { createRazorpayOrder } from "./payments/createOrder";
export { razorpayWebhook } from "./payments/webhook";
